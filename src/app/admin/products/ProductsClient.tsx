"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AdminSidebar from "@/components/AdminSidebar";

type Product = {
  id: string;
  name: string;
  description: string;
  loadCapacity: string;
  weight: string;
  price: number;
  partnerPrice: number;
  category: string;
  images: string[];
  active: boolean;
  createdAt: Timestamp;
};

const defaultProduct = {
  name: "", description: "", loadCapacity: "", weight: "",
  price: 0, partnerPrice: 0, category: "Platform Trolleys",
  images: [] as string[], active: true,
};

export default function ProductsClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(defaultProduct);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/admin/login");
  }, [user, loading, router]);

  const fetchProducts = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, "products"));
    const list: Product[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Product));
    setProducts(list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  const openAdd = () => {
    setForm(defaultProduct);
    setFiles([]);
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setForm({
      name: p.name, description: p.description, loadCapacity: p.loadCapacity || "",
      weight: p.weight || "", price: p.price, partnerPrice: p.partnerPrice || 0,
      category: p.category || "Platform Trolleys", images: p.images || [], active: p.active,
    });
    setFiles([]);
    setEditing(p);
    setShowModal(true);
  };

  const uploadImages = async (): Promise<string[]> => {
    if (files.length === 0) return form.images;
    const urls: string[] = [...form.images];
    for (const file of files) {
      const path = `products/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    return urls;
  };

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    setUploading(true);
    try {
      const imageUrls = await uploadImages();
      setUploading(false);
      const data = { ...form, images: imageUrls, updatedAt: Timestamp.now() };
      if (editing) {
        await updateDoc(doc(db, "products", editing.id), data);
      } else {
        await addDoc(collection(db, "products"), { ...data, createdAt: Timestamp.now() });
      }
      setShowModal(false);
      await fetchProducts();
    } catch (err) {
      alert("Error saving: " + (err instanceof Error ? err.message : "Unknown"));
    }
    setSaving(false);
    setUploading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteDoc(doc(db, "products", id));
    await fetchProducts();
  };

  const removeImage = (idx: number) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== idx) });
  };

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Products ({products.length})</h1>
          <div className="admin-topbar-right">
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
            <button className="admin-btn admin-btn-primary" onClick={openAdd}>
              <i className="fas fa-plus"></i> Add Product
            </button>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card">
            {products.length === 0 ? (
              <div className="admin-empty">
                <i className="fas fa-box-open"></i>
                <h3>No Products Yet</h3>
                <p>Click "Add Product" to create your first product.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                     <th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Retailer Price</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt="" style={{ width: 50, height: 50, objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: 50, height: 50, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#888" }}>No img</div>
                        )}
                      </td>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td>{p.category}</td>
                      <td>Rs. {p.price?.toLocaleString()}</td>
                      <td>Rs. {p.partnerPrice?.toLocaleString() || "-"}</td>
                      <td><span className={`admin-badge ${p.active ? "active" : "rejected"}`}>{p.active ? "Active" : "Inactive"}</span></td>
                      <td>
                        <button className="admin-btn admin-btn-sm admin-btn-primary" onClick={() => openEdit(p)} style={{ marginRight: 6 }}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(p.id, p.name)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <div className={`admin-modal-overlay ${showModal ? "active" : ""}`} onClick={() => setShowModal(false)}>
        <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
          <h2>{editing ? "Edit Product" : "Add New Product"}</h2>
          <div className="admin-grid-2">
            <div className="form-group">
              <label className="admin-label">Product Name <span className="req">*</span></label>
              <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g., Heavy Duty Platform Trolley" />
            </div>
            <div className="form-group">
              <label className="admin-label">Category</label>
              <select className="admin-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {["Platform Trolleys", "Wheelbarrows", "Hand Trucks", "Spare Parts", "Custom Fabrication"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="admin-label">Load Capacity</label>
              <input className="admin-input" value={form.loadCapacity} onChange={(e) => setForm({ ...form, loadCapacity: e.target.value })} placeholder="e.g., 500kg" />
            </div>
            <div className="form-group">
              <label className="admin-label">Weight (kg)</label>
              <input className="admin-input" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} placeholder="e.g., 25 kg" />
            </div>
            <div className="form-group">
              <label className="admin-label">Normal Price (Rs.) <span className="req">*</span></label>
              <input className="admin-input" type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="e.g., 15000" />
              <small style={{ color: "#888" }}>Shown on website catalog</small>
            </div>
            <div className="form-group">
              <label className="admin-label">Retailer Price (Rs.)</label>
              <input className="admin-input" type="number" value={form.partnerPrice || ""} onChange={(e) => setForm({ ...form, partnerPrice: Number(e.target.value) })} placeholder="e.g., 12000" />
              <small style={{ color: "#888" }}>Only visible to approved retailers</small>
            </div>
          </div>
          <div className="form-group" style={{ marginTop: 12 }}>
            <label className="admin-label">Description</label>
            <textarea className="admin-textarea" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Product description..." rows={3}></textarea>
          </div>
          <div className="form-group" style={{ marginTop: 12 }}>
            <label className="admin-label">Product Images</label>
            <div className="admin-image-upload" onClick={() => document.getElementById("prod-imgs")?.click()}>
              <div className="upload-icon"><i className="fas fa-cloud-upload-alt"></i></div>
              <p>Click to upload images (multiple allowed)</p>
              <input type="file" id="prod-imgs" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files || []))} />
            </div>
            {files.length > 0 && <p style={{ fontSize: "0.8rem", color: "#16a34a", marginTop: 6 }}>{files.length} new file(s) selected</p>}
            {form.images.length > 0 && (
              <div className="admin-image-grid">
                {form.images.map((url, i) => (
                  <div key={i} className="img-wrap">
                    <img src={url} alt="" />
                    <button className="img-remove" onClick={() => removeImage(i)}><i className="fas fa-times"></i></button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group" style={{ marginTop: 12 }}>
            <label className="admin-label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              Product Active (visible on website)
            </label>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 20 }}>
            <button className="admin-btn admin-btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving || !form.name}>
              {uploading ? "Uploading images..." : saving ? "Saving..." : editing ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
