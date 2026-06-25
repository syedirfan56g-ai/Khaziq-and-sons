"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e.code === "auth/user-not-found" || e.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (e.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        setError(e.message || "Login failed");
      }
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="admin-login-box">
        <div className="login-logo"><img src="/logo.png" alt="Khaziq & Sons" style={{ width: 40, height: 40, borderRadius: 8 }} /></div>
        <h1>Khaziq &amp; Sons</h1>
        <p className="login-subtitle">Admin Panel — Authorized Access Only</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="admin-label">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@khaziqandsons.com" required />
          </div>
          <div className="form-group">
            <label className="admin-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        </form>
        <p style={{ marginTop: 16, fontSize: "0.8rem", color: "#aaa", textAlign: "center" }}>
          For authorized personnel only. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
