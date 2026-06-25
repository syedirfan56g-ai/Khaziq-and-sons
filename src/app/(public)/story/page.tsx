"use client";

import Link from "next/link";

const milestones = [
  { year: "2001", title: "A Journey Begins", desc: "Muhammad Khaziq Shah left his hometown in Khyber Pakhtunkhwa (KPK) with nothing but determination. He arrived in Karachi — the city of opportunities — searching for work to support his family. Those early years were unforgiving: long hours, meager wages, and no guarantee of tomorrow." },
  { year: "2002–2012", title: "The Years of Learning", desc: "For over a decade, Khaziq worked alongside various workshops and factories across Karachi's industrial zones. He learned the art of fabrication — welding, cutting, shaping steel — from the ground up. No formal training, just raw experience. He watched how businesses ran, how deals were made, and how quality separated the best from the rest. Those 12 years were his real education." },
  { year: "2013", title: "The Leap of Faith (65,000 Rupees)", desc: "A trusted friend gave him the courage he needed. 'You know this work better than anyone. Why work for others when you can build your own?' That conversation changed everything. With just PKR 65,000 in savings — borrowed and scraped together — Khaziq rented a small shop and bought his first welding machine. There was no fancy equipment, no team, no backup. Just one man, one machine, and a fire to succeed." },
  { year: "2013–2015", title: "Two Years of Survival", desc: "It was not a fairy tale start. For two full years, the business ran at a loss. Rent was due, orders were few, and every rupee had to be stretched. There were nights when Khaziq wondered if he had made a mistake. But he kept showing up. Kept welding. Kept believing. And then came the toughest blow — the rented shop was taken over by someone else. Years of effort, suddenly without a roof." },
  { year: "2016", title: "The Real Beginning", desc: "Out of the ashes of that loss came something stronger. In 2016, Khaziq found a new space and started fresh — this time with a clearer vision. No more small thinking. He invested in better materials, focused on quality over cutting corners, and began building a reputation. Word spread. Contractors noticed. The orders started coming — slowly at first, then faster. This was the year Khaziq & Sons truly found its footing." },
  { year: "2016–2023", title: "The Growth Years", desc: "Seven years of relentless progress. From a single workbench to a full fabrication workshop. From one welder to a skilled team of craftsmen. From supplying local hardware stores to serving contractors on mega projects across Pakistan. The name 'Khaziq & Sons' became synonymous with durability. Premium gauge steel. Precision welds. Products that lasted years, not months. No marketing needed — the products spoke for themselves." },
  { year: "2024", title: "A New Chapter — Syed Afnan Joins as CEO & Director", desc: "Every great business needs fresh energy to reach the next level. In 2024, Syed Afnan — son of Muhammad Khaziq Shah — stepped in as CEO & Director. With a vision for digital transformation, he brought the brand online, built systems, and launched the website that you are reading this on right now. The mission: take Khaziq & Sons from a respected local manufacturer to Pakistan's undisputed #1 premium equipment brand." },
  { year: "2025–2026", title: "Today — Pakistan's Trusted Brand", desc: "Look at what we have built together. Hundreds of retailers across 12+ cities. Thousands of contractors, farmers, and builders who trust our equipment. A full digital presence with a Product Customizer, automated quotations, freight calculator, certifications vault, and corporate portal. 50,000+ trolleys and wheelbarrows delivered. This is not the end — this is just the beginning of the next chapter." },
];

const stats = [
  { num: "65,000", label: "Starting Capital (PKR)" },
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
            From the mountains of KPK to the industrial heart of Karachi. From a single welding machine bought with PKR 65,000 
            to Pakistan&apos;s most trusted equipment brand. This is not just a business story — this is a story of blood, sweat, and steel.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="section" style={{ padding: "40px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ textAlign: "center", padding: 20 }}>
                <div style={{ fontSize: "2rem", fontWeight: 700, color: "#D97700", fontFamily: "'Roboto Condensed', sans-serif" }}>{s.num}</div>
                <div style={{ fontSize: "0.8rem", color: "#888", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Spirit */}
      <div className="section section-gray" style={{ padding: "60px 0" }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ marginBottom: 16 }}>The <span className="accent">Spirit</span></h2>
            <p style={{ fontSize: "1.05rem", color: "#555", lineHeight: 1.8 }}>
              Khaziq &amp; Sons is not a corporation built by investors. It is a family story — a father who crossed provinces 
              with empty hands and a heart full of hope, a son who took that legacy digital, and a team that treats every weld 
              like it will be tested for generations. We do not cut corners because we cannot afford to. 
              Every trolley carries the name of a man who started with PKR 65,000 and refused to quit.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="section" style={{ padding: "60px 0" }}>
        <div className="container">
          <h2 style={{ marginBottom: 40 }}>The <span className="accent">Journey</span></h2>
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
              { icon: "fa-hard-hat", title: "Quality First", desc: "Every trolley is tested at 125% of rated capacity. We use only premium-grade steel and precision MIG welding. No shortcuts. No compromises." },
              { icon: "fa-handshake", title: "Integrity", desc: "Honest pricing, transparent dealings, and commitments we keep. A name built over a decade of trust cannot be broken in a day." },
              { icon: "fa-lightbulb", title: "Innovation", desc: "From offering custom gauge options to building Pakistan's first Product Customizer — we continuously evolve to serve you better." },
              { icon: "fa-users", title: "Family First", desc: "350+ retailers across Pakistan are not just partners — they are family. Their success is our success. Always." },
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
            Every trolley we build carries a piece of this journey. Whether you are a contractor, farmer, retailer, or builder — 
            let&apos;s write the next chapter together.
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
