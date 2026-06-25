"use client";

import { useEffect, useState } from "react";
import { useRetailer } from "@/context/RetailerContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import Link from "next/link";

type Order = {
  id: string; retailerId: string; items: string; total: number;
  status: string; createdAt: { seconds: number };
};

export default function RetailerDashboard() {
  const { retailer } = useRetailer();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, shipped: 0 });

  useEffect(() => {
    if (!retailer) return;
    (async () => {
      const q = query(collection(db, "orders"), where("retailerId", "==", retailer.retailerId), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list: Order[] = [];
      let pending = 0, approved = 0, shipped = 0;
      snap.forEach((d) => {
        const o = { id: d.id, ...d.data() } as Order;
        list.push(o);
        if (o.status === "pending") pending++;
        else if (o.status === "approved") approved++;
        else if (o.status === "shipped") shipped++;
      });
      setOrders(list);
      setStats({ total: list.length, pending, approved, shipped });
    })();
  }, [retailer]);

  if (!retailer) return null;

  const statusBadge = (s: string) => {
    const colors: Record<string, string> = { pending: "#d97700", approved: "#16a34a", shipped: "#2563eb", delivered: "#7c3aed" };
    return <span style={{ background: colors[s] || "#888", color: "#fff", padding: "2px 10px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600 }}>{s}</span>;
  };

  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>Dashboard</h2>
      <p style={{ color: "#666", marginBottom: 24, fontSize: "0.85rem" }}>Welcome back, {retailer.fullName}! Here is your account overview.</p>

      {/* Credit Ledger (Khata) */}
      <div className="retailer-card" style={{ marginBottom: 20 }}>
        <div className="retailer-card-header"><h3><i className="fas fa-wallet" style={{ color: "#D97700" }}></i> Credit Ledger (Khata)</h3></div>
        <div style={{ padding: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          <div><small style={{ color: "#888" }}>Credit Limit</small><h3 style={{ color: "#D97700", margin: 0 }}>PKR 500,000</h3></div>
          <div><small style={{ color: "#888" }}>Outstanding</small><h3 style={{ color: "#dc2626", margin: 0 }}>PKR 0</h3></div>
          <div><small style={{ color: "#888" }}>Available Credit</small><h3 style={{ color: "#16a34a", margin: 0 }}>PKR 500,000</h3></div>
          <div><small style={{ color: "#888" }}>Next Due Date</small><h3 style={{ margin: 0, fontSize: "1rem" }}>N/A</h3></div>
        </div>
        <div style={{ padding: "0 16px 16px", fontSize: "0.8rem", color: "#888" }}>
          <i className="fas fa-info-circle"></i> Contact admin to set credit limit. Payments tracked monthly.
        </div>
      </div>

      <div className="retailer-stats">
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#fef3c7", color: "#d97700" }}><i className="fas fa-shopping-cart"></i></div><div><h3>{stats.total}</h3><p>Total Orders</p></div></div>
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#fef3c7", color: "#d97700" }}><i className="fas fa-clock"></i></div><div><h3>{stats.pending}</h3><p>Pending</p></div></div>
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}><i className="fas fa-check"></i></div><div><h3>{stats.approved}</h3><p>Approved</p></div></div>
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#dbeafe", color: "#2563eb" }}><i className="fas fa-truck"></i></div><div><h3>{stats.shipped}</h3><p>Shipped</p></div></div>
      </div>

      <div className="retailer-card">
        <div className="retailer-card-header"><h3>Quick Actions</h3></div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 16 }}>
          <Link href="/retailer/products" className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "0.85rem" }}><i className="fas fa-box"></i> Browse Products</Link>
          <Link href="/retailer/orders" className="btn btn-outline" style={{ padding: "10px 20px", fontSize: "0.85rem" }}><i className="fas fa-shopping-cart"></i> View Orders</Link>
          <Link href="/retailer/analytics" className="btn btn-outline" style={{ padding: "10px 20px", fontSize: "0.85rem" }}><i className="fas fa-chart-line"></i> Analytics</Link>
        </div>
      </div>

      <div className="retailer-card">
        <div className="retailer-card-header"><h3>Recent Orders</h3><Link href="/retailer/orders" style={{ fontSize: "0.8rem", color: "#D97700" }}>View All</Link></div>
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: 32, color: "#888" }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: "2rem", marginBottom: 8, display: "block", color: "#ddd" }}></i>
            <p>No orders yet. <Link href="/retailer/products" style={{ color: "#D97700" }}>Browse our catalog</Link> to place your first order.</p>
          </div>
        ) : (
          <table className="retailer-table">
            <thead><tr><th>Order</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>{orders.slice(0, 5).map((o) => (
              <tr key={o.id}>
                <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>#{o.id.slice(0, 8)}</td>
                <td style={{ fontSize: "0.85rem" }}>{o.items}</td>
                <td style={{ fontWeight: 600 }}>PKR {o.total?.toLocaleString()}</td>
                <td style={{ fontSize: "0.8rem", color: "#888" }}>{o.createdAt?.seconds ? new Date(o.createdAt.seconds * 1000).toLocaleDateString() : ""}</td>
                <td>{statusBadge(o.status)}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
