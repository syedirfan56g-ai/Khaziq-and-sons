"use client";

import { useEffect, useState } from "react";
import { useRetailer } from "@/context/RetailerContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

type Order = { id: string; status: string; total: number; createdAt: { seconds: number }; cart: { name: string; qty: number; price: number }[] };

export default function RetailerAnalytics() {
  const { retailer } = useRetailer();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!retailer) return;
    (async () => {
      const q = query(collection(db, "orders"), where("retailerId", "==", retailer.retailerId), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list: Order[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Order));
      setOrders(list);
    })();
  }, [retailer]);

  if (!retailer) return null;

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const approvedOrders = orders.filter((o) => o.status === "approved" || o.status === "shipped" || o.status === "delivered").length;
  const rejectedOrders = orders.filter((o) => o.status === "rejected").length;

  const totalItems = orders.reduce((sum, o) => sum + (o.cart ? o.cart.reduce((s, c) => s + c.qty, 0) : 0), 0);

  const monthlyData: Record<string, { orders: number; spent: number }> = {};
  orders.forEach((o) => {
    if (!o.createdAt?.seconds) return;
    const d = new Date(o.createdAt.seconds * 1000);
    const key = `${d.toLocaleString("en", { month: "short" })} ${d.getFullYear()}`;
    if (!monthlyData[key]) monthlyData[key] = { orders: 0, spent: 0 };
    monthlyData[key].orders++;
    monthlyData[key].spent += o.total || 0;
  });

  const topProducts: Record<string, number> = {};
  orders.forEach((o) => {
    if (o.cart) o.cart.forEach((c) => { topProducts[c.name] = (topProducts[c.name] || 0) + c.qty; });
  });
  const sortedProducts = Object.entries(topProducts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div>
      <h2 style={{ marginBottom: 4 }}>Analytics</h2>
      <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: 24 }}>Your business performance at a glance.</p>

      <div className="retailer-stats">
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#fef3c7", color: "#d97700" }}><i className="fas fa-shopping-bag"></i></div><div><h3>{totalOrders}</h3><p>Total Orders</p></div></div>
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#dcfce7", color: "#16a34a" }}><i className="fas fa-rupee-sign"></i></div><div><h3>PKR {totalSpent.toLocaleString()}</h3><p>Total Spent</p></div></div>
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#dbeafe", color: "#2563eb" }}><i className="fas fa-boxes"></i></div><div><h3>{totalItems}</h3><p>Total Items</p></div></div>
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#fce7f3", color: "#ec4899" }}><i className="fas fa-check-circle"></i></div><div><h3>{approvedOrders}</h3><p>Approved</p></div></div>
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#fef3c7", color: "#d97700" }}><i className="fas fa-clock"></i></div><div><h3>{pendingOrders}</h3><p>Pending</p></div></div>
        <div className="retailer-stat-card"><div className="retailer-stat-icon" style={{ background: "#fee2e2", color: "#dc2626" }}><i className="fas fa-times-circle"></i></div><div><h3>{rejectedOrders}</h3><p>Rejected</p></div></div>
      </div>

      <div className="retailer-card">
        <div className="retailer-card-header"><h3>Monthly Activity</h3></div>
        <table className="retailer-table">
          <thead><tr><th>Month</th><th>Orders</th><th>Total Spent</th></tr></thead>
          <tbody>{Object.entries(monthlyData).reverse().map(([month, data]) => (
            <tr key={month}>
              <td style={{ fontWeight: 600 }}>{month}</td>
              <td>{data.orders}</td>
              <td style={{ fontWeight: 600, color: "#D97700" }}>PKR {data.spent.toLocaleString()}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {sortedProducts.length > 0 && (
        <div className="retailer-card">
          <div className="retailer-card-header"><h3>Top Ordered Products</h3></div>
          <table className="retailer-table">
            <thead><tr><th>Product</th><th>Total Qty Ordered</th></tr></thead>
            <tbody>{sortedProducts.map(([name, qty]) => (
              <tr key={name}><td>{name}</td><td style={{ fontWeight: 600 }}>{qty}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
