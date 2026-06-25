"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { useRetailer } from "@/context/RetailerContext";

type Product = {
  id: string; name: string; description: string;
  retailerPrice: string; image: string; category: string;
  specs: string;
};

type CartItem = { product: Product; qty: number; price: number };

const categories = ["All", "Trolleys", "Wheelbarrow", "Hand Truck", "Spare Parts"];

export default function RetailerProducts() {
  const { retailer } = useRetailer();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "products"));
      const list: Product[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Product));
      setProducts(list);
      setFiltered(list);
    })();
  }, []);

  useEffect(() => {
    setFiltered(cat === "All" ? products : products.filter((p) => p.category === cat));
  }, [cat, products]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) return prev.map((c) => c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      const price = parseInt(product.retailerPrice) || 0;
      return [...prev, { product, qty: 1, price }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { setCart((prev) => prev.filter((c) => c.product.id !== id)); return; }
    setCart((prev) => prev.map((c) => c.product.id === id ? { ...c, qty } : c));
  };

  const totalPrice = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  const placeOrder = async () => {
    if (cart.length === 0 || !retailer) return;
    const items = cart.map((c) => `${c.product.name} x${c.qty}`).join(", ");
    try {
      await addDoc(collection(db, "orders"), {
        retailerId: retailer.retailerId, retailerName: retailer.fullName,
        items, total: totalPrice, cart: cart.map((c) => ({ name: c.product.name, qty: c.qty, price: c.price })),
        status: "pending", createdAt: Timestamp.now(),
      });
      setCart([]);
      setOrderPlaced(true);
      setTimeout(() => setOrderPlaced(false), 3000);
    } catch {}
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ marginBottom: 4 }}>Products Catalog</h2>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>Browse our premium products and place bulk orders at wholesale rates.</p>
        </div>
        <button className="btn btn-primary" style={{ padding: "10px 20px", fontSize: "0.85rem", position: "relative" }} onClick={() => setShowCart(!showCart)}>
          <i className="fas fa-shopping-cart"></i> Cart ({cart.length})
        </button>
      </div>

      {orderPlaced && <div style={{ background: "#dcfce7", color: "#16a34a", padding: "12px 16px", borderRadius: 8, marginBottom: 16, fontWeight: 600 }}>✅ Order placed successfully! We will contact you soon.</div>}

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map((c) => (
          <button key={c} className={`retailer-cat-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {showCart && (
        <div className="retailer-cart-panel">
          <h3 style={{ marginBottom: 12 }}>Cart ({cart.length})</h3>
          {cart.length === 0 ? <p style={{ color: "#888", fontSize: "0.85rem" }}>Cart is empty.</p> : (
            <>
              {cart.map((c) => (
                <div key={c.product.id} className="retailer-cart-item">
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{c.product.name}</div><div style={{ fontSize: "0.75rem", color: "#D97700" }}>PKR {c.price.toLocaleString()} × {c.qty}</div></div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button className="retailer-qty-btn" onClick={() => updateQty(c.product.id, c.qty - 1)}>−</button>
                    <span style={{ fontWeight: 600, width: 24, textAlign: "center" }}>{c.qty}</span>
                    <button className="retailer-qty-btn" onClick={() => updateQty(c.product.id, c.qty + 1)}>+</button>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1rem", padding: "12px 0", borderTop: "1px solid #e5e7eb", marginTop: 8 }}>
                <span>Total</span><span style={{ color: "#D97700" }}>PKR {totalPrice.toLocaleString()}</span>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px", marginTop: 8 }} onClick={placeOrder} disabled={!retailer}>
                <i className="fas fa-paper-plane"></i> Place Order
              </button>
            </>
          )}
          <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center", padding: "8px", marginTop: 8, fontSize: "0.8rem" }} onClick={() => setShowCart(false)}>Close</button>
        </div>
      )}

      <div className="retailer-product-grid">
        {filtered.map((p) => {
          const price = parseInt(p.retailerPrice) || 0;
          return (
            <div key={p.id} className="retailer-product-card">
              {p.image && <img src={p.image} alt={p.name} className="retailer-product-img" />}
              <div className="retailer-product-body">
                <span className="retailer-product-cat">{p.category || "General"}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                {p.specs && <div className="retailer-specs">{p.specs}</div>}
                <div className="retailer-product-price">PKR {price.toLocaleString()}</div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: "0.85rem" }} onClick={() => addToCart(p)}>
                  <i className="fas fa-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
