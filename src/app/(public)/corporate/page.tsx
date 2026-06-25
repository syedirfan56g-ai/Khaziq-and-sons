"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, addDoc, orderBy, Timestamp } from "firebase/firestore";

export default function CorporateLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", company: "" });
  const [step, setStep] = useState<"login" | "dashboard">("login");
  const [corp, setCorp] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  // Check if already logged in
  useEffect(() => {
    const saved = localStorage.getItem("khaziq_corporate");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCorp(data);
        setStep("dashboard");
      } catch { localStorage.removeItem("khaziq_corporate"); }
    }
  }, []);

  useEffect(() => {
    if (corp?.email) (async () => {
      const q = query(collection(db, "corporateOrders"), where("email", "==", corp.email), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list: any[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setOrders(list);
    })();
  }, [corp]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query(collection(db, "corporateClients"), where("email", "==", form.email), where("company", "==", form.company));
    const snap = await getDocs(q);
    if (snap.empty) {
      // Auto-register
      await addDoc(collection(db, "corporateClients"), { ...form, createdAt: Timestamp.now() });
    }
    const data = { email: form.email, company: form.company };
    localStorage.setItem("khaziq_corporate", JSON.stringify(data));
    setCorp(data);
    setStep("dashboard");
  };

  const logout = () => { localStorage.removeItem("khaziq_corporate"); setCorp(null); setStep("login"); setOrders([]); };

  if (step === "login") {
    return (
      <div className="page-header">
        <div className="container" style={{ padding: "60px 16px", maxWidth: 500, margin: "0 auto" }}>
          <div className="welcome-card" style={{ textAlign: "center" }}>
            <i className="fas fa-building" style={{ fontSize: "2.5rem", color: "#D97700", marginBottom: 12 }}></i>
            <h2>Corporate Client Portal</h2>
            <p style={{ color: "#888", fontSize: "0.9rem", marginBottom: 24 }}>Track your bulk orders, download invoices, and manage your account.</p>
            <form onSubmit={handleLogin}>
              <input className="welcome-input" placeholder="Company Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input className="welcome-input" placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required style={{ marginTop: 10 }} />
              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 16, justifyContent: "center" }}>
                <i className="fas fa-sign-in-alt"></i> Login / Register
              </button>
            </form>
            <p style={{ fontSize: "0.8rem", color: "#888", marginTop: 12 }}>First time? Just enter your email and company name to register.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "60px 16px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", margin: 0 }}>Corporate <span className="accent">Dashboard</span></h1>
            <p style={{ color: "#888", fontSize: "0.9rem" }}>{corp?.company} — {corp?.email}</p>
          </div>
          <button className="btn btn-outline" onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
        </div>

        {/* Order Tracking */}
        <div className="admin-card" style={{ marginBottom: 24 }}>
          <div className="admin-card-header"><h3><i className="fas fa-truck"></i> Order Tracking</h3></div>
          {orders.length === 0 ? (
            <div className="admin-empty" style={{ padding: 40 }}>
              <i className="fas fa-box-open" style={{ fontSize: "2.5rem", color: "#ddd" }}></i>
              <h3>No Orders Yet</h3>
              <p>Your bulk order history will appear here once placed.</p>
            </div>
          ) : (
            <div className="admin-table-wrap"><table className="admin-table">
              <thead><tr><th>Order #</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>{orders.map((o) => (
                <tr key={o.id}>
                  <td style={{ fontWeight: 600 }}>#{o.orderNumber || o.id.slice(-6).toUpperCase()}</td>
                  <td>{o.items?.length || 0} items</td>
                  <td>{o.total ? `PKR ${o.total.toLocaleString()}` : "-"}</td>
                  <td>
                    <span className={`order-status order-status-${(o.status || "pending").toLowerCase()}`}>
                      {o.status || "Pending"}
                    </span>
                  </td>
                  <td><small>{o.createdAt?.toDate?.()?.toLocaleDateString()}</small></td>
                </tr>
              ))}</tbody>
            </table></div>
          )}
        </div>

        {/* Contact */}
        <div className="admin-card" style={{ textAlign: "center", padding: 24 }}>
          <i className="fas fa-headset" style={{ fontSize: "2rem", color: "#D97700", marginBottom: 8 }}></i>
          <h3>Need Help With Your Order?</h3>
          <p style={{ color: "#888" }}>Contact our corporate sales team</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
            <a href="tel:+923042130631" className="btn btn-primary"><i className="fas fa-phone"></i> +92 304 2130631</a>
            <a href="mailto:khaziqandsons@gmail.com" className="btn btn-outline"><i className="fas fa-envelope"></i> Email</a>
          </div>
        </div>
      </div>
    </div>
  );
}
