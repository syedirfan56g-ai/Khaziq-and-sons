"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, query, orderBy } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";

type Post = { id: string; slug: string; title: string; excerpt: string; content: string; author: string; tags: string; image: string; createdAt: Timestamp };

export default function BlogAdminClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", author: "Khaziq & Sons", tags: "", image: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  const fetch = async () => {
    if (!user) return;
    const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const list: Post[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Post));
    setPosts(list);
  };
  useEffect(() => { if (user) fetch(); }, [user]);

  const makeSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev, [name]: value,
      ...(name === "title" && !editId ? { slug: makeSlug(value) } : {}),
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", author: "Khaziq & Sons", tags: "", image: "" });
    setImageFile(null);
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (editId) {
        await updateDoc(doc(db, "blog", editId), { ...form, updatedAt: Timestamp.now() });
      } else {
        await addDoc(collection(db, "blog"), { ...form, createdAt: Timestamp.now() });
      }
      resetForm();
      await fetch();
    } catch {}
  };

  const edit = (p: Post) => {
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content, author: p.author, tags: p.tags, image: p.image });
    setEditId(p.id);
    setShowForm(true);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "blog", id));
    await fetch();
  };

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Blog Posts ({posts.length})</h1>
          <div className="admin-topbar-right">
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-card-header">
              <h3>Manage Blog</h3>
              <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
                <i className="fas fa-plus"></i> New Post
              </button>
            </div>
          </div>

          {showForm && (
            <div className="admin-card" style={{ marginBottom: 20 }}>
              <div className="admin-card-header">
                <h3>{editId ? "Edit Post" : "New Post"}</h3>
                <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={resetForm}><i className="fas fa-times"></i></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="admin-form-grid">
                  <div><label className="admin-label">Title *</label><input className="admin-input" name="title" value={form.title} onChange={updateForm} required /></div>
                  <div><label className="admin-label">Slug *</label><input className="admin-input" name="slug" value={form.slug} onChange={updateForm} required /></div>
                  <div style={{ gridColumn: "1 / -1" }}><label className="admin-label">Excerpt (meta description)</label><input className="admin-input" name="excerpt" value={form.excerpt} onChange={updateForm} placeholder="Brief summary for search results" /></div>
                  <div style={{ gridColumn: "1 / -1" }}><label className="admin-label">Content (HTML)</label><textarea className="admin-input" name="content" value={form.content} onChange={updateForm} rows={12} required style={{ fontFamily: "monospace", fontSize: "0.85rem" }} /></div>
                  <div><label className="admin-label">Author</label><input className="admin-input" name="author" value={form.author} onChange={updateForm} /></div>
                  <div><label className="admin-label">Tags (comma separated)</label><input className="admin-input" name="tags" value={form.tags} onChange={updateForm} placeholder="trolley, wheelbarrow, guide" /></div>
                  <div><label className="admin-label">Featured Image (base64)</label><input className="admin-input" type="file" accept="image/*" onChange={handleImage} /></div>
                </div>
                {form.image && <img src={form.image} alt="preview" style={{ maxHeight: 120, borderRadius: 8, marginTop: 8 }} />}
                <button type="submit" className="admin-btn admin-btn-primary" style={{ marginTop: 16 }}>
                  <i className="fas fa-save"></i> {editId ? "Update" : "Publish"}
                </button>
              </form>
            </div>
          )}

          <div className="admin-card">
            {posts.length === 0 ? (
              <div className="admin-empty"><i className="fas fa-newspaper"></i><h3>No Blog Posts</h3><p>Create your first blog post to start building SEO authority.</p></div>
            ) : (
              <div className="admin-table-wrap"><table className="admin-table">
                <thead><tr><th>Title</th><th>Slug</th><th>Tags</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>{posts.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.title}</td>
                    <td><code>/{p.slug}</code></td>
                    <td><small>{p.tags}</small></td>
                    <td><small>{p.createdAt?.toDate().toLocaleDateString()}</small></td>
                    <td style={{ display: "flex", gap: 6 }}>
                      <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => edit(p)}><i className="fas fa-edit"></i></button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => remove(p.id)}><i className="fas fa-trash"></i></button>
                    </td>
                  </tr>
                ))}</tbody>
              </table></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
