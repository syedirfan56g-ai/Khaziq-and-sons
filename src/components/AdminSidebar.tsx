"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "fa-chart-pie" },
  { href: "/admin/products", label: "Products", icon: "fa-box" },
  { href: "/admin/partners", label: "Retailers", icon: "fa-store" },
  { href: "/admin/orders", label: "Company Form", icon: "fa-file-invoice" },
  { href: "/admin/complaints", label: "Complaints", icon: "fa-comment-dots" },
  { href: "/admin/blog", label: "Blog", icon: "fa-newspaper" },
  { href: "/admin/quotations", label: "Quotations", icon: "fa-file-invoice-dollar" },
  { href: "/admin/certifications", label: "Certifications", icon: "fa-file-certificate" },
  { href: "/admin/leaves", label: "Leave Requests", icon: "fa-calendar-alt" },
  { href: "/admin/messages", label: "Messages", icon: "fa-comments" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <Link href="/admin/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
          <div className="logo-icon"><img src="/logo.png" alt="Khaziq & Sons" style={{ width: 32, height: 32, borderRadius: 6 }} /></div>
          <h2>Khaziq &amp; Sons</h2>
          <small>Admin Panel</small>
        </Link>
      </div>
      <div className="admin-nav">
        <div className="admin-nav-section">Main Menu</div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <i className={`fas ${item.icon}`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="admin-nav-footer">
        <Link href="/" className="admin-nav-item">
          <i className="fas fa-external-link-alt"></i>
          <span>View Site</span>
        </Link>
        <div className="admin-nav-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
