"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
  "Peshawar", "Quetta", "Gujranwala", "Sialkot", "Hyderabad", "Other"];
const MONTHLY_VOLUME = ["10-25 pieces", "25-50 pieces", "50-100 pieces", "100+ pieces"];
const PARTNER_PRODUCTS = ["Platform Trolleys", "Wheelbarrows", "Hand Trucks", "Spare Parts", "All Products"];

type PartnerData = {
  fullName: string; businessName: string; phone: string; whatsapp: string;
  address: string; city: string; monthlyVolume: string; products: string[];
  agreeTerms: boolean; agreeTruth: boolean; agreeTermination: boolean; agreeUpdates: boolean;
};

export default function PartnerClient() {
  const [partner, setPartner] = useState<PartnerData>({
    fullName: "", businessName: "", phone: "", whatsapp: "", address: "", city: "Karachi",
    monthlyVolume: "", products: [], agreeTerms: false, agreeTruth: false,
    agreeTermination: false, agreeUpdates: false,
  });
  const [partnerFiles, setPartnerFiles] = useState<{ cnic: File | null; shop: File | null }>({ cnic: null, shop: null });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploading, setUploading] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPartner({ ...partner, [e.target.name]: e.target.value });
  };

  const toggleProduct = (p: string) => {
    setPartner((prev) => ({
      ...prev,
      products: prev.products.includes(p) ? prev.products.filter((x) => x !== p) : [...prev.products, p],
    }));
  };

  const handleFile = (type: "cnic" | "shop", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPartnerFiles((prev) => ({ ...prev, [type]: file }));
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setUploading(true);
    try {
      let cnicUrl = "", shopUrl = "";
      if (partnerFiles.cnic) cnicUrl = await toBase64(partnerFiles.cnic);
      if (partnerFiles.shop) shopUrl = await toBase64(partnerFiles.shop);
      await addDoc(collection(db, "partners"), {
        ...partner, products: partner.products, cnicImage: cnicUrl,
        shopImages: shopUrl, status: "pending", adminNote: "", createdAt: Timestamp.now(),
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setSubmitError("Error: " + msg + ". Please try again.");
      setUploading(false);
      return;
    }
    setUploading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section">
        <div className="container">
          <div className="form-success" style={{ display: "block", maxWidth: 500, margin: "40px auto" }}>
            <i className="fas fa-check-circle" style={{ fontSize: "3rem", color: "#16a34a", marginBottom: 12 }}></i>
            <h3>Application Received!</h3>
            <p>Our team will review your application and contact you within 24-48 hours via WhatsApp.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section">
        <div className="container">
          <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>Become a <span className="accent">Retailer</span></h1>
          <p className="partner-intro" style={{ maxWidth: 700, margin: "0 auto 24px" }}>
            Want to sell Khaziq &amp; Sons products in your city? Apply to become an authorized retailer or wholesale distributor. 
            We welcome registered businesses and individuals across all major Pakistani cities. 
            Sell Pakistan&apos;s best <strong>heavy duty wheelbarrows</strong>, <strong>construction trolleys</strong>, and industrial equipment.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
            {[
              { icon: "fa-percentage", title: "Wholesale Rates", desc: "Factory-direct distributor pricing" },
              { icon: "fa-boxes", title: "Bulk Supply", desc: "Minimum 10 pieces per order" },
              { icon: "fa-map-marked-alt", title: "Territory Rights", desc: "Protected city territories available" },
              { icon: "fa-chart-line", title: "Growing Market", desc: "Pakistan's construction boom" },
            ].map((f) => (
              <div key={f.title} style={{ textAlign: "center", padding: "16px 20px", background: "#f5f5f5", flex: "1 1 180px" }}>
                <i className={`fas ${f.icon}`} style={{ color: "#D97700", fontSize: "1.5rem" }}></i>
                <p style={{ fontWeight: 700, marginTop: 8, fontSize: "0.9rem" }}>{f.title}</p>
                <small style={{ color: "#888" }}>{f.desc}</small>
              </div>
            ))}
          </div>

          <div className="partner-form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input type="text" name="fullName" required value={partner.fullName} onChange={update} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label>Shop/Business Name <span className="required">*</span></label>
                  <input type="text" name="businessName" required value={partner.businessName} onChange={update} placeholder="Business name" />
                </div>
                <div className="form-group">
                  <label>Phone Number <span className="required">*</span></label>
                  <input type="tel" name="phone" required value={partner.phone} onChange={update} placeholder="+92 3XX XXXXXXX" />
                  <small style={{ color: "#888", fontSize: "0.75rem" }}>We will verify via WhatsApp call</small>
                </div>
                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input type="tel" name="whatsapp" value={partner.whatsapp} onChange={update} placeholder="+92 3XX XXXXXXX" />
                </div>
                <div className="form-group full-width">
                  <label>Complete Address <span className="required">*</span></label>
                  <input type="text" name="address" required value={partner.address} onChange={update} placeholder="Shop address" />
                </div>
                <div className="form-group">
                  <label>City <span className="required">*</span></label>
                  <select name="city" required value={partner.city} onChange={update}>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Expected Monthly Volume <span className="required">*</span></label>
                  <select name="monthlyVolume" required value={partner.monthlyVolume} onChange={update}>
                    <option value="">Select volume</option>
                    {MONTHLY_VOLUME.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Products Interested In <span className="required">*</span></label>
                  <div className="checkbox-group">
                    {PARTNER_PRODUCTS.map((p) => (
                      <label key={p}>
                        <input type="checkbox" checked={partner.products.includes(p)} onChange={() => toggleProduct(p)} /> {p}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>CNIC Front Side <span className="required">*</span></label>
                  <div className="file-upload" onClick={() => document.getElementById("cnic-upload")?.click()}>
                    <i className="fas fa-upload" style={{ fontSize: "1.5rem", color: "#D97700", marginBottom: 8 }}></i>
                    <p>Click to upload CNIC front side (image)</p>
                    <input type="file" id="cnic-upload" accept="image/*" required onChange={(e) => handleFile("cnic", e)} />
                    {partnerFiles.cnic && <div className="file-name"><i className="fas fa-check"></i> {partnerFiles.cnic.name}</div>}
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Shop Photos (1-2) <span className="required">*</span></label>
                  <div className="file-upload" onClick={() => document.getElementById("shop-upload")?.click()}>
                    <i className="fas fa-camera" style={{ fontSize: "1.5rem", color: "#D97700", marginBottom: 8 }}></i>
                    <p>Click to upload shop photos</p>
                    <input type="file" id="shop-upload" accept="image/*" required onChange={(e) => handleFile("shop", e)} />
                    {partnerFiles.shop && <div className="file-name"><i className="fas fa-check"></i> {partnerFiles.shop.name}</div>}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <label style={{ fontFamily: "'Roboto Condensed', sans-serif", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", marginBottom: 8, display: "block" }}>
                  Retailer Agreement <span className="required">*</span>
                </label>
                <div className="agreement-box">
                  <p><strong>KHAZIQ &amp; SONS — RETAILER AGREEMENT</strong></p>
                  <p>1. MINIMUM ORDER: Retailer agrees to purchase minimum 10 (ten) pieces per order.</p>
                  <p>2. PRICING CONFIDENTIALITY: Wholesale rates are strictly confidential.</p>
                  <p>3. PAYMENT: 50% advance on first order. Subsequent orders: 30% advance, 70% on delivery.</p>
                  <p>4. BRAND PROTECTION: Branding may only be used with written permission.</p>
                  <p>5. PRICE MAINTENANCE: Retailer shall not sell below agreed retail prices.</p>
                  <p>6. TERMINATION: Retailership may be terminated upon breach or fraud.</p>
                  <p>7. LEGAL: All disputes resolved through arbitration in Karachi under Pakistani law.</p>
                  <p>8. VERIFICATION: False information results in termination and legal action.</p>
                </div>
                <div className="checkbox-group agree-all">
                  <label><input type="checkbox" checked={partner.agreeTerms} onChange={() => setPartner({ ...partner, agreeTerms: !partner.agreeTerms })} /> I have read and agree to all retailer terms</label>
                  <label><input type="checkbox" checked={partner.agreeTruth} onChange={() => setPartner({ ...partner, agreeTruth: !partner.agreeTruth })} /> I confirm all submitted information is true</label>
                  <label><input type="checkbox" checked={partner.agreeTermination} onChange={() => setPartner({ ...partner, agreeTermination: !partner.agreeTermination })} /> I understand violation may result in termination and legal action</label>
                  <label><input type="checkbox" checked={partner.agreeUpdates} onChange={() => setPartner({ ...partner, agreeUpdates: !partner.agreeUpdates })} /> I agree to receive WhatsApp updates from Khaziq &amp; Sons</label>
                </div>
              </div>

              {submitError && <div style={{ color: "#dc2626", background: "#fee2e2", padding: 12, borderRadius: 6, marginTop: 16, fontSize: "0.85rem", textAlign: "center" }}>{submitError}</div>}
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20, fontSize: "1rem", padding: "16px" }}
                disabled={!partner.agreeTerms || !partner.agreeTruth || !partner.agreeTermination || !partner.agreeUpdates || uploading}>
                {uploading ? <><i className="fas fa-spinner fa-spin"></i> Uploading...</> : <><i className="fas fa-handshake"></i> Apply as Retailer</>}
              </button>
            </form>
            <div style={{ textAlign: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid #e5e7eb" }}>
              <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: 8 }}>Already have a Retailer ID?</p>
              <a href="/retailer" className="btn btn-outline" style={{ justifyContent: "center", width: "100%" }}>
                <i className="fas fa-sign-in-alt"></i> Retailer Login
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
