"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";

type Order = {
  id: string;
  company: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  product: string;
  quantity: string;
  timeline: string;
  requirements: string;
  status: string;
  adminNote: string;
  createdAt: Timestamp;
};

const STATUSES = ["new", "contacted", "quoted", "confirmed", "completed"];

export default function OrdersClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [note, setNote] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!loading && !user) router.push("/admin/login");
  }, [user, loading, router]);

  const fetchOrders = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, "orders"));
    const list: Order[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Order));
    setOrders(list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
  };

  useEffect(() => { if (user) fetchOrders(); }, [user]);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "orders", id), { status, updatedAt: Timestamp.now() });
    await fetchOrders();
  };

  const sendNote = async () => {
    if (!selected || !note.trim()) return;
    await updateDoc(doc(db, "orders", selected.id), { adminNote: note, updatedAt: Timestamp.now() });
    setNote("");
    await fetchOrders();
  };

  const filtered = statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter);

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Company Form ({orders.length})</h1>
          <div className="admin-topbar-right">
            <div className="admin-filters">
              <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card">
            {filtered.length === 0 ? (
              <div className="admin-empty">
                <i className="fas fa-file-invoice"></i>
                <h3>No Inquiries Found</h3>
                <p>{statusFilter !== "all" ? "No inquiries match the selected status." : "Inquiries will appear here once customers submit the form."}</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Company</th><th>Contact</th><th>City</th><th>Product</th><th>Qty</th><th>Status</th><th>Date</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600 }}>{o.company}</td>
                      <td>{o.name}<br /><small style={{ color: "#888" }}>{o.phone}</small></td>
                      <td>{o.city}</td>
                      <td>{o.product}</td>
                      <td>{o.quantity}</td>
                      <td><span className={`admin-badge ${o.status}`}>{o.status || "new"}</span></td>
                      <td><small>{o.createdAt?.toDate().toLocaleDateString()}</small></td>
                      <td>
                        <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setSelected(o)}>
                          <i className="fas fa-eye"></i>
                        </button>
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
                <h3><i className="fas fa-file-invoice" style={{ color: "#D97700", marginRight: 8 }}></i>Inquiry — {selected.company}</h3>
                <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setSelected(null)}>
                  <i className="fas fa-times"></i> Close
                </button>
              </div>
              <div className="admin-details-body">
                <div className="admin-details-grid">
                  <div className="admin-details-item"><div className="label">Company</div><div className="value">{selected.company}</div></div>
                  <div className="admin-details-item"><div className="label">Contact</div><div className="value">{selected.name}</div></div>
                  <div className="admin-details-item"><div className="label">Phone</div><div className="value">{selected.phone}</div></div>
                  <div className="admin-details-item"><div className="label">Email</div><div className="value">{selected.email || "-"}</div></div>
                  <div className="admin-details-item"><div className="label">City</div><div className="value">{selected.city}</div></div>
                  <div className="admin-details-item"><div className="label">Product</div><div className="value">{selected.product}</div></div>
                  <div className="admin-details-item"><div className="label">Quantity</div><div className="value">{selected.quantity}</div></div>
                  <div className="admin-details-item"><div className="label">Timeline</div><div className="value">{selected.timeline || "-"}</div></div>
                  <div className="admin-details-item" style={{ gridColumn: "1 / -1" }}><div className="label">Requirements</div><div className="value">{selected.requirements || "-"}</div></div>
                  <div className="admin-details-item" style={{ gridColumn: "1 / -1" }}>
                    <div className="label">Status</div>
                    <div className="value">
                      <div className="status-stepper">
                        {STATUSES.map((s) => (
                          <div key={s} className={`status-step ${selected.status === s ? "active" : ""}`} onClick={() => updateStatus(selected.id, s)}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {selected.adminNote && (
                  <div style={{ marginTop: 20 }}>
                    <div className="label" style={{ marginBottom: 8 }}>Admin Note</div>
                    <div className="message-bubble admin">{selected.adminNote}</div>
                  </div>
                )}
                <div style={{ marginTop: 20 }}>
                  <label className="admin-label">Add Note</label>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <input className="admin-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type a note..." />
                    <button className="admin-btn admin-btn-primary" onClick={sendNote} disabled={!note.trim()}>
                      <i className="fas fa-paper-plane"></i> Save
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
