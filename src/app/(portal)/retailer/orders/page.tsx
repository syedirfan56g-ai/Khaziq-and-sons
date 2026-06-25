"use client";

import { useEffect, useState } from "react";
import { useRetailer } from "@/context/RetailerContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import Link from "next/link";

type Order = {
  id: string; retailerId: string; items: string; total: number;
  status: string; createdAt: { seconds: number }; cart: { name: string; qty: number; price: number }[];
  adminNote: string;
};

export default function RetailerOrders() {
  const { retailer } = useRetailer();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");

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

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const statusBadge = (s: string) => {
    const colors: Record<string, string> = { pending: "#d97700", approved: "#16a34a", shipped: "#2563eb", delivered: "#7c3aed", rejected: "#dc2626" };
    return <span style={{ background: colors[s] || "#888", color: "#fff", padding: "2px 10px", borderRadius: 12, fontSize: "0.75rem", fontWeight: 600 }}>{s}</span>;
  };

  const statusSteps = ["pending", "approved", "shipped", "delivered"];

  return (
    <div>
      <h2 style={{ marginBottom: 4 }}>My Orders</h2>
      <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: 20 }}>Track all your orders from Khaziq & Sons.</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["all", "pending", "approved", "shipped", "delivered", "rejected"].map((f) => (
          <button key={f} className={`retailer-cat-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="retailer-card" style={{ textAlign: "center", padding: 40, color: "#888" }}>
          <i className="fas fa-shopping-cart" style={{ fontSize: "2.5rem", marginBottom: 12, display: "block", color: "#ddd" }}></i>
          <h3 style={{ marginBottom: 8 }}>No Orders Found</h3>
          <p style={{ marginBottom: 16 }}>You haven't placed any orders yet.</p>
          <Link href="/retailer/products" className="btn btn-primary"><i className="fas fa-box"></i> Browse Products</Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map((o) => (
            <div key={o.id} className="retailer-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                <div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#888" }}>#{(o.id || "").slice(0, 8).toUpperCase()}</span>
                  <span style={{ margin: "0 8px", color: "#ddd" }}>|</span>
                  <span style={{ fontSize: "0.85rem", color: "#888" }}>{o.createdAt?.seconds ? new Date(o.createdAt.seconds * 1000).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
                </div>
                {statusBadge(o.status)}
              </div>
              <div style={{ marginBottom: 12 }}>
                {o.cart && o.cart.length > 0 ? (
                  <table className="retailer-table">
                    <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
                    <tbody>{o.cart.map((c, i) => (
                      <tr key={i}><td>{c.name}</td><td>{c.qty}</td><td>PKR {c.price.toLocaleString()}</td><td>PKR {(c.price * c.qty).toLocaleString()}</td></tr>
                    ))}</tbody>
                  </table>
                ) : (
                  <p style={{ fontSize: "0.85rem" }}>{o.items}</p>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {statusSteps.map((step, i) => {
                    const idx = statusSteps.indexOf(o.status);
                    const done = i <= idx;
                    return (
                      <div key={step} style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", background: done ? "#D97700" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: done ? "#fff" : "#999" }}>
                          {done ? <i className="fas fa-check"></i> : i + 1}
                        </div>
                        {i < statusSteps.length - 1 && <div style={{ width: 24, height: 2, background: done && i < idx ? "#D97700" : "#e5e7eb" }}></div>}
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "#D97700" }}>PKR {o.total?.toLocaleString()}</div>
              </div>
              {o.adminNote && <div style={{ marginTop: 12, padding: "10px 14px", background: "#fef3c7", borderRadius: 8, fontSize: "0.85rem" }}><strong>Admin:</strong> {o.adminNote}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
