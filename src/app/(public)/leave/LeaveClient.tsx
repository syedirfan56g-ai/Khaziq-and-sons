"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const DEPARTMENTS = ["Production", "Sales", "Logistics", "Administration", "Accounts", "Other"];
const LEAVE_TYPES = ["Annual", "Sick", "Personal", "Emergency", "Other"];

export default function LeaveClient() {
  const [form, setForm] = useState({
    name: "", department: "", leaveType: "Annual", fromDate: "", toDate: "", reason: "", phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    try {
      await addDoc(collection(db, "leaves"), {
        ...form, status: "pending", adminNote: "", createdAt: Timestamp.now(),
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setSubmitError("Error: " + msg + ". Please try again.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
          <i className="fas fa-check-circle" style={{ fontSize: "4rem", color: "#16a34a", marginBottom: 16 }}></i>
          <h2 style={{ fontSize: "1.8rem" }}>Leave Request <span className="accent">Submitted</span></h2>
          <p style={{ color: "#666" }}>Your leave request has been submitted for approval. You will be notified once reviewed.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 600 }}>
        <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "0.5rem" }}>Staff Leave <span className="accent">Request</span></h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 32 }}>Submit your leave request for management approval.</p>
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
            <div className="form-group">
              <label>Department <span className="required">*</span></label>
              <select name="department" required value={form.department} onChange={update}>
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Leave Type <span className="required">*</span></label>
              <select name="leaveType" required value={form.leaveType} onChange={update}>
                {LEAVE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>From Date <span className="required">*</span></label>
              <input type="date" name="fromDate" required value={form.fromDate} onChange={update} />
            </div>
            <div className="form-group">
              <label>To Date <span className="required">*</span></label>
              <input type="date" name="toDate" required value={form.toDate} onChange={update} />
            </div>
            <div className="form-group full-width">
              <label>Reason <span className="required">*</span></label>
              <textarea name="reason" required value={form.reason} onChange={update} placeholder="Reason for leave..." rows={4}></textarea>
            </div>
          </div>
          {submitError && <div style={{ color: "#dc2626", background: "#fee2e2", padding: 12, borderRadius: 6, marginTop: 16, fontSize: "0.85rem", textAlign: "center" }}>{submitError}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 20, fontSize: "1rem", padding: "16px" }}>
            <i className="fas fa-paper-plane"></i> Submit Leave Request
          </button>
        </form>
      </div>
    </section>
  );
}
