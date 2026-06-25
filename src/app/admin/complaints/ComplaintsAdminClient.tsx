"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";

type Complaint = {
  id: string; name: string; phone: string; email: string; message: string;
  imageUrl: string; status: string; adminNote: string; createdAt: Timestamp;
};

export default function ComplaintsAdminClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  const fetch = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, "complaints"));
    const list: Complaint[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Complaint));
    setComplaints(list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
  };

  useEffect(() => { if (user) fetch(); }, [user]);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "complaints", id), { status, updatedAt: Timestamp.now() });
    await fetch();
  };

  const sendNote = async () => {
    if (!selected || !note.trim()) return;
    await updateDoc(doc(db, "complaints", selected.id), { adminNote: note, updatedAt: Timestamp.now() });
    setNote("");
    await fetch();
  };

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Complaints ({complaints.length})</h1>
          <div className="admin-topbar-right">
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card">
            {complaints.length === 0 ? (
              <div className="admin-empty"><i className="fas fa-comment-dots"></i><h3>No Complaints</h3><p>Customer complaints will appear here.</p></div>
            ) : (
              <div className="admin-table-wrap"><table className="admin-table">
                <thead><tr><th>Name</th><th>Phone</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                <tbody>{complaints.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.phone}</td>
                    <td><span className={`admin-badge ${c.status === "resolved" ? "approved" : c.status === "rejected" ? "rejected" : "pending"}`}>{c.status || "new"}</span></td>
                    <td><small>{c.createdAt?.toDate().toLocaleDateString()}</small></td>
                    <td><button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setSelected(c)}><i className="fas fa-eye"></i></button></td>
                  </tr>
                ))}</tbody>
              </table></div>
            )}
          </div>

          {selected && (
            <div className="admin-details">
              <div className="admin-details-header">
                <h3><i className="fas fa-comment" style={{ color: "#D97700", marginRight: 8 }}></i>{selected.name}</h3>
                <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setSelected(null)}><i className="fas fa-times"></i> Close</button>
              </div>
              <div className="admin-details-body">
                <div className="admin-details-grid">
                  <div className="admin-details-item"><div className="label">Name</div><div className="value">{selected.name}</div></div>
                  <div className="admin-details-item"><div className="label">Phone</div><div className="value">{selected.phone}</div></div>
                  <div className="admin-details-item"><div className="label">Email</div><div className="value">{selected.email || "-"}</div></div>
                  <div className="admin-details-item" style={{ gridColumn: "1 / -1" }}><div className="label">Message</div><div className="value" style={{ whiteSpace: "pre-wrap" }}>{selected.message}</div></div>
                  {selected.imageUrl && <div className="admin-details-item" style={{ gridColumn: "1 / -1" }}><div className="label">Attached Image</div><div className="value"><a href={selected.imageUrl} target="_blank" rel="noopener noreferrer"><img src={selected.imageUrl} alt="Attachment" style={{ maxWidth: 200, border: "1px solid #ddd", borderRadius: 4 }} /></a></div></div>}
                  <div className="admin-details-item" style={{ gridColumn: "1 / -1" }}>
                    <div className="label">Status</div>
                    <div className="value">
                      <div className="status-stepper">
                        {["new", "reviewing", "resolved", "closed"].map((s) => (
                          <div key={s} className={`status-step ${selected.status === s ? "active" : ""}`} onClick={() => updateStatus(selected.id, s)}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {selected.adminNote && <div style={{ marginTop: 20 }}><div className="label" style={{ marginBottom: 8 }}>Admin Note</div><div className="message-bubble admin">{selected.adminNote}</div></div>}
                <div style={{ marginTop: 20 }}>
                  <label className="admin-label">Add Note</label>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <input className="admin-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type a note..." />
                    <button className="admin-btn admin-btn-primary" onClick={sendNote} disabled={!note.trim()}><i className="fas fa-paper-plane"></i> Save</button>
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
