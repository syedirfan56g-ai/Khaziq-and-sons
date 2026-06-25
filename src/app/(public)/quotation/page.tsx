"use client";

import { useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const products = [
  { name: "Premium Wheelbarrow", cat: "Wheelbarrows" },
  { name: "Heavy Duty Wheelbarrow", cat: "Wheelbarrows" },
  { name: "Standard Wheelbarrow", cat: "Wheelbarrows" },
  { name: "Platform Trolley — Heavy Duty", cat: "Trolleys" },
  { name: "Platform Trolley — Standard", cat: "Trolleys" },
  { name: "Small Platform Trolley — Heavy Duty", cat: "Trolleys" },
  { name: "Small Platform Trolley — Standard", cat: "Trolleys" },
  { name: "Premium 16 Gauge Tub (1.6 mm)", cat: "Tubs" },
  { name: "Heavy Duty 18 Gauge Tub (1.2 mm)", cat: "Tubs" },
  { name: "Standard 20 Gauge Tub (0.9 mm)", cat: "Tubs" },
  { name: "Affordable 23 Gauge Tub (0.6 mm)", cat: "Tubs" },
  { name: "Premium Service Tyre — 8 Ply", cat: "Tyres" },
  { name: "Service Tyre — 6 Ply", cat: "Tyres" },
  { name: "Service Tyre — 4 Ply", cat: "Tyres" },
  { name: "Super Swallow Tyre — 8 Ply", cat: "Tyres" },
  { name: "Premium Heavy Duty Rim / Wheel", cat: "Rims" },
  { name: "Heavy Duty Rim / Wheel", cat: "Rims" },
  { name: "Standard Rim / Wheel", cat: "Rims" },
  { name: "Affordable Rim / Wheel", cat: "Rims" },
  { name: "Stools (2ft to 10ft)", cat: "Stools" },
  { name: "Bearings 6203 & 6204", cat: "Spare Parts" },
  { name: "Axles", cat: "Spare Parts" },
  { name: "Nuts & Bolts", cat: "Spare Parts" },
];

export default function QuotationPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", city: "",
    items: [{ product: "", qty: 1 }],
    notes: "",
  });
  const [generating, setGenerating] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateItem = (i: number, field: string, value: string | number) => {
    const items = [...form.items];
    items[i] = { ...items[i], [field]: value } as { product: string; qty: number };
    setForm({ ...form, items });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { product: "", qty: 1 }] });
  const removeItem = (i: number) => setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) });

  const generatePDF = async () => {
    setGenerating(true);
    try {
      await addDoc(collection(db, "quotations"), { ...form, createdAt: Timestamp.now() });
      const html2pdf = (await import("html2pdf.js")).default;

      // Build the PDF content as HTML string
      const itemsHtml = form.items.filter((i) => i.product).map((item, i) =>
        `<tr style="border-bottom:1px solid #f0f0f0"><td style="padding:8px 12px">${i + 1}</td><td style="padding:8px 12px">${item.product}</td><td style="padding:8px 12px;text-align:center">${item.qty}</td><td style="padding:8px 12px;text-align:right;color:#D97700;font-weight:600">Contact Us</td><td style="padding:8px 12px;text-align:right;color:#D97700;font-weight:600">Volume Based</td></tr>`
      ).join("");

      const notesHtml = form.notes ? `<div style="margin-bottom:20px;font-size:0.8rem"><strong>Additional Notes:</strong><p style="color:#555;margin-top:4px">${form.notes}</p></div>` : "";
      const companyRow = form.company ? `<tr><td style="font-weight:600;padding:4px 0">Company:</td><td style="padding:4px 0">${form.company}</td></tr>` : "";
      const emailRow = form.email ? `<tr><td style="font-weight:600;padding:4px 0">Email:</td><td style="padding:4px 0">${form.email}</td></tr>` : "";

      const html = `
        <div style="width:794px;background:#fff;padding:30px;font-family:Arial,sans-serif;color:#000">
          <div style="border-bottom:3px solid #D97700;padding-bottom:16px;margin-bottom:20px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <img src="/logo.png" style="height:50px" />
              <div style="text-align:right">
                <h1 style="font-size:1.4rem;margin:0">Khaziq &amp; Sons</h1>
                <p style="font-size:0.75rem;color:#888;margin:0">Premium Construction &amp; Agriculture Equipment Manufacturer</p>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#555;margin-top:8px">
              <span>Landhi, Karachi, Pakistan</span>
              <span>+92 304 2130631 | khaziqandsons@gmail.com</span>
            </div>
          </div>
          <h2 style="font-size:1.2rem;text-align:center;margin-bottom:4px">Official Quotation</h2>
          <p style="text-align:center;font-size:0.8rem;color:#888;margin-bottom:20px">Quotation Date: ${new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</p>
          <table style="width:100%;font-size:0.8rem;margin-bottom:16px">
            <tr><td style="font-weight:600;width:120px;padding:4px 0">Customer Name:</td><td style="padding:4px 0">${form.name}</td></tr>
            ${companyRow}
            <tr><td style="font-weight:600;padding:4px 0">Phone:</td><td style="padding:4px 0">${form.phone}</td></tr>
            ${emailRow}
            <tr><td style="font-weight:600;padding:4px 0">City:</td><td style="padding:4px 0">${form.city}</td></tr>
          </table>
          <table style="width:100%;border-collapse:collapse;font-size:0.8rem;margin-bottom:16px">
            <thead><tr style="background:#1a1a1a;color:#fff">
              <th style="padding:8px 12px;text-align:left">#</th>
              <th style="padding:8px 12px;text-align:left">Product</th>
              <th style="padding:8px 12px;text-align:center">Quantity</th>
              <th style="padding:8px 12px;text-align:right">Unit Price</th>
              <th style="padding:8px 12px;text-align:right">Total</th>
            </tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="background:#fff3e6;padding:12px 16px;border-radius:6px;margin-bottom:20px;font-size:0.8rem">
            <strong style="color:#D97700">Note:</strong> All prices are volume-based and customized. Our team will contact you within 24 hours with a detailed quotation.
          </div>
          ${notesHtml}
          <div style="border-top:2px solid #1a1a1a;padding-top:12px;font-size:0.75rem;color:#888;text-align:center">
            <p>Khaziq &amp; Sons | Landhi, Karachi, Pakistan | +92 304 2130631 | khaziqandsons@gmail.com | khaziqandsons.com</p>
            <p>&copy; ${new Date().getFullYear()} Khaziq &amp; Sons. This is a computer-generated quotation.</p>
          </div>
        </div>
      `;

      // Create temp element, render, capture, remove
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "0";
      wrapper.style.top = "0";
      wrapper.style.zIndex = "-9999";
      wrapper.style.opacity = "0";
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);

      await html2pdf().set({
        margin: [15, 15, 15, 15],
        filename: `Quotation_Khaziq_and_Sons_${form.company || form.name}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3, useCORS: true, letterRendering: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      } as Record<string, unknown>).from(wrapper).save();

      document.body.removeChild(wrapper);
    } catch { alert("PDF generation failed. Please try again."); }
    setGenerating(false);
  };

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "40px 16px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.8rem", marginBottom: 4 }}>Request <span className="accent">Quotation</span></h1>
        <p style={{ color: "#888", marginBottom: 32 }}>Fill in your requirements and download a professional PDF quotation.</p>

        <div className="quotation-form-wrap">
          <div className="quotation-form-section">
            <h3>Your Details</h3>
            <div className="quotation-form-grid">
              <input className="welcome-input" name="name" placeholder="Full Name *" value={form.name} onChange={update} required />
              <input className="welcome-input" name="company" placeholder="Company Name" value={form.company} onChange={update} />
              <input className="welcome-input" name="phone" placeholder="Phone Number *" value={form.phone} onChange={update} required />
              <input className="welcome-input" name="email" placeholder="Email Address" value={form.email} onChange={update} />
              <input className="welcome-input" name="city" placeholder="City *" value={form.city} onChange={update} required style={{ gridColumn: "1 / -1" }} />
            </div>
          </div>

          <div className="quotation-form-section">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3>Products Required</h3>
              <button className="btn btn-outline" style={{ padding: "6px 14px", fontSize: "0.8rem" }} onClick={addItem}><i className="fas fa-plus"></i> Add Row</button>
            </div>
            {form.items.map((item, i) => (
              <div key={i} className="quotation-item-row">
                <select className="welcome-input" value={item.product} onChange={(e) => updateItem(i, "product", e.target.value)} required style={{ marginBottom: 0 }}>
                  <option value="">Select product...</option>
                  {products.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
                <input className="welcome-input" type="number" min={1} value={item.qty} onChange={(e) => updateItem(i, "qty", parseInt(e.target.value) || 1)} style={{ width: 80, marginBottom: 0, textAlign: "center" }} />
                {form.items.length > 1 && <button className="btn btn-outline" style={{ padding: "6px 10px", fontSize: "0.8rem", color: "#dc2626", borderColor: "#fee2e2" }} onClick={() => removeItem(i)}><i className="fas fa-times"></i></button>}
              </div>
            ))}
          </div>

          <div className="quotation-form-section">
            <h3>Additional Notes</h3>
            <textarea className="welcome-input" name="notes" placeholder="Any specific requirements, delivery timeline, or custom requests..." value={form.notes} onChange={update} rows={3} style={{ resize: "none" }} />
          </div>

          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }} onClick={generatePDF} disabled={generating || !form.name || !form.phone || !form.city}>
            <i className="fas fa-file-pdf"></i> {generating ? "Generating..." : "Download PDF Quotation"}
          </button>
        </div>

        {/* PDF content — hidden visually but renderable by html2canvas */}
        <div ref={contentRef} className="quotation-pdf" style={{ position: "fixed", left: 0, top: 0, width: "794px", background: "#fff", padding: "30px", fontFamily: "Arial, sans-serif", color: "#000", zIndex: -9999, opacity: 0.01, pointerEvents: "none" }}>
          <div style={{ borderBottom: "3px solid #D97700", paddingBottom: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <img src="/logo.png" alt="Khaziq & Sons" style={{ height: 50 }} />
              <div style={{ textAlign: "right" }}>
                <h1 style={{ fontSize: "1.4rem", margin: 0, textTransform: "none" }}>Khaziq &amp; Sons</h1>
                <p style={{ fontSize: "0.75rem", color: "#888", margin: 0 }}>Premium Construction Equipment Manufacturer</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#555", marginTop: 8 }}>
              <span>Landhi, Karachi, Pakistan</span>
              <span>+92 304 2130631 | khaziqandsons@gmail.com</span>
            </div>
          </div>

          <h2 style={{ fontSize: "1.2rem", textAlign: "center", marginBottom: 4, textTransform: "none" }}>Official Quotation</h2>
          <p style={{ textAlign: "center", fontSize: "0.8rem", color: "#888", marginBottom: 20 }}>Quotation Date: {new Date().toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</p>

          <table style={{ width: "100%", fontSize: "0.8rem", marginBottom: 16 }}>
            <tr><td style={{ fontWeight: 600, width: 120, padding: "4px 0" }}>Customer Name:</td><td style={{ padding: "4px 0" }}>{form.name}</td></tr>
            {form.company && <tr><td style={{ fontWeight: 600, padding: "4px 0" }}>Company:</td><td style={{ padding: "4px 0" }}>{form.company}</td></tr>}
            <tr><td style={{ fontWeight: 600, padding: "4px 0" }}>Phone:</td><td style={{ padding: "4px 0" }}>{form.phone}</td></tr>
            {form.email && <tr><td style={{ fontWeight: 600, padding: "4px 0" }}>Email:</td><td style={{ padding: "4px 0" }}>{form.email}</td></tr>}
            <tr><td style={{ fontWeight: 600, padding: "4px 0" }}>City:</td><td style={{ padding: "4px 0" }}>{form.city}</td></tr>
          </table>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", marginBottom: 16 }}>
            <thead><tr style={{ background: "#1a1a1a", color: "#fff" }}>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>#</th>
              <th style={{ padding: "8px 12px", textAlign: "left" }}>Product</th>
              <th style={{ padding: "8px 12px", textAlign: "center" }}>Quantity</th>
              <th style={{ padding: "8px 12px", textAlign: "right" }}>Unit Price</th>
              <th style={{ padding: "8px 12px", textAlign: "right" }}>Total</th>
            </tr></thead>
            <tbody>
              {form.items.filter((i) => i.product).map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "8px 12px" }}>{i + 1}</td>
                  <td style={{ padding: "8px 12px" }}>{item.product}</td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}>{item.qty}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", color: "#D97700", fontWeight: 600 }}>Contact Us</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", color: "#D97700", fontWeight: 600 }}>Volume Based</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ background: "#fff3e6", padding: "12px 16px", borderRadius: 6, marginBottom: 20, fontSize: "0.8rem" }}>
            <strong style={{ color: "#D97700" }}>Note:</strong> All prices are volume-based and customized. Our team will contact you within 24 hours with a detailed quotation.
          </div>

          {form.notes && (
            <div style={{ marginBottom: 20, fontSize: "0.8rem" }}>
              <strong>Additional Notes:</strong>
              <p style={{ color: "#555", marginTop: 4 }}>{form.notes}</p>
            </div>
          )}

          <div style={{ borderTop: "2px solid #1a1a1a", paddingTop: 12, fontSize: "0.75rem", color: "#888", textAlign: "center" }}>
            <p>Khaziq &amp; Sons | Landhi, Karachi, Pakistan | +92 304 2130631 | khaziqandsons@gmail.com | khaziqandsons.com</p>
            <p>© {new Date().getFullYear()} Khaziq &amp; Sons. This is a computer-generated quotation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
