"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";

export default function CertsAdminClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [certs, setCerts] = useState<{ id: string; title: string; description: string; fileUrl: string; icon: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", description: "", fileUrl: "", icon: "fa-file-pdf" });

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  const fetch = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, "certifications"));
    const list: { id: string; title: string; description: string; fileUrl: string; icon: string }[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() } as { id: string; title: string; description: string; fileUrl: string; icon: string }));
    setCerts(list);
  };
  useEffect(() => { if (user) fetch(); }, [user]);

  const resetForm = () => { setForm({ title: "", description: "", fileUrl: "", icon: "fa-file-pdf" }); setEditId(null); setShowForm(false); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (editId) await updateDoc(doc(db, "certifications", editId), form);
      else await addDoc(collection(db, "certifications"), form);
      resetForm(); await fetch();
    } catch {}
  };

  const edit = (c: { id: string; title: string; description: string; fileUrl: string; icon: string }) => {
    setForm({ title: c.title, description: c.description, fileUrl: c.fileUrl, icon: c.icon });
    setEditId(c.id); setShowForm(true);
  };

  const remove = async (id: string) => { if (!confirm("Delete?")) return; await deleteDoc(doc(db, "certifications", id)); await fetch(); };

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Certifications ({certs.length})</h1>
          <div className="admin-topbar-right">
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-card-header">
              <h3>Manage Certifications</h3>
              <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}><i className="fas fa-plus"></i> Add Certificate</button>
            </div>
          </div>

          {showForm && (
            <div className="admin-card" style={{ marginBottom: 20 }}>
              <div className="admin-card-header"><h3>{editId ? "Edit" : "New"} Certificate</h3><button className="admin-btn admin-btn-sm admin-btn-outline" onClick={resetForm}><i className="fas fa-times"></i></button></div>
              <form onSubmit={handleSubmit} style={{ padding: 20 }}>
                <div className="admin-form-grid">
                  <div><label className="admin-label">Title *</label><input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
                  <div><label className="admin-label">Icon (Font Awesome class)</label><input className="admin-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="fa-file-pdf" /></div>
                  <div style={{ gridColumn: "1 / -1" }}><label className="admin-label">Description</label><input className="admin-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                  <div style={{ gridColumn: "1 / -1" }}><label className="admin-label">PDF File URL *</label><input className="admin-input" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} placeholder="https://..." required /></div>
                </div>
                <button type="submit" className="admin-btn admin-btn-primary" style={{ marginTop: 12 }}><i className="fas fa-save"></i> Save</button>
              </form>
            </div>
          )}

          <div className="admin-card">
            {certs.length === 0 ? (
              <div className="admin-empty"><i className="fas fa-file-certificate"></i><h3>No Certifications</h3><p>Add compliance documents and certificates here.</p></div>
            ) : (
              <div className="admin-table-wrap"><table className="admin-table">
                <thead><tr><th>Title</th><th>Description</th><th>Actions</th></tr></thead>
                <tbody>{certs.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                    <td><small>{c.description}</small></td>
                    <td style={{ display: "flex", gap: 6 }}>
                      <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => edit(c)}><i className="fas fa-edit"></i></button>
                      <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => remove(c.id)}><i className="fas fa-trash"></i></button>
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
