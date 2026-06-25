"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function MessageWidget() {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ message: "" });
  const [sent, setSent] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const update = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTrigger = () => {
    if (!user) { setShowLoginPrompt(true); return; }
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, "messages"), {
        uid: user.uid, name: user.displayName || "User", email: user.email,
        message: form.message, status: "unread", createdAt: Timestamp.now(),
      });
      setSent(true);
      setForm({ message: "" });
    } catch {}
  };

  return (
    <>
      <button className="msg-trigger" onClick={handleTrigger}>
        <i className="fas fa-comment-dots"></i>
      </button>

      {showLoginPrompt && (
        <div className="welcome-overlay">
          <div className="welcome-modal" style={{ textAlign: "center" }}>
            <div className="welcome-icon"><i className="fas fa-lock"></i></div>
            <h3>Login Required</h3>
            <p style={{ color: "#666", fontSize: "0.85rem", margin: "8px 0 20px" }}>
              Please login or create an account to send us a message.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={() => { setShowLoginPrompt(false); router.push("/account/login"); }}>
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
              <button className="btn btn-outline" onClick={() => { setShowLoginPrompt(false); router.push("/account/signup"); }}>
                <i className="fas fa-user-plus"></i> Sign Up
              </button>
            </div>
            <button onClick={() => setShowLoginPrompt(false)} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "0.8rem", marginTop: 12, display: "block", width: "100%" }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className={`msg-overlay ${open ? "active" : ""}`} onClick={() => { setOpen(false); setSent(false); }}>
        <div className="msg-box" onClick={(e) => e.stopPropagation()}>
          {sent ? (
            <div style={{ textAlign: "center", padding: 20 }}>
              <i className="fas fa-check-circle" style={{ fontSize: "2.5rem", color: "#16a34a", marginBottom: 12 }}></i>
              <h4 style={{ marginBottom: 4 }}>Message Sent!</h4>
              <p style={{ fontSize: "0.85rem", color: "#666" }}>We&apos;ll reply soon. Check <strong>My Account</strong> for replies.</p>
              <button className="btn btn-primary" style={{ marginTop: 16, padding: "10px 24px" }} onClick={() => { setOpen(false); setSent(false); }}>OK</button>
            </div>
          ) : (
            <>
              <div className="msg-header">
                <h4>Chat with Us</h4>
                <button className="msg-close" onClick={() => setOpen(false)}><i className="fas fa-times"></i></button>
              </div>
              {user && <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: 12 }}>Logged in as <strong>{user.displayName || user.email}</strong></p>}
              <form onSubmit={handleSubmit}>
                <textarea className="welcome-input" name="message" placeholder="Type your message..." value={form.message} onChange={update} required rows={4} style={{ resize: "none" }}></textarea>
                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }}>
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
