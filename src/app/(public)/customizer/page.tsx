"use client";

import { useState, useMemo } from "react";

type Category = "wheelbarrow" | "trolley" | "tub" | "stool";

interface ProductConfig {
  category: Category;
  gauge: string;
  tyre: string;
  size: string;
  height: string;
  color: string;
  logo: string | null;
  qty: number;
}

const categories: { value: Category; label: string; desc: string; icon: string }[] = [
  { value: "wheelbarrow", label: "Wheelbarrow", desc: "Premium / Heavy Duty / Standard", icon: "fa-wheelchair" },
  { value: "trolley", label: "Platform Trolley", desc: "Heavy Duty / Standard / Small", icon: "fa-truck" },
  { value: "tub", label: "Tub (Tray)", desc: "16 to 23 Gauge", icon: "fa-square" },
  { value: "stool", label: "Stool (2ft-10ft)", desc: "Custom Height", icon: "fa-chair" },
];

const gauges = ["14 Gauge (2.0 mm)", "16 Gauge (1.6 mm)", "18 Gauge (1.2 mm)", "20 Gauge (0.9 mm)", "23 Gauge (0.6 mm)"];
const tyres = ["8-Ply Heavy Duty", "6-Ply Premium", "4-Ply Standard"];
const sizes = ["Heavy Duty (Large)", "Standard (Medium)", "Small (Light Duty)"];
const heights = ["2 ft", "3 ft", "4 ft", "5 ft", "6 ft", "7 ft", "8 ft", "9 ft", "10 ft"];
const colors = ["#1a1a1a", "#D97700", "#2563eb", "#dc2626", "#16a34a", "#facc15", "#fff", "#9333ea"];

function calcPrice(cfg: ProductConfig): number {
  let base = 0;
  const g = cfg.gauge;
  const t = cfg.tyre;
  const s = cfg.size;
  const h = cfg.height;
  const cat = cfg.category;

  if (cat === "wheelbarrow") {
    base = 8500;
    if (g?.includes("14")) base = Math.round(base * 1.35);
    else if (g?.includes("16")) base = Math.round(base * 1.0);
    else if (g?.includes("18")) base = Math.round(base * 0.85);
    else if (g?.includes("20")) base = Math.round(base * 0.75);
    else base = Math.round(base * 0.65);

    if (t?.includes("8-Ply")) base += 1800;
    else if (t?.includes("6-Ply")) base += 800;
  } else if (cat === "trolley") {
    base = 12000;
    if (s?.includes("Heavy Duty")) base = Math.round(base * 1.3);
    else if (s?.includes("Small")) base = Math.round(base * 0.7);

    if (g?.includes("14")) base = Math.round(base * 1.3);
    else if (g?.includes("16")) base = Math.round(base * 1.0);
    else if (g?.includes("18")) base = Math.round(base * 0.85);
    else if (g?.includes("20")) base = Math.round(base * 0.75);

    if (t?.includes("8-Ply")) base += 2000;
    else if (t?.includes("6-Ply")) base += 1000;
  } else if (cat === "tub") {
    base = 3500;
    if (g?.includes("16")) base = Math.round(base * 1.4);
    else if (g?.includes("18")) base = Math.round(base * 1.15);
    else if (g?.includes("20")) base = Math.round(base * 1.0);
    else if (g?.includes("23")) base = Math.round(base * 0.8);
    else base = Math.round(base * 1.3);
  } else if (cat === "stool") {
    base = 1500;
    const ft = parseInt(h || "2");
    base += (ft - 2) * 500;
  }

  return base;
}

export default function CustomizerPage() {
  const [cfg, setCfg] = useState<ProductConfig>({
    category: "wheelbarrow",
    gauge: "16 Gauge (1.6 mm)",
    tyre: "6-Ply Premium",
    size: "Standard (Medium)",
    height: "4 ft",
    color: "#1a1a1a",
    logo: null,
    qty: 1,
  });
  const [showQuote, setShowQuote] = useState(false);

  const price = useMemo(() => calcPrice(cfg), [cfg]);
  const total = price * cfg.qty;

  const update = <K extends keyof ProductConfig>(key: K, val: ProductConfig[K]) => setCfg((p) => {
    const next = { ...p, [key]: val };
    if (key === "category") {
      if (val === "wheelbarrow") { next.gauge = "16 Gauge (1.6 mm)"; next.tyre = "6-Ply Premium"; next.size = "Standard (Medium)"; next.height = "4 ft"; }
      else if (val === "trolley") { next.gauge = "16 Gauge (1.6 mm)"; next.tyre = "6-Ply Premium"; next.size = "Heavy Duty (Large)"; next.height = "4 ft"; }
      else if (val === "tub") { next.gauge = "20 Gauge (0.9 mm)"; next.tyre = ""; next.size = ""; next.height = "4 ft"; }
      else { next.gauge = ""; next.tyre = ""; next.size = ""; next.height = "4 ft"; }
    }
    return next;
  });

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => update("logo", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const requestQuote = () => {
    const msg = `Khaziq & Sons Custom Order:\nCategory: ${cfg.category}\nGauge: ${cfg.gauge || "N/A"}\nTyre: ${cfg.tyre || "N/A"}\nSize: ${cfg.size || "N/A"}\nHeight: ${cfg.height || "N/A"}\nColor: ${cfg.color}\nQty: ${cfg.qty}\nEstimated Price: PKR ${total.toLocaleString()}`;
    const url = `https://wa.me/923042130631?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "40px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 8, textAlign: "center" }}>Product <span className="accent">Customizer</span></h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 40 }}>
          Customize your trolley — select size, gauge, tyre type & color. See live price update instantly.
        </p>

        <div className="customizer-layout">
          {/* Left: Preview */}
          <div className="customizer-preview">
            <div className="customizer-preview-box" style={{ background: cfg.color === "#fff" ? "#f5f5f5" : cfg.color }}>
              <i className="fas fa-tools" style={{ fontSize: "4rem", color: cfg.color === "#fff" || cfg.color === "#facc15" ? "#1a1a1a" : "#fff", opacity: 0.3 }}></i>
              <div className="customizer-preview-label">
                <strong>{cfg.category.charAt(0).toUpperCase() + cfg.category.slice(1)}</strong>
                <span>{cfg.gauge} | {cfg.tyre || cfg.size || cfg.height}</span>
              </div>
              {cfg.logo && <img src={cfg.logo} alt="Logo" className="customizer-logo-preview" />}
            </div>
            {cfg.logo && (
              <button className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "6px 12px", marginTop: 8 }} onClick={() => update("logo", null)}>
                <i className="fas fa-times"></i> Remove Logo
              </button>
            )}
          </div>

          {/* Right: Controls */}
          <div className="customizer-controls">
            {/* Category */}
            <div className="customizer-section">
              <label className="customizer-label">Category</label>
              <div className="customizer-cat-grid">
                {categories.map((c) => (
                  <button key={c.value} className={`customizer-cat-btn ${cfg.category === c.value ? "active" : ""}`} onClick={() => update("category", c.value)}>
                    <i className={`fas ${c.icon}`}></i>
                    <strong>{c.label}</strong>
                    <small>{c.desc}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="customizer-options">
              {(cfg.category === "wheelbarrow" || cfg.category === "trolley") && (
                <>
                  <div className="customizer-section">
                    <label className="customizer-label">Gauge (Steel Thickness)</label>
                    <div className="customizer-opt-row">
                      {gauges.slice(0, 4).map((g) => (
                        <button key={g} className={`customizer-opt-btn ${cfg.gauge === g ? "active" : ""}`} onClick={() => update("gauge", g)}>
                          {g.replace("Gauge", "G")}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="customizer-section">
                    <label className="customizer-label">Tyre Type</label>
                    <div className="customizer-opt-row">
                      {tyres.map((t) => (
                        <button key={t} className={`customizer-opt-btn ${cfg.tyre === t ? "active" : ""}`} onClick={() => update("tyre", t)}>{t}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {cfg.category === "trolley" && (
                <div className="customizer-section">
                  <label className="customizer-label">Size</label>
                  <div className="customizer-opt-row">
                    {sizes.map((s) => (
                      <button key={s} className={`customizer-opt-btn ${cfg.size === s ? "active" : ""}`} onClick={() => update("size", s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              {cfg.category === "tub" && (
                <div className="customizer-section">
                  <label className="customizer-label">Gauge (Steel Thickness)</label>
                  <div className="customizer-opt-row">
                    {gauges.slice(0, 4).map((g) => (
                      <button key={g} className={`customizer-opt-btn ${cfg.gauge === g ? "active" : ""}`} onClick={() => update("gauge", g)}>
                        {g.replace("Gauge", "G")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {cfg.category === "stool" && (
                <div className="customizer-section">
                  <label className="customizer-label">Height</label>
                  <div className="customizer-opt-row">
                    {heights.map((h) => (
                      <button key={h} className={`customizer-opt-btn ${cfg.height === h ? "active" : ""}`} onClick={() => update("height", h)}>{h}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              <div className="customizer-section">
                <label className="customizer-label">Color <span style={{ color: cfg.color, fontWeight: 700 }}>●</span></label>
                <div className="customizer-color-row">
                  {colors.map((c) => (
                    <button key={c} className={`customizer-color-btn ${cfg.color === c ? "active" : ""}`} style={{ background: c, border: c === "#fff" ? "2px solid #ddd" : "none" }} onClick={() => update("color", c)}></button>
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div className="customizer-section">
                <label className="customizer-label">Brand Logo (Optional)</label>
                <label className="customizer-upload-btn">
                  <i className="fas fa-upload"></i> Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogo} hidden />
                </label>
              </div>
            </div>

            {/* Quantity + Price */}
            <div className="customizer-pricing">
              <div className="customizer-qty">
                <label>Quantity:</label>
                <div className="customizer-qty-controls">
                  <button onClick={() => update("qty", Math.max(1, cfg.qty - 1))}>−</button>
                  <span>{cfg.qty}</span>
                  <button onClick={() => update("qty", cfg.qty + 1)}>+</button>
                </div>
              </div>
              <div className="customizer-total">
                <small>Per Unit</small>
                <h2>PKR {price.toLocaleString()}</h2>
                <small>Total: <strong>PKR {total.toLocaleString()}</strong></small>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={requestQuote}>
                <i className="fab fa-whatsapp"></i> Request Quote on WhatsApp
              </button>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowQuote(!showQuote)}>
                <i className="fas fa-file-pdf"></i> {showQuote ? "Hide" : "View"} Spec Sheet
              </button>
            </div>

            {showQuote && (
              <div className="customizer-spec" style={{ marginTop: 16 }}>
                <h4>Product Specification</h4>
                <table><tbody>
                  <tr><td>Category</td><td>{cfg.category.charAt(0).toUpperCase() + cfg.category.slice(1)}</td></tr>
                  {cfg.gauge && <tr><td>Gauge</td><td>{cfg.gauge}</td></tr>}
                  {cfg.tyre && <tr><td>Tyre</td><td>{cfg.tyre}</td></tr>}
                  {cfg.size && <tr><td>Size</td><td>{cfg.size}</td></tr>}
                  {cfg.height && <tr><td>Height</td><td>{cfg.height}</td></tr>}
                  <tr><td>Color</td><td><span style={{ display: "inline-block", width: 20, height: 20, background: cfg.color, borderRadius: 4, verticalAlign: "middle", marginRight: 8 }}></span>{cfg.color}</td></tr>
                  <tr><td>Quantity</td><td>{cfg.qty}</td></tr>
                  <tr><td>Estimated Price</td><td><strong>PKR {total.toLocaleString()}</strong></td></tr>
                </tbody></table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
