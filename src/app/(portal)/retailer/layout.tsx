"use client";

import { useRetailer } from "@/context/RetailerContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import RetailerSidebar from "@/components/RetailerSidebar";

export default function RetailerLayout({ children }: { children: React.ReactNode }) {
  const { retailer, loading, logout } = useRetailer();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/retailer" || pathname === "/retailer/";

  useEffect(() => {
    if (!loading && !retailer && !isLoginPage) router.push("/retailer");
  }, [retailer, loading, isLoginPage, router]);

  const handleLogout = () => {
    logout();
    router.push("/retailer");
  };

  if (loading) return <div className="retailer-loading"><div className="retailer-spinner"></div><p>Loading...</p></div>;
  if (!retailer && !isLoginPage) return null;
  if (isLoginPage) return <>{children}</>;

  return (
    <div className="retailer-layout">
      <RetailerSidebar onLogout={handleLogout} />
      <div className="retailer-main">
        <div className="retailer-topbar">
          <span style={{ color: "#888", fontSize: "0.85rem" }}>Welcome, <strong style={{ color: "#D97700" }}>{retailer?.fullName}</strong></span>
          <div className="retailer-topbar-right">
            <span style={{ fontFamily: "monospace", fontSize: "0.8rem", background: "#1a1a1a", color: "#D97700", padding: "4px 10px", borderRadius: 6 }}>{retailer?.retailerId}</span>
          </div>
        </div>
        <div className="retailer-content">{children}</div>
      </div>
    </div>
  );
}
