"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRetailer } from "@/context/RetailerContext";
import Link from "next/link";

export default function RetailerPage() {
  const router = useRouter();
  const { retailer, login, loading } = useRetailer();
  const [retailerId, setRetailerId] = useState("");
  const [error, setError] = useState("");

  if (retailer) {
    router.push("/retailer/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const err = await login(retailerId);
    if (err) setError(err);
    else router.push("/retailer/dashboard");
  };

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "60px 16px", maxWidth: 500, margin: "0 auto" }}>
        <div className="account-box">
          <div className="account-header">
            <img src="/logo.png" alt="Khaziq & Sons" style={{ height: 40 }} />
            <h2>Retailer Portal</h2>
            <p>Enter your unique Retailer ID to access your account.</p>
          </div>
          {error && <div className="account-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input className="welcome-input" type="text" placeholder="Enter Retailer ID (e.g. KAS-KHI-4829)" value={retailerId} onChange={(e) => setRetailerId(e.target.value.toUpperCase())} required style={{ textTransform: "uppercase", letterSpacing: 1 }} />
            <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px" }} disabled={loading}>
              <i className="fas fa-sign-in-alt"></i> {loading ? "Verifying..." : "Login to Portal"}
            </button>
          </form>
          <p className="account-switch" style={{ marginTop: 16 }}>Not a retailer yet? <Link href="/partner" style={{ color: "#D97700", fontWeight: 600 }}>Apply Now</Link></p>
        </div>
      </div>
    </div>
  );
}
