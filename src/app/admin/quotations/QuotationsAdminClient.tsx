"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";

export default function QuotationsAdminClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [quotations, setQuotations] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  useEffect(() => { if (user) (async () => {
    const snap = await getDocs(collection(db, "quotations"));
    const list: any[] = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    list.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    setQuotations(list);
  })(); }, [user]);

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Quotations ({quotations.length})</h1>
          <div className="admin-topbar-right">
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-card" style={{ marginBottom: 20 }}>
            <div className="admin-card-header">
              <h3>Quotation Requests</h3>
            </div>
            {quotations.length === 0 ? (
              <div className="admin-empty"><i className="fas fa-file-invoice"></i><h3>No Quotations Yet</h3></div>
            ) : selected ? (
              <div style={{ padding: 20 }}>
                <button className="admin-btn admin-btn-sm admin-btn-outline" style={{ marginBottom: 16 }} onClick={() => setSelected(null)}><i className="fas fa-arrow-left"></i> Back</button>
                <div className="admin-card" style={{ padding: 20 }}>
                  <h3>{selected.name}{selected.company ? ` — ${selected.company}` : ""}</h3>
                  <table className="admin-label" style={{ width: "100%", fontSize: "0.9rem" }}>
                    <tr><td style={{ fontWeight: 600, width: 120, padding: "4px 0" }}>Phone:</td><td>{selected.phone}</td></tr>
                    {selected.email && <tr><td style={{ fontWeight: 600, padding: "4px 0" }}>Email:</td><td>{selected.email}</td></tr>}
                    <tr><td style={{ fontWeight: 600, padding: "4px 0" }}>City:</td><td>{selected.city}</td></tr>
                    <tr><td style={{ fontWeight: 600, padding: "4px 0" }}>Date:</td><td>{selected.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</td></tr>
                  </table>
                  {selected.notes && <div style={{ marginTop: 12 }}><strong>Notes:</strong><p style={{ color: "#888" }}>{selected.notes}</p></div>}
                  {selected.items?.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <h4 style={{ marginBottom: 8 }}>Products Requested:</h4>
                      <table className="admin-table"><thead><tr><th>Product</th><th>Qty</th></tr></thead>
                        <tbody>{selected.items.filter((i: any) => i.product).map((i: any, idx: number) => (
                          <tr key={idx}><td>{i.product}</td><td>{i.qty}</td></tr>
                        ))}</tbody>
                      </table>
                    </div>
                  )}
                  <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    <a href={`mailto:${selected.email}`} className="admin-btn admin-btn-primary"><i className="fas fa-envelope"></i> Send Email</a>
                    <a href={`tel:${selected.phone}`} className="admin-btn admin-btn-outline"><i className="fas fa-phone"></i> Call</a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="admin-table-wrap"><table className="admin-table">
                <thead><tr><th>Customer</th><th>Company</th><th>Phone</th><th>City</th><th>Date</th></tr></thead>
                <tbody>{quotations.map((q) => (
                  <tr key={q.id} style={{ cursor: "pointer" }} onClick={() => setSelected(q)}>
                    <td style={{ fontWeight: 600 }}>{q.name}</td>
                    <td>{q.company || "-"}</td>
                    <td>{q.phone}</td>
                    <td>{q.city}</td>
                    <td><small>{q.createdAt?.toDate?.()?.toLocaleDateString()}</small></td>
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
