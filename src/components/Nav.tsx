"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
  "Peshawar", "Quetta", "Gujranwala", "Sialkot", "Hyderabad", "Other"];

const dropdowns = [
  {
    label: "Products",
    icon: "fa-box",
    items: [
      { href: "/customizer", label: "Build Your Trolley", desc: "Custom size, gauge & color" },
      { href: "/catalog", label: "Full Catalog", desc: "Complete product list" },
      { href: "/quotation", label: "Get Quotation", desc: "Bulk pricing & PDF" },
      { href: "/freight", label: "Freight Calculator", desc: "Estimate shipping cost" },
      { href: "/certifications", label: "Certifications", desc: "Quality & compliance" },
    ],
  },
  {
    label: "Services",
    icon: "fa-concierge-bell",
    items: [
      { href: "/order", label: "Company Form", desc: "Bulk order request" },
      { href: "/partner", label: "Become a Retailer", desc: "Join our network" },
      { href: "/complaint", label: "File Complaint", desc: "Report an issue" },
      { href: "/leave", label: "Staff Leave", desc: "Leave application" },
      { href: "/contact", label: "Contact Us", desc: "Get in touch" },
    ],
  },
];

export default function Nav() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [city, setCity] = useState("Karachi");
  const [cityModal, setCityModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ks_city");
    if (saved) setCity(saved);
  }, []);

  useEffect(() => {
    if (!menuOpen) setOpenDropdown(null);
  }, [menuOpen]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const selectCity = (c: string) => {
    setCity(c);
    setCityModal(false);
    localStorage.setItem("ks_city", c);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>Pakistan&apos;s #1 Construction Trolley Manufacturer | <a href="tel:+923042130631">+92 304 2130631</a></span>
          <button className="city-selector-btn" onClick={() => setCityModal(true)}>
            <i className="fas fa-map-marker-alt" style={{ marginRight: 6 }}></i> {city}
          </button>
        </div>
      </div>

      <div className={`city-modal-overlay ${cityModal ? "active" : ""}`} onClick={() => setCityModal(false)}>
        <div className="city-modal" onClick={(e) => e.stopPropagation()}>
          <h3>Select Your City</h3>
          <div className="city-grid">
            {CITIES.map((c) => (
              <button key={c} className={`city-btn ${city === c ? "active" : ""}`} onClick={() => selectCity(c)}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      <nav>
        <div className="container">
          <Link href="/" className="logo"><img src="/logo.png" alt="Khaziq & Sons" style={{ height: 36, width: "auto" }} /></Link>
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            <li><Link href="/" className={pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>Home</Link></li>

            {/* Dropdowns */}
            {dropdowns.map((dd) => (
              <li key={dd.label} className={`nav-dd ${openDropdown === dd.label ? "open" : ""}`}
                onMouseEnter={() => setOpenDropdown(dd.label)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <button className="nav-dd-btn" onClick={() => setOpenDropdown(openDropdown === dd.label ? null : dd.label)}>
                  <i className={`fas ${dd.icon}`}></i> {dd.label} <i className="fas fa-chevron-down nav-dd-arrow"></i>
                </button>
                <div className="nav-dd-menu">
                  {dd.items.map((item) => (
                    <Link key={item.href} href={item.href}
                      className={`nav-dd-item ${isActive(item.href) ? "active" : ""}`}
                      onClick={() => { setMenuOpen(false); setOpenDropdown(null); }}>
                      <div className="nav-dd-item-label">{item.label}</div>
                      <div className="nav-dd-item-desc">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </li>
            ))}

            <li><Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""} onClick={() => setMenuOpen(false)}>Blog</Link></li>

            <li className="nav-account-item">
              {user ? (
                <Link href="/account/dashboard" className={`nav-account-link ${pathname.startsWith("/account") ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
                  <i className="fas fa-user-circle"></i> My Account
                </Link>
              ) : (
                <Link href="/account/login" className={`nav-account-link ${pathname.startsWith("/account") ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
                  <i className="fas fa-sign-in-alt"></i> Account
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
