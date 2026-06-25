"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import Link from "next/link";

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
  "Peshawar", "Quetta", "Gujranwala", "Sialkot", "Hyderabad", "Sukkur", "Larkana", "Other"];

export default function SignupClient() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", city: "Karachi" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      router.push("/account/dashboard");
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e.code === "auth/email-already-in-use") setError("Email already registered. Please login.");
      else if (e.code === "auth/weak-password") setError("Password should be at least 6 characters.");
      else setError(e.message || "Something went wrong.");
    } finally { setLoading(false); }
  };

  return (
    <div className="account-page">
      <div className="account-box">
        <div className="account-header">
          <img src="/logo.png" alt="Khaziq & Sons" style={{ height: 40 }} />
          <h2>Create Account</h2>
          <p>Join Khaziq &amp; Sons to send messages and track replies.</p>
        </div>
        {error && <div className="account-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="welcome-input" type="text" name="name" placeholder="Full name" value={form.name} onChange={update} required />
          <input className="welcome-input" type="email" name="email" placeholder="Email address" value={form.email} onChange={update} required />
          <input className="welcome-input" type="password" name="password" placeholder="Password (min 6 chars)" value={form.password} onChange={update} required minLength={6} />
          <select className="welcome-input" name="city" value={form.city} onChange={update}>{CITIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }} disabled={loading}>
            <i className="fas fa-user-plus"></i> {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="account-switch">Already have an account? <Link href="/account/login">Login</Link></p>
        <p className="account-switch" style={{ marginTop: 8 }}><Link href="/">Back to Home</Link></p>
      </div>
    </div>
  );
}
