"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";
import { generateRetailerId } from "@/lib/retailerIds";

type Partner = {
  id: string;
  fullName: string;
  businessName: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  monthlyVolume: string;
  products: string[];
  status: string;
  createdAt: Timestamp;
  adminNote: string;
  cnicImage: string;
  shopImages: string;
  retailerId: string;
};

export default function PartnersClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selected, setSelected] = useState<Partner | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!loading && !user) router.push("/admin/login");
  }, [user, loading, router]);

  const fetchPartners = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, "partners"));
    const list: Partner[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Partner));
    setPartners(list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
  };

  useEffect(() => { if (user) fetchPartners(); }, [user]);

  const updateStatus = async (id: string, status: string) => {
    const data: Record<string, unknown> = { status, updatedAt: Timestamp.now() };
    if (status === "approved") {
      const allSnap = await getDocs(collection(db, "partners"));
      const existingIds = new Set(allSnap.docs.map((d) => d.data().retailerId).filter(Boolean));
      const partnerDoc = allSnap.docs.find((d) => d.id === id);
      const city = partnerDoc?.data()?.city || "Other";
      data.retailerId = generateRetailerId(city, existingIds);
    }
    await updateDoc(doc(db, "partners", id), data);
    await fetchPartners();
  };

  const sendNote = async () => {
    if (!selected || !note.trim()) return;
    await updateDoc(doc(db, "partners", selected.id), { adminNote: note, updatedAt: Timestamp.now() });
    setNote("");
    alert("Message sent to partner");
    await fetchPartners();
  };

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Retailers ({partners.length})</h1>
          <div className="admin-topbar-right">
            <span className="admin-badge pending">{partners.filter(p => p.status === "pending" || !p.status).length} Pending</span>
            <span className="admin-badge approved">{partners.filter(p => p.status === "approved").length} Approved</span>
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card">
            {partners.length === 0 ? (
              <div className="admin-empty">
                <i className="fas fa-handshake"></i>
                <h3>No Retailer Applications</h3>
                <p>Retailer submissions will appear here.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                    <tr>
                      <th>Name</th><th>Business</th><th>City</th><th>ID</th><th>Phone</th><th>Status</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                  {partners.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.fullName}</td>
                      <td>{p.businessName}</td>
                      <td>{p.city}</td>
                      <td>{p.retailerId ? <code style={{ fontSize: "0.75rem", background: "#1a1a1a", color: "#D97700", padding: "2px 6px", borderRadius: 4 }}>{p.retailerId}</code> : <span style={{ color: "#ccc" }}>—</span>}</td>
                      <td>{p.phone}</td>
                      <td>
                        <span className={`admin-badge ${p.status === "approved" ? "approved" : p.status === "rejected" ? "rejected" : "pending"}`}>
                          {p.status || "pending"}
                        </span>
                      </td>
                      <td>
                        <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setSelected(p)} style={{ marginRight: 4 }}>
                          <i className="fas fa-eye"></i>
                        </button>
                        {p.status !== "approved" && (
                          <button className="admin-btn admin-btn-sm admin-btn-success" onClick={() => updateStatus(p.id, "approved")} style={{ marginRight: 4 }}>
                            <i className="fas fa-check"></i>
                          </button>
                        )}
                        {p.status !== "rejected" && (
                          <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => updateStatus(p.id, "rejected")}>
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {selected && (
            <div className="admin-details">
              <div className="admin-details-header">
                <h3><i className="fas fa-user" style={{ color: "#D97700", marginRight: 8 }}></i>{selected.fullName}</h3>
                <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setSelected(null)}>
                  <i className="fas fa-times"></i> Close
                </button>
              </div>
              <div className="admin-details-body">
                <div className="admin-details-grid">
                  <div className="admin-details-item"><div className="label">Business Name</div><div className="value">{selected.businessName}</div></div>
                  <div className="admin-details-item"><div className="label">Retailer ID</div><div className="value">{selected.retailerId ? <code style={{ background: "#1a1a1a", color: "#D97700", padding: "2px 10px", borderRadius: 4, fontFamily: "monospace", fontSize: "0.9rem" }}>{selected.retailerId}</code> : <span style={{ color: "#ccc" }}>Not assigned yet (approve to generate)</span>}</div></div>
                  <div className="admin-details-item"><div className="label">Phone</div><div className="value">{selected.phone}</div></div>
                  <div className="admin-details-item"><div className="label">WhatsApp</div><div className="value">{selected.whatsapp || "-"}</div></div>
                  <div className="admin-details-item"><div className="label">City</div><div className="value">{selected.city}</div></div>
                  <div className="admin-details-item"><div className="label">Address</div><div className="value">{selected.address}</div></div>
                  <div className="admin-details-item"><div className="label">Monthly Volume</div><div className="value">{selected.monthlyVolume}</div></div>
                  <div className="admin-details-item"><div className="label">Products</div><div className="value">{(selected.products || []).join(", ")}</div></div>
                  <div className="admin-details-item"><div className="label">Status</div><div className="value"><span className={`admin-badge ${selected.status === "approved" ? "approved" : selected.status === "rejected" ? "rejected" : "pending"}`}>{selected.status || "pending"}</span></div></div>
                  {selected.cnicImage && <div className="admin-details-item"><div className="label">CNIC Image</div><div className="value"><a href={selected.cnicImage} target="_blank" rel="noopener noreferrer"><img src={selected.cnicImage} alt="CNIC" style={{ width: 120, height: "auto", border: "1px solid #ddd", borderRadius: 4 }} /></a></div></div>}
                  {selected.shopImages && <div className="admin-details-item"><div className="label">Shop Image</div><div className="value"><a href={selected.shopImages} target="_blank" rel="noopener noreferrer"><img src={selected.shopImages} alt="Shop" style={{ width: 120, height: "auto", border: "1px solid #ddd", borderRadius: 4 }} /></a></div></div>}
                </div>
                {selected.adminNote && (
                  <div style={{ marginTop: 20 }}>
                    <div className="label" style={{ marginBottom: 8 }}>Admin Note</div>
                    <div className="message-bubble admin">{selected.adminNote}</div>
                  </div>
                )}
                <div style={{ marginTop: 20 }}>
                  <label className="admin-label">Send Message to Retailer</label>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <input className="admin-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type a message..." />
                    <button className="admin-btn admin-btn-primary" onClick={sendNote} disabled={!note.trim()}>
                      <i className="fas fa-paper-plane"></i> Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
