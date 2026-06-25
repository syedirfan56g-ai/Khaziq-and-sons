"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";

type Leave = {
  id: string; name: string; department: string; leaveType: string;
  fromDate: string; toDate: string; reason: string; phone: string;
  status: string; adminNote: string; createdAt: Timestamp;
};

export default function LeavesAdminClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [selected, setSelected] = useState<Leave | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  const fetch = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, "leaves"));
    const list: Leave[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Leave));
    setLeaves(list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
  };

  useEffect(() => { if (user) fetch(); }, [user]);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "leaves", id), { status, updatedAt: Timestamp.now() });
    await fetch();
  };

  const sendNote = async () => {
    if (!selected || !note.trim()) return;
    await updateDoc(doc(db, "leaves", selected.id), { adminNote: note, updatedAt: Timestamp.now() });
    setNote("");
    await fetch();
  };

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Leave Requests ({leaves.length})</h1>
          <div className="admin-topbar-right">
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card">
            {leaves.length === 0 ? (
              <div className="admin-empty"><i className="fas fa-calendar-alt"></i><h3>No Leave Requests</h3><p>Staff leave requests will appear here.</p></div>
            ) : (
              <div className="admin-table-wrap"><table className="admin-table">
                <thead><tr><th>Name</th><th>Department</th><th>Type</th><th>Dates</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>{leaves.map((l) => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 600 }}>{l.name}</td>
                    <td>{l.department}</td>
                    <td>{l.leaveType}</td>
                    <td><small>{l.fromDate} → {l.toDate}</small></td>
                    <td><span className={`admin-badge ${l.status === "approved" ? "approved" : l.status === "rejected" ? "rejected" : "pending"}`}>{l.status || "pending"}</span></td>
                    <td><button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setSelected(l)}><i className="fas fa-eye"></i></button></td>
                  </tr>
                ))}</tbody>
              </table></div>
            )}
          </div>

          {selected && (
            <div className="admin-details">
              <div className="admin-details-header">
                <h3><i className="fas fa-user" style={{ color: "#D97700", marginRight: 8 }}></i>{selected.name}</h3>
                <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => setSelected(null)}><i className="fas fa-times"></i> Close</button>
              </div>
              <div className="admin-details-body">
                <div className="admin-details-grid">
                  <div className="admin-details-item"><div className="label">Name</div><div className="value">{selected.name}</div></div>
                  <div className="admin-details-item"><div className="label">Phone</div><div className="value">{selected.phone}</div></div>
                  <div className="admin-details-item"><div className="label">Department</div><div className="value">{selected.department}</div></div>
                  <div className="admin-details-item"><div className="label">Leave Type</div><div className="value">{selected.leaveType}</div></div>
                  <div className="admin-details-item"><div className="label">From</div><div className="value">{selected.fromDate}</div></div>
                  <div className="admin-details-item"><div className="label">To</div><div className="value">{selected.toDate}</div></div>
                  <div className="admin-details-item" style={{ gridColumn: "1 / -1" }}><div className="label">Reason</div><div className="value" style={{ whiteSpace: "pre-wrap" }}>{selected.reason}</div></div>
                  <div className="admin-details-item" style={{ gridColumn: "1 / -1" }}>
                    <div className="label">Status</div>
                    <div className="value">
                      <div className="status-stepper">
                        {["pending", "approved", "rejected"].map((s) => (
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
