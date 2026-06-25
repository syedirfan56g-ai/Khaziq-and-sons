"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const WHATSAPP_NUMBER = "923042130631";
const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
  "Peshawar", "Quetta", "Gujranwala", "Sialkot", "Hyderabad", "Other"];
const PRODUCT_OPTIONS = ["Platform Trolleys", "Wheelbarrows", "Hand Trucks", "Spare Parts", "Custom Fabrication", "Multiple Products"];
const QUANTITY_OPTIONS = ["10-25 pieces", "25-50 pieces", "50-100 pieces", "100-500 pieces", "500+ pieces"];
const TIMELINE_OPTIONS = ["Urgent: 1 week", "Standard: 2-3 weeks", "Flexible: 1 month+"];

type FormData = {
  company: string; name: string; designation: string; phone: string; email: string;
  city: string; product: string; quantity: string; timeline: string; requirements: string; source: string;
};

function OrderForm() {
  const searchParams = useSearchParams();
  const presetProduct = searchParams.get("product") || "";

  const [form, setForm] = useState<FormData>({
    company: "", name: "", designation: "", phone: "", email: "", city: "Karachi",
    product: presetProduct, quantity: "", timeline: "", requirements: "", source: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const formData = { ...form, status: "new", adminNote: "", createdAt: Timestamp.now() };
    try {
      await addDoc(collection(db, "orders"), formData);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      console.error("Firebase order save failed:", msg);
      setSubmitError("Database save failed: " + msg + ". Your inquiry was still sent via WhatsApp.");
    }
    const msg = `New Corporate Inquiry - Khaziq & Sons\n\nCompany: ${form.company}\nContact: ${form.name} (${form.designation})\nPhone: ${form.phone}\nEmail: ${form.email}\nCity: ${form.city}\nProduct: ${form.product}\nQuantity: ${form.quantity}\nTimeline: ${form.timeline}\nRequirements: ${form.requirements}\nSource: ${form.source}\n\nSubmitted via: khaziqandsons.com`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success" style={{ display: "block", maxWidth: 500, margin: "40px auto" }}>
        <i className="fas fa-check-circle" style={{ fontSize: "3rem", color: "#16a34a", marginBottom: 12 }}></i>
        <h3>Inquiry Submitted!</h3>
        <p>You are being redirected to WhatsApp. Our team will contact you within 24 hours with a customized quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Company Name <span className="required">*</span></label>
          <input type="text" name="company" required value={form.company} onChange={update} placeholder="Your company name" />
        </div>
        <div className="form-group">
          <label>Contact Person <span className="required">*</span></label>
          <input type="text" name="name" required value={form.name} onChange={update} placeholder="Full name" />
        </div>
        <div className="form-group">
          <label>Designation/Role</label>
          <input type="text" name="designation" value={form.designation} onChange={update} placeholder="Owner / Manager / Purchaser" />
        </div>
        <div className="form-group">
          <label>Phone / WhatsApp <span className="required">*</span></label>
          <input type="tel" name="phone" required value={form.phone} onChange={update} placeholder="+92 3XX XXXXXXX" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={update} placeholder="email@company.com" />
        </div>
        <div className="form-group">
          <label>City <span className="required">*</span></label>
          <select name="city" required value={form.city} onChange={update}>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Product Interest <span className="required">*</span></label>
          <select name="product" required value={form.product} onChange={update}>
            <option value="">Select product</option>
            {PRODUCT_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Estimated Quantity <span className="required">*</span></label>
          <select name="quantity" required value={form.quantity} onChange={update}>
            <option value="">Select quantity</option>
            {QUANTITY_OPTIONS.map((q) => <option key={q} value={q}>{q}</option>)}
          </select>
        </div>
        <div className="form-group full-width">
          <label>Delivery Timeline</label>
          <select name="timeline" value={form.timeline} onChange={update}>
            <option value="">Select timeline</option>
            {TIMELINE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="form-group full-width">
          <label>Additional Requirements</label>
          <textarea name="requirements" value={form.requirements} onChange={update} placeholder="Tell us about your specific requirements..."></textarea>
        </div>
        <div className="form-group full-width">
          <label>How did you hear about us?</label>
          <select name="source" value={form.source} onChange={update}>
            <option value="">Select</option>
            <option value="Google">Google</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      {submitError && <div style={{ color: "#dc2626", background: "#fee2e2", padding: 12, borderRadius: 6, marginTop: 16, fontSize: "0.85rem", textAlign: "center" }}>{submitError}</div>}
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20, fontSize: "1rem", padding: "16px" }}>
        <i className="fas fa-paper-plane"></i> Submit Inquiry — Get Your Quote
      </button>
    </form>
  );
}

export default function OrderClient() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>Company <span className="accent">Form</span></h1>
          <p style={{ textAlign: "center", color: "#666", maxWidth: 700, margin: "0 auto 8px" }}>
            Submit a corporate inquiry and our team will respond within <strong>24 hours</strong> with a customized volume-based quote. 
            We serve clients across Karachi, Lahore, Islamabad, Faisalabad, Multan, and all major Pakistani cities.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", margin: "32px 0" }}>
            <div style={{ textAlign: "center", padding: "16px 24px", background: "#f5f5f5" }}>
              <i className="fas fa-tag" style={{ color: "#D97700", fontSize: "1.5rem" }}></i>
              <p style={{ fontWeight: 700, marginTop: 4 }}>Volume Pricing</p>
              <small style={{ color: "#888" }}>Bulk discounts up to 35%</small>
            </div>
            <div style={{ textAlign: "center", padding: "16px 24px", background: "#f5f5f5" }}>
              <i className="fas fa-shipping-fast" style={{ color: "#D97700", fontSize: "1.5rem" }}></i>
              <p style={{ fontWeight: 700, marginTop: 4 }}>48-Hour Dispatch</p>
              <small style={{ color: "#888" }}>Nationwide delivery</small>
            </div>
            <div style={{ textAlign: "center", padding: "16px 24px", background: "#f5f5f5" }}>
              <i className="fas fa-shield-alt" style={{ color: "#D97700", fontSize: "1.5rem" }}></i>
              <p style={{ fontWeight: 700, marginTop: 4 }}>12-Month Warranty</p>
              <small style={{ color: "#888" }}>Industrial grade quality</small>
            </div>
          </div>

          <div className="order-form-wrapper">
            <Suspense fallback={<div style={{ textAlign: "center", padding: 40 }}>Loading form...</div>}>
              <OrderForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Why Buy From <span className="accent">Khaziq &amp; Sons</span>?</h2>
          <div className="features-grid" style={{ marginTop: 32 }}>
            {[
              { icon: "fa-industry", title: "Direct Manufacturer", desc: "We manufacture everything in-house. No middlemen, no markup — just factory-direct wholesale pricing." },
              { icon: "fa-trophy", title: "#1 in Pakistan", desc: "Ranked as Pakistan's top construction trolley and wheelbarrow manufacturer. Trusted by 350+ corporate clients." },
              { icon: "fa-truck", title: "Nationwide Delivery", desc: "We deliver to Karachi, Lahore, Islamabad, Faisalabad, Multan, Peshawar, Quetta, and all cities across Pakistan." },
              { icon: "fa-cogs", title: "Custom Orders Welcome", desc: "Need a specific size, load capacity, or design? Our engineering team can fabricate exactly what you need." },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon"><i className={`fas ${f.icon}`}></i></div>
                <div><h3>{f.title}</h3><p>{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
