"use client";

import { useState, useMemo } from "react";

const cityData: Record<string, { dist: number; label: string }> = {
  karachi: { dist: 0, label: "Karachi" },
  hyderabad: { dist: 160, label: "Hyderabad" },
  sukkur: { dist: 460, label: "Sukkur" },
  multan: { dist: 860, label: "Multan" },
  faisalabad: { dist: 1120, label: "Faisalabad" },
  lahore: { dist: 1220, label: "Lahore" },
  gujranwala: { dist: 1270, label: "Gujranwala" },
  gujrat: { dist: 1290, label: "Gujrat" },
  sialkot: { dist: 1320, label: "Sialkot" },
  islamabad: { dist: 1420, label: "Islamabad" },
  rawalpindi: { dist: 1420, label: "Rawalpindi" },
  peshawar: { dist: 1620, label: "Peshawar" },
  quetta: { dist: 710, label: "Quetta" },
  other: { dist: 1000, label: "Other City" },
};

const products = [
  { label: "Wheelbarrow — Premium (14 Gauge)", weight: 32 },
  { label: "Wheelbarrow — Heavy Duty (16 Gauge)", weight: 28 },
  { label: "Wheelbarrow — Standard (18 Gauge)", weight: 24 },
  { label: "Platform Trolley — Heavy Duty", weight: 45 },
  { label: "Platform Trolley — Standard", weight: 35 },
  { label: "Platform Trolley — Small", weight: 25 },
  { label: "Tub — Premium 16 Gauge", weight: 12 },
  { label: "Tub — Heavy Duty 18 Gauge", weight: 10 },
  { label: "Tub — Standard 20 Gauge", weight: 8 },
  { label: "Tub — Affordable 23 Gauge", weight: 6 },
  { label: "Stool (per ft)", weight: 5 },
];

const RATE_PER_100KG_PER_KM = 14;

export default function FreightCalculatorPage() {
  const [from, setFrom] = useState("karachi");
  const [to, setTo] = useState("lahore");
  const [qty, setQty] = useState(10);
  const [productIdx, setProductIdx] = useState(0);
  const [transport, setTransport] = useState<"adda" | "courier">("adda");

  const result = useMemo(() => {
    const dist = Math.abs((cityData[to]?.dist || 1000) - (cityData[from]?.dist || 0));
    const prod = products[productIdx];
    const totalKg = prod.weight * qty;
    const ratePerKgPerKm = RATE_PER_100KG_PER_KM / 100;
    let base = totalKg * ratePerKgPerKm * dist;
    if (transport === "courier") base *= 1.5;
    const fuelAdj = Math.round(base * 1.08);
    const loading = transport === "adda" ? 800 : 0;
    return { dist, totalKg, base: Math.round(base), fuelAdj, loading, total: Math.round(fuelAdj + loading) };
  }, [from, to, qty, productIdx, transport]);

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "40px 16px", maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 8, textAlign: "center" }}>Freight &amp; Shipping <span className="accent">Calculator</span></h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 40 }}>
          Estimate your transport cost from Karachi to any city in Pakistan.
        </p>

        <div className="admin-card" style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label className="customizer-label">From</label>
              <select className="welcome-input" value={from} onChange={(e) => setFrom(e.target.value)}>
                {Object.entries(cityData).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="customizer-label">To</label>
              <select className="welcome-input" value={to} onChange={(e) => setTo(e.target.value)}>
                {Object.entries(cityData).filter(([k]) => k !== from).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label className="customizer-label">Product</label>
              <select className="welcome-input" value={productIdx} onChange={(e) => setProductIdx(Number(e.target.value))}>
                {products.map((p, i) => <option key={i} value={i}>{p.label} ({p.weight} kg)</option>)}
              </select>
            </div>
            <div>
              <label className="customizer-label">Quantity</label>
              <input className="welcome-input" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value)))} />
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label className="customizer-label">Transport Type</label>
            <div className="customizer-opt-row" style={{ marginTop: 6 }}>
              <button className={`customizer-opt-btn ${transport === "adda" ? "active" : ""}`} onClick={() => setTransport("adda")}>
                <i className="fas fa-truck"></i> Goods Adda (Shared)
              </button>
              <button className={`customizer-opt-btn ${transport === "courier" ? "active" : ""}`} onClick={() => setTransport("courier")}>
                <i className="fas fa-shipping-fast"></i> Courier (Door to Door)
              </button>
            </div>
          </div>

          <div className="freight-result">
            <div className="freight-result-row">
              <span>Distance</span>
              <strong>{result.dist.toLocaleString()} km</strong>
            </div>
            <div className="freight-result-row">
              <span>Total Weight</span>
              <strong>{result.totalKg.toLocaleString()} kg ({qty} units × {products[productIdx].weight} kg)</strong>
            </div>
            <div className="freight-divider"></div>
            <div className="freight-result-row">
              <span>Base Transport</span>
              <strong>PKR {result.base.toLocaleString()}</strong>
            </div>
            <div className="freight-result-row">
              <span>Fuel Adjustment (8%)</span>
              <strong>PKR {result.fuelAdj.toLocaleString()}</strong>
            </div>
            {result.loading > 0 && (
              <div className="freight-result-row">
                <span>Loading Charges</span>
                <strong>PKR {result.loading.toLocaleString()}</strong>
              </div>
            )}
            <div className="freight-divider"></div>
            <div className="freight-result-row freight-total">
              <span>Estimated Freight Total</span>
              <strong>PKR {result.total.toLocaleString()}</strong>
            </div>
            <div className="freight-result-row" style={{ fontSize: "0.8rem", color: "#888" }}>
              <span>Per Unit Cost</span>
              <strong>PKR {Math.round(result.total / qty).toLocaleString()}</strong>
            </div>
          </div>

          <p style={{ fontSize: "0.75rem", color: "#999", marginTop: 12, textAlign: "center" }}>
            <i className="fas fa-info-circle"></i> Rates are estimated based on current market averages. Final cost may vary.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <a href={`https://wa.me/923042130631?text=${encodeURIComponent(`Freight Estimate:\nFrom: ${cityData[from]?.label}\nTo: ${cityData[to]?.label}\nProduct: ${products[productIdx].label}\nQty: ${qty}\nEstimated Freight: PKR ${result.total.toLocaleString()}`)}`} target="_blank" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              <i className="fab fa-whatsapp"></i> Share on WhatsApp
            </a>
            <a href="tel:+923042130631" className="btn btn-outline" style={{ justifyContent: "center" }}>
              <i className="fas fa-phone"></i> Call for Exact Rate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
