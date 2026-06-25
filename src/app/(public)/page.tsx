"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [cookieConsent, setCookieConsent] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ks_cookie_consent");
    if (consent) setCookieConsent(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const acceptCookies = () => { localStorage.setItem("ks_cookie_consent", "accepted"); setCookieConsent(false); };
  const declineCookies = () => { localStorage.setItem("ks_cookie_consent", "declined"); setCookieConsent(false); };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-badge">Since 2016 — Karachi, Pakistan</div>
          <h1>The Load Doesn&apos;t Break Us.<br /><span className="accent">We Break the Limits.</span></h1>
          <p className="subtitle">Pakistan&apos;s #1 manufacturer of heavy-duty construction trolleys, industrial wheelbarrows, and platform trucks. Military-grade steel. Wholesale pricing. Serving 25+ cities.</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/catalog" className="btn btn-primary"><i className="fas fa-box"></i> View Catalog</Link>
            <Link href="/order" className="btn btn-outline" style={{ borderColor: "#fff", color: "#fff" }}><i className="fas fa-file-invoice"></i> Company Form</Link>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {[
              { num: "8+", label: "Years Experience" },
              { num: "5000+", label: "Units Delivered" },
              { num: "350+", label: "Corporate Clients" },
              { num: "25+", label: "Cities Covered" },
              { num: "99%", label: "Client Retention" },
            ].map((s) => (
              <div className="stat-item" key={s.label}>
                <h3>{s.num}</h3>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="products" className="section section-gray">
        <div className="container">
          <h2>Our <span className="accent">Product Range</span></h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 32 }}>Premium industrial equipment at wholesale prices. No fixed retail prices — customized volume-based quotes.</p>
          <div className="catalog-list">

            <div className="catalog-section">
              <h3 className="catalog-heading"><i className="fas fa-truck"></i> 1. Wheelbarrows &amp; Trolleys</h3>
              <div className="catalog-items">
                <div className="catalog-item"><span className="catalog-name">Premium Wheelbarrow</span><span className="catalog-tag">Premium</span></div>
                <div className="catalog-item"><span className="catalog-name">Heavy Duty Wheelbarrow</span><span className="catalog-tag">Heavy Duty</span></div>
                <div className="catalog-item"><span className="catalog-name">Standard Wheelbarrow</span><span className="catalog-tag">Standard</span></div>
                <div className="catalog-item"><span className="catalog-name">Platform Trolley — Heavy Duty</span><span className="catalog-tag">Heavy Duty</span></div>
                <div className="catalog-item"><span className="catalog-name">Platform Trolley — Standard</span><span className="catalog-tag">Standard</span></div>
                <div className="catalog-item"><span className="catalog-name">Small Platform Trolley — Heavy Duty</span><span className="catalog-tag">Heavy Duty</span></div>
                <div className="catalog-item"><span className="catalog-name">Small Platform Trolley — Standard</span><span className="catalog-tag">Standard</span></div>
              </div>
            </div>

            <div className="catalog-section">
              <h3 className="catalog-heading"><i className="fas fa-fill-drip"></i> 2. Tubs / Buckets</h3>
              <div className="catalog-items">
                <div className="catalog-item"><span className="catalog-name">Premium 16 Gauge Tub (1.6 mm)</span><span className="catalog-tag">Premium</span></div>
                <div className="catalog-item"><span className="catalog-name">Heavy Duty 18 Gauge Tub (1.2 mm)</span><span className="catalog-tag">Heavy Duty</span></div>
                <div className="catalog-item"><span className="catalog-name">Standard 20 Gauge Tub (0.9 mm)</span><span className="catalog-tag">Standard</span></div>
                <div className="catalog-item"><span className="catalog-name">Affordable 23 Gauge Tub (0.6 mm)</span><span className="catalog-tag">Affordable</span></div>
              </div>
            </div>

            <div className="catalog-section">
              <h3 className="catalog-heading"><i className="fas fa-circle"></i> 3. Tyres</h3>
              <div className="catalog-items">
                <div className="catalog-item"><span className="catalog-name">Premium Service Tyre — 8 Ply Heavy Duty</span><span className="catalog-tag">Premium</span></div>
                <div className="catalog-item"><span className="catalog-name">Service Tyre — 6 Ply Standard</span><span className="catalog-tag">Standard</span></div>
                <div className="catalog-item"><span className="catalog-name">Service Tyre — 4 Ply Affordable</span><span className="catalog-tag">Affordable</span></div>
                <div className="catalog-item"><span className="catalog-name">Super Swallow Tyre — 8 Ply Standard</span><span className="catalog-tag">Standard</span></div>
              </div>
            </div>

            <div className="catalog-section">
              <h3 className="catalog-heading"><i className="fas fa-cog"></i> 4. Rims</h3>
              <div className="catalog-items">
                <div className="catalog-item"><span className="catalog-name">Premium Heavy Duty Rim / Wheel</span><span className="catalog-tag">Premium</span></div>
                <div className="catalog-item"><span className="catalog-name">Heavy Duty Rim / Wheel</span><span className="catalog-tag">Heavy Duty</span></div>
                <div className="catalog-item"><span className="catalog-name">Standard Rim / Wheel</span><span className="catalog-tag">Standard</span></div>
                <div className="catalog-item"><span className="catalog-name">Affordable Rim / Wheel</span><span className="catalog-tag">Affordable</span></div>
              </div>
            </div>

            <div className="catalog-section">
              <h3 className="catalog-heading"><i className="fas fa-chair"></i> 5. Stools</h3>
              <div className="catalog-items">
                <div className="catalog-item"><span className="catalog-name">Stools — 2 Feet to 10 Feet Available</span><span className="catalog-tag">Various Sizes</span></div>
              </div>
            </div>

            <div className="catalog-section">
              <h3 className="catalog-heading"><i className="fas fa-tools"></i> 6. Spare Parts</h3>
              <div className="catalog-items">
                <div className="catalog-item"><span className="catalog-name">Bearings — Size 6203 &amp; 6204</span><span className="catalog-tag">Spare Part</span></div>
                <div className="catalog-item"><span className="catalog-name">Axles</span><span className="catalog-tag">Spare Part</span></div>
                <div className="catalog-item"><span className="catalog-name">Nuts &amp; Bolts</span><span className="catalog-tag">Spare Part</span></div>
                <div className="catalog-item"><span className="catalog-name">Other Spare Parts Available</span><span className="catalog-tag">Spare Part</span></div>
              </div>
            </div>

          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/order" className="btn btn-primary" style={{ padding: "14px 40px" }}>
              <i className="fas fa-file-invoice"></i> Request Volume Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Why <span className="accent">Choose Us</span></h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 8 }}>What makes Khaziq & Sons Pakistan&apos;s preferred industrial equipment partner.</p>
          <div className="features-grid">
            {[
              { icon: "fa-shield-alt", title: "Military-Grade Steel", desc: "High-carbon steel, powder-coated finish. Handles 500kg+ daily loads without failure." },
              { icon: "fa-tags", title: "Wholesale Pricing", desc: "Direct manufacturer pricing. Bulk discounts up to 35%. No middlemen, no fixed retail markup." },
              { icon: "fa-pencil-ruler", title: "Custom Fabrication", desc: "In-house engineering team. Custom sizes, load capacities, and designs tailored to your needs." },
              { icon: "fa-shipping-fast", title: "48-Hour Dispatch", desc: "Standard products ship within 48 hours from our Karachi facility. All major cities covered." },
              { icon: "fa-certificate", title: "ISO 9001:2015 Certified", desc: "International quality standards. Every unit undergoes rigorous load testing before dispatch." },
              { icon: "fa-headset", title: "Lifetime Support", desc: "12-month warranty, free spare parts support, and a dedicated account manager for every client." },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <div className="feature-icon"><i className={`fas ${f.icon}`}></i></div>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section section-gray">
        <div className="container">
          <h2>About <span className="accent">Khaziq &amp; Sons</span></h2>
          <div className="about-content">
            <div className="about-text">
              <p><strong>Khaziq &amp; Sons</strong> is Karachi&apos;s trusted wholesale supplier of heavy-duty construction trolleys and hardware items, based in Landhi, Karachi. We stock a comprehensive range of robust iron trolleys and complete hardware supplies — all available at competitive wholesale rates.</p>
              <p>Our product lineup includes <strong>heavy-duty construction trolleys</strong> crafted with superior welding and durable tyres, along with a full spectrum of construction hardware essentials. We supply contractors and retailers across Pakistan at factory-direct wholesale pricing.</p>
              <p>Every trolley we manufacture is built for longevity and performance — our reputation rests on the durability of our products and the trust of our clients. Whether you need platform trolleys, wheelbarrows, or custom-fabricated equipment, we deliver quality that lasts.</p>
              <p><strong>Mission:</strong> Building Pakistan&apos;s Infrastructure, One Trolley at a Time.</p>
              <p><strong>Email:</strong> <a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a></p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: 16 }}><i className="fas fa-envelope"></i> Contact Us</Link>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" alt="Khaziq & Sons heavy-duty construction trolley and wheelbarrow manufacturing facility in Karachi, Pakistan" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="container" style={{ marginTop: 60 }}>
          <h2>Our <span className="accent">Leadership</span></h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 8 }}>Meet the team behind Pakistan&apos;s #1 industrial equipment manufacturer.</p>
          <div className="leadership-grid">
            <div className="leader-card">
              <div className="leader-avatar"><i className="fas fa-user-tie"></i></div>
              <h3>Muhammad Khaziq Shah</h3>
              <div className="leader-title">Founder &amp; Owner</div>
              <ul className="leader-bio" style={{ listStyle: "none" }}>
                <li><i className="fas fa-check" style={{ color: "#D97700", marginRight: 8 }}></i>Founded Khaziq &amp; Sons in 2016</li>
                <li><i className="fas fa-check" style={{ color: "#D97700", marginRight: 8 }}></i>15+ years experience in Pakistan&apos;s industrial sector</li>
                <li><i className="fas fa-check" style={{ color: "#D97700", marginRight: 8 }}></i>Started from a modest workshop in Landhi Industrial Area, Karachi</li>
                <li><i className="fas fa-check" style={{ color: "#D97700", marginRight: 8 }}></i>Vision: International durability standards at local prices</li>
                <li><i className="fas fa-envelope" style={{ color: "#D97700", marginRight: 8 }}></i><a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a></li>
              </ul>
            </div>
            <div className="leader-card">
              <div className="leader-avatar"><i className="fas fa-user-tie"></i></div>
              <h3>Syed Afnan</h3>
              <div className="leader-title">Director &amp; CEO</div>
              <ul className="leader-bio" style={{ listStyle: "none" }}>
                <li><i className="fas fa-check" style={{ color: "#D97700", marginRight: 8 }}></i>Drives strategic vision and operational excellence</li>
                <li><i className="fas fa-check" style={{ color: "#D97700", marginRight: 8 }}></i>Expanded company from local supplier to national brand</li>
                <li><i className="fas fa-check" style={{ color: "#D97700", marginRight: 8 }}></i>Serves Pakistan&apos;s largest construction &amp; logistics companies</li>
                <li><i className="fas fa-check" style={{ color: "#D97700", marginRight: 8 }}></i>350+ corporate clients, 25+ cities, 5000+ units delivered</li>
                <li><i className="fas fa-envelope" style={{ color: "#D97700", marginRight: 8 }}></i><a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="mission-content">
            <h2>The <span className="accent">Khaziq Promise</span></h2>
            <p>Building Pakistan&apos;s Infrastructure, One Trolley at a Time. Since 2016, we&apos;ve been committed to manufacturing industrial equipment that meets international standards at locally competitive prices.</p>
            <div className="mission-stats">
              {[
                { num: "2016", label: "Founded" },
                { num: "100%", label: "Industrial Grade" },
                { num: "12 mo", label: "Warranty" },
                { num: "48 hr", label: "Dispatch" },
              ].map((s) => (
                <div className="mission-stat" key={s.label}>
                  <h3>{s.num}</h3>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <h2>Trusted <span className="accent">By Industry Leaders</span></h2>
          <p style={{ textAlign: "center", color: "#666" }}>Proudly serving Pakistan&apos;s largest industrial and construction companies.</p>
          <div className="client-logos">
            {["Descon", "Engro", "Lucky Cement", "FFC", "Pakistan Steel", "Port Qasim"].map((c) => (
              <span className="client-logo-text" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>What Our <span className="accent">Clients Say</span></h2>
          <p style={{ textAlign: "center", color: "#666", marginBottom: 8 }}>Trusted by Pakistan&apos;s leading industries since 2016. Read reviews about our heavy duty wheelbarrows and construction trolleys.</p>
          <div className="testimonials-grid">
            {[
              { quote: "The heavy-duty platform trolleys are exceptional. We've used them for 3 years in our Lahore warehouse without a single breakdown. The puncture-proof tyres saved thousands in maintenance costs.", name: "Tariq Mahmood", role: "Warehouse Manager, Lahore Logistics" },
              { quote: "Best industrial equipment provider in Pakistan. We ordered 200 wheelbarrows for our Faisalabad construction project and the quality exceeded our expectations. Their custom fabrication team is incredibly skilled.", name: "Zubair Ahmed", role: "CEO, Ahmed Industries" },
              { quote: "Khaziq & Sons handles our bulk requirements with professionalism. Their custom trolley designs perfectly fit our unique shipping needs at Karachi Port. 48-hour dispatch is no joke — they actually deliver on time.", name: "Sarfraz Khan", role: "Operations Head, Karachi Port Trust" },
            ].map((t) => (
              <div className="testimonial-card" key={t.name}>
                <p>{t.quote}</p>
                <div className="testimonial-author">{t.name}<span>{t.role}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={`cookie-consent ${cookieConsent ? "active" : ""}`}>
        <div className="cookie-content">
           <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking &apos;Accept All&apos;, you consent to our use of cookies. <Link href="/cookie">Read our Cookie Policy</Link> | <Link href="/privacy">Privacy Policy</Link></p>
          <div className="cookie-buttons">
            <button className="cookie-btn decline" onClick={declineCookies}>Decline</button>
            <button className="cookie-btn accept" onClick={acceptCookies}>Accept All</button>
          </div>
        </div>
      </div>

      <button className={`back-to-top ${showBackToTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}
