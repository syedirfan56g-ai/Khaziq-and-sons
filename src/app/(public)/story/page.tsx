"use client";

import Link from "next/link";

const milestones = [
  { year: "2016", title: "The Beginning", desc: "Muhammad Khaziq Shah founded Khaziq & Sons in Landhi, Karachi with a single welding machine and a vision to build Pakistan's strongest trolleys." },
  { year: "2018", title: "First Workshop", desc: "Moved from a small roadside setup to a proper fabrication workshop. Hired first 5 skilled welders. Started supplying to local hardware stores." },
  { year: "2020", title: "Gauge Revolution", desc: "Introduced Pakistan's first 14-gauge premium wheelbarrow. Set a new industry standard for durability. Contractors started preferring Khaziq over Chinese imports." },
  { year: "2022", title: "Nationwide Reach", desc: "Expanded distribution to Lahore, Islamabad, Peshawar, and Quetta. Crossed 200+ retail partners. Became the go-to brand for mega construction projects." },
  { year: "2024", title: "Digital Transformation", desc: "Launched our online presence. Built direct relationships with DHA, Bahria Town, and corporate contractors. 350+ retailers nationwide." },
  { year: "2026", title: "The Future", desc: "Pakistan's most trusted construction and agriculture equipment brand. Product Customizer, nationwide delivery, and factory-direct wholesale pricing. This is just the beginning." },
];

const stats = [
  { num: "10+", label: "Years of Excellence" },
  { num: "350+", label: "Retail Partners" },
  { num: "50,000+", label: "Trolleys Delivered" },
  { num: "12+", label: "Cities Served" },
];

export default function StoryPage() {
  return (
    <div className="page-header">
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)", color: "#fff", padding: "80px 16px", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.5rem", marginBottom: 12 }}>Our <span className="accent">Story</span></h1>
          <p style={{ fontSize: "1.1rem", color: "#ccc", maxWidth: 700, margin: "0 auto", lineHeight: 1.7 }}>
            From a single welding machine in Landhi to Pakistan&apos;s most trusted name in premium construction and agriculture equipment. This is the Khaziq &amp; Sons story.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="section" style={{ padding: "40px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center", padding: 24 }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 700, color: "#D97700", fontFamily: "'Roboto Condensed', sans-serif" }}>{s.num}</div>
                <div style={{ fontSize: "0.85rem", color: "#888", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="section section-gray" style={{ padding: "60px 0" }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ marginBottom: 16 }}>Our <span className="accent">Mission</span></h2>
            <p style={{ fontSize: "1.05rem", color: "#555", lineHeight: 1.8 }}>
              To manufacture the highest quality wheelbarrows, trolleys, and material handling equipment in Pakistan — 
              at prices that make premium quality accessible to every contractor, farmer, and business owner. 
              We believe in <strong>steel you can trust</strong>, <strong>welds that hold</strong>, and <strong>service that delivers</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="section" style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 style={{ marginBottom: 40 }}>Our <span className="accent">Journey</span></h2>
          <div className="story-timeline">
            {milestones.map((m, i) => (
              <div key={m.year} className={`story-milestone ${i % 2 === 0 ? "left" : "right"}`}>
                <div className="story-dot"></div>
                <div className="story-card">
                  <span className="story-year">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section section-dark" style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 style={{ color: "#fff", marginBottom: 40 }}>What <span className="accent">Drives Us</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { icon: "fa-hard-hat", title: "Quality First", desc: "Every trolley is tested at 125% of rated capacity. We use only premium-grade steel and precision MIG welding." },
              { icon: "fa-handshake", title: "Integrity", desc: "Honest pricing, transparent dealings, and commitments we keep. Your trust is our most valuable asset." },
              { icon: "fa-lightbulb", title: "Innovation", desc: "From gauge options to product customizer — we continuously improve to serve you better." },
              { icon: "fa-users", title: "Partnership", desc: "350+ retailers across Pakistan are our family. Your success is our success." },
            ].map((v) => (
              <div key={v.title} style={{ textAlign: "center", padding: 24 }}>
                <i className={`fas ${v.icon}`} style={{ fontSize: "2rem", color: "#D97700", marginBottom: 12 }}></i>
                <h3 style={{ color: "#fff", fontSize: "1.1rem", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: "#aaa", fontSize: "0.85rem", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section" style={{ padding: "60px 0", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ marginBottom: 12 }}>Be Part of Our <span className="accent">Story</span></h2>
          <p style={{ color: "#888", marginBottom: 24, maxWidth: 500, margin: "0 auto 24px" }}>
            Whether you are a contractor, farmer, retailer, or builder — let&apos;s build something great together.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/catalog" className="btn btn-primary"><i className="fas fa-box"></i> Browse Products</Link>
            <Link href="/partner" className="btn btn-outline"><i className="fas fa-handshake"></i> Become a Retailer</Link>
            <Link href="/contact" className="btn btn-outline"><i className="fas fa-phone"></i> Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
