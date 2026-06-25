"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function LoginClient() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.push("/account/dashboard");
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      if (e.code === "auth/user-not-found" || e.code === "auth/wrong-password" || e.code === "auth/invalid-credential")
        setError("Invalid email or password.");
      else setError(e.message || "Something went wrong.");
    } finally { setLoading(false); }
  };

  return (
    <div className="account-page">
      <div className="account-box">
        <div className="account-header">
          <img src="/logo.png" alt="Khaziq & Sons" style={{ height: 40 }} />
          <h2>Welcome Back</h2>
          <p>Login to your account.</p>
        </div>
        {error && <div className="account-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="welcome-input" type="email" name="email" placeholder="Email address" value={form.email} onChange={update} required />
          <input className="welcome-input" type="password" name="password" placeholder="Password" value={form.password} onChange={update} required />
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }} disabled={loading}>
            <i className="fas fa-sign-in-alt"></i> {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="account-switch">Don&apos;t have an account? <Link href="/account/signup">Sign Up</Link></p>
        <p className="account-switch" style={{ marginTop: 8 }}><Link href="/">Back to Home</Link></p>
      </div>
    </div>
  );
}
