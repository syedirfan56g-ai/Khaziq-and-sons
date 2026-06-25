"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
  "Peshawar", "Quetta", "Gujranwala", "Sialkot", "Hyderabad", "Sukkur", "Larkana", "Other"];

export default function WelcomePopup() {
  const { user } = useAuth();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", city: "Karachi" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) return;
    const seen = localStorage.getItem("ks_welcome");
    if (!seen) setTimeout(() => setShow(true), 800);
  }, [user]);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      await setDoc(doc(db, "users", cred.user.uid), {
        name: form.name, email: form.email, city: form.city, createdAt: Timestamp.now(),
      });
      localStorage.setItem("ks_welcome", "1");
      setShow(false);
      router.push("/account/dashboard");
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e.code === "auth/email-already-in-use") setError("Email already registered. Please login.");
      else if (e.code === "auth/weak-password") setError("Password should be at least 6 characters.");
      else setError(e.message || "Something went wrong.");
    } finally { setLoading(false); }
  };

  const handleSkip = () => {
    localStorage.setItem("ks_welcome", "1");
    setShow(false);
  };

  const handleLogin = () => {
    localStorage.setItem("ks_welcome", "1");
    setShow(false);
    router.push("/account/login");
  };

  if (!show || user) return null;

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal">
        <button className="welcome-close" onClick={handleSkip}><i className="fas fa-times"></i></button>
        <div className="welcome-icon"><i className="fas fa-user-plus"></i></div>
        <h3>Join <span style={{ color: "#D97700" }}>Khaziq &amp; Sons</span></h3>
        <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: 16, textAlign: "center" }}>
          Create a free account to send messages and track replies.
        </p>
        {error && <div className="account-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="welcome-input" type="text" name="name" placeholder="Full name" value={form.name} onChange={update} required />
          <input className="welcome-input" type="email" name="email" placeholder="Email address" value={form.email} onChange={update} required />
          <input className="welcome-input" type="password" name="password" placeholder="Password (min 6 chars)" value={form.password} onChange={update} required minLength={6} />
          <select className="welcome-input" name="city" value={form.city} onChange={update}>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "11px", fontSize: "0.85rem" }} disabled={loading}>
            <i className="fas fa-user-plus"></i> {loading ? "Creating..." : "Create Free Account"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 12, fontSize: "0.8rem" }}>
          <span style={{ color: "#888" }}>Already have an account? </span>
          <button onClick={handleLogin} style={{ background: "none", border: "none", color: "#D97700", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem" }}>Login</button>
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button onClick={handleSkip} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "0.8rem" }}>Skip for now</button>
        </div>
      </div>
    </div>
  );
}
