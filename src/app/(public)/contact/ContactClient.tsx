"use client";

import Link from "next/link";

const WHATSAPP_NUMBER = "923042130631";

export default function ContactClient() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>Contact <span className="accent">Us</span></h1>
          <p style={{ textAlign: "center", color: "#666", maxWidth: 700, margin: "0 auto 40px" }}>
            Get in touch with Pakistan&apos;s #1 manufacturer of heavy duty construction trolleys, industrial wheelbarrows, and platform trucks. 
            Based in Landhi, Karachi — serving Lahore, Islamabad, Faisalabad, Multan, and all Pakistan.
          </p>

          <div className="contact-grid">
            <div>
              <div style={{ background: "#f5f5f5", padding: 32, marginBottom: 24 }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: 20 }}>Contact Information</h3>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, fontFamily: "'Roboto Condensed', sans-serif", textTransform: "uppercase", fontSize: "0.85rem", color: "#D97700" }}>Address</p>
                  <p style={{ color: "#555" }}>Landhi Industrial Area, Karachi, Pakistan</p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, fontFamily: "'Roboto Condensed', sans-serif", textTransform: "uppercase", fontSize: "0.85rem", color: "#D97700" }}>Phone / WhatsApp</p>
                  <p style={{ color: "#555" }}><a href="tel:+923042130631" style={{ color: "#D97700" }}>+92 304 2130631</a></p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, fontFamily: "'Roboto Condensed', sans-serif", textTransform: "uppercase", fontSize: "0.85rem", color: "#D97700" }}>Email (Primary)</p>
                  <p style={{ color: "#555" }}><a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a></p>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, fontFamily: "'Roboto Condensed', sans-serif", textTransform: "uppercase", fontSize: "0.85rem", color: "#D97700" }}>Business Hours</p>
                  <p style={{ color: "#555" }}>Monday — Saturday: 9:00 AM — 7:00 PM<br />Sunday: Closed</p>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontFamily: "'Roboto Condensed', sans-serif", textTransform: "uppercase", fontSize: "0.85rem", color: "#D97700" }}>Founder & Owner</p>
                  <p style={{ color: "#555" }}>Muhammad Khaziq Shah — <a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a></p>
                </div>
                <div style={{ marginTop: 16 }}>
                  <p style={{ fontWeight: 700, fontFamily: "'Roboto Condensed', sans-serif", textTransform: "uppercase", fontSize: "0.85rem", color: "#D97700" }}>Director & CEO</p>
                  <p style={{ color: "#555" }}>Syed Afnan — <a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a></p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Asalam-o-Alaikum Khaziq & Sons, I would like to inquire about your products.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <i className="fab fa-whatsapp"></i> WhatsApp Us
                </a>
                <Link href="/order" className="btn btn-outline">
                  <i className="fas fa-file-invoice"></i> Company Form
                </Link>
                <Link href="/partner" className="btn btn-outline">
                  <i className="fas fa-handshake"></i> Become a Retailer
                </Link>
              </div>
            </div>

            <div>
              <div style={{ marginBottom: 24 }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57912.1!2d67.1494!3d24.8607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f1b1b1b1b1b%3A0x1b1b1b1b1b1b1b1b!2sLandhi%2C%20Karachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1" width="100%" height="350" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Khaziq & Sons location in Landhi, Karachi, Pakistan" style={{ border: "none" }}></iframe>
              </div>

              <div style={{ background: "#1a1a1a", color: "#fff", padding: 32 }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: 12, color: "#fff" }}>Quick Inquiry</h3>
                <p style={{ color: "#ccc", fontSize: "0.9rem", marginBottom: 16 }}>
                  Looking for <strong>construction trolley price in Pakistan</strong> or need a <strong>heavy duty wheelbarrow</strong>? 
                  Send us a message on WhatsApp and our team will respond within minutes.
                </p>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Asalam-o-Alaikum Khaziq & Sons, I need a quote for your products.")}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <i className="fab fa-whatsapp"></i> Send WhatsApp Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Visit Our <span className="accent">Facility</span></h2>
          <p style={{ color: "#666", maxWidth: 600, margin: "0 auto 32px" }}>
            Located in Landhi Industrial Area, Karachi. We welcome corporate clients to visit our manufacturing facility 
            and inspect our heavy duty trolleys, wheelbarrows, and industrial equipment firsthand.
          </p>
          <p style={{ fontWeight: 700 }}>📞 <a href="tel:+923042130631" style={{ color: "#D97700" }}>+92 304 2130631</a> — Call to schedule a visit</p>
        </div>
      </section>
    </>
  );
}
