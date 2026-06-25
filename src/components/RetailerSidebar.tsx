"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRetailer } from "@/context/RetailerContext";

const navItems = [
  { href: "/retailer/dashboard", label: "Dashboard", icon: "fa-chart-pie" },
  { href: "/retailer/products", label: "Products Catalog", icon: "fa-box" },
  { href: "/retailer/orders", label: "My Orders", icon: "fa-shopping-cart" },
  { href: "/retailer/analytics", label: "Analytics", icon: "fa-chart-line" },
];

export default function RetailerSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();
  const { retailer } = useRetailer();

  return (
    <div className="retailer-sidebar">
      <div className="retailer-sidebar-header">
        <Link href="/retailer/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="Khaziq & Sons" style={{ width: 32, height: 32, borderRadius: 6 }} />
            <div><h2 style={{ fontSize: "1rem", margin: 0 }}>Retailer Portal</h2></div>
          </div>
        </Link>
      </div>
      <div className="retailer-profile-mini">
        <div className="retailer-avatar-sm">{retailer?.fullName?.charAt(0)?.toUpperCase() || "R"}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{retailer?.fullName || "Retailer"}</div>
          <div style={{ fontSize: "0.7rem", color: "#aaa" }}>{retailer?.retailerId}</div>
        </div>
      </div>
      <div className="retailer-nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={`retailer-nav-item ${pathname === item.href ? "active" : ""}`}>
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="retailer-nav-footer">
        <Link href="/" className="retailer-nav-item"><i className="fas fa-external-link-alt"></i><span>Main Website</span></Link>
        <div className="retailer-nav-item" onClick={onLogout} style={{ cursor: "pointer" }}>
          <i className="fas fa-sign-out-alt"></i><span>Logout</span>
        </div>
      </div>
    </div>
  );
}
