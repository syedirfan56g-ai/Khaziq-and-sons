"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function ComplaintClient() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploading, setUploading] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      let imageUrl = "";
      if (file) imageUrl = await toBase64(file);
      await addDoc(collection(db, "complaints"), {
        ...form, imageUrl, status: "new", adminNote: "", createdAt: Timestamp.now(),
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
        <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
          <i className="fas fa-check-circle" style={{ fontSize: "4rem", color: "#16a34a", marginBottom: 16 }}></i>
          <h2 style={{ fontSize: "1.8rem" }}>Complaint <span className="accent">Submitted</span></h2>
          <p style={{ color: "#666" }}>Thank you. Our team will review your complaint and contact you within 24 hours.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 600 }}>
        <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.5rem" }}>Submit a <span className="accent">Complaint</span></h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 32 }}>We value your feedback and will respond within 24 hours.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name <span className="required">*</span></label>
              <input type="text" name="name" required value={form.name} onChange={update} placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Phone <span className="required">*</span></label>
              <input type="tel" name="phone" required value={form.phone} onChange={update} placeholder="+92 3XX XXXXXXX" />
            </div>
            <div className="form-group full-width">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={update} placeholder="email@example.com" />
            </div>
            <div className="form-group full-width">
              <label>Your Message / Complaint <span className="required">*</span></label>
              <textarea name="message" required value={form.message} onChange={update} placeholder="Describe your issue or feedback in detail..." rows={5}></textarea>
            </div>
            <div className="form-group full-width">
              <label>Attach Image (optional)</label>
              <div className="file-upload" onClick={() => document.getElementById("comp-img")?.click()}>
                <i className="fas fa-image" style={{ fontSize: "1.5rem", color: "#D97700", marginBottom: 8 }}></i>
                <p>Click to attach an image (optional)</p>
                <input type="file" id="comp-img" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                {file && <div className="file-name"><i className="fas fa-check"></i> {file.name}</div>}
              </div>
            </div>
          </div>
          {submitError && <div style={{ color: "#dc2626", background: "#fee2e2", padding: 12, borderRadius: 6, marginTop: 16, fontSize: "0.85rem", textAlign: "center" }}>{submitError}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20, fontSize: "1rem", padding: "16px" }} disabled={uploading}>
            {uploading ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : <><i className="fas fa-paper-plane"></i> Submit Complaint</>}
          </button>
        </form>
      </div>
    </section>
  );
}
