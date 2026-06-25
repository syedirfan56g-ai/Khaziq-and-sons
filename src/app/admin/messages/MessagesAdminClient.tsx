"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";

type Msg = {
  id: string; uid?: string; name: string; email?: string; message: string;
  status: string; adminNote: string; createdAt: Timestamp;
};

export default function MessagesAdminClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [selected, setSelected] = useState<Msg | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  const fetch = async () => {
    if (!user) return;
    const snap = await getDocs(collection(db, "messages"));
    const list: Msg[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Msg));
    setMsgs(list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)));
  };

  useEffect(() => { if (user) fetch(); }, [user]);

  const markRead = async (id: string) => {
    await updateDoc(doc(db, "messages", id), { status: "read" });
    await fetch();
  };

  const sendNote = async () => {
    if (!selected || !note.trim()) return;
    await updateDoc(doc(db, "messages", selected.id), { adminNote: note, status: "replied" });
    setNote("");
    await fetch();
    setSelected((prev) => prev ? { ...prev, adminNote: note } : null);
  };

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Messages ({msgs.length})</h1>
          <div className="admin-topbar-right">
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card">
            {msgs.length === 0 ? (
              <div className="admin-empty"><i className="fas fa-comments"></i><h3>No Messages</h3><p>Website messages will appear here.</p></div>
            ) : (
              <div className="admin-table-wrap"><table className="admin-table">
                <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>{msgs.map((m) => (
                  <tr key={m.id} style={m.status === "unread" ? { background: "#fff8f0" } : {}}>
                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                    <td><small>{m.email || "—"}</small></td>
                    <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</td>
                    <td><small>{m.createdAt?.toDate().toLocaleDateString()}</small></td>
                    <td><span className={`admin-badge ${m.status === "unread" ? "pending" : m.status === "replied" ? "approved" : ""}`}>{m.status || "unread"}</span></td>
                    <td>
                      <button className="admin-btn admin-btn-sm admin-btn-outline" onClick={() => { setSelected(m); if (m.status === "unread") markRead(m.id); }}>
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
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
                  <div className="admin-details-item"><div className="label">Email / UID</div><div className="value">{selected.email || selected.uid || "—"}</div></div>
                  <div className="admin-details-item" style={{ gridColumn: "1 / -1" }}><div className="label">Message</div><div className="value" style={{ whiteSpace: "pre-wrap" }}>{selected.message}</div></div>
                </div>
                {selected.adminNote && (
                  <div style={{ marginTop: 20 }}>
                    <div className="label" style={{ marginBottom: 8 }}>Your Reply</div>
                    <div className="message-bubble admin">{selected.adminNote}</div>
                  </div>
                )}
                <div style={{ marginTop: 20 }}>
                  <label className="admin-label">Reply to User</label>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <input className="admin-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type your reply..." />
                    <button className="admin-btn admin-btn-primary" onClick={sendNote} disabled={!note.trim()}><i className="fas fa-reply"></i> Send Reply</button>
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
