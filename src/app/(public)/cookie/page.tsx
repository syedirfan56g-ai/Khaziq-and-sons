import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Khaziq & Sons",
  description: "Khaziq & Sons cookie policy. Learn about how we use cookies on our website to improve your browsing experience.",
};

export default function CookiePage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Cookie <span className="accent">Policy</span></h1>
        <p style={{ color: "#666", marginBottom: 24 }}>Last updated: June 2026</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>1. What Are Cookies</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>Cookies are small text files stored on your device when you visit a website. They help us understand how you use our site and improve your browsing experience.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>2. How We Use Cookies</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>We use cookies to remember your selected city for pricing and availability, analyze website traffic and usage patterns, and enhance site performance. We do not use cookies for targeted advertising or tracking across third-party websites.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>3. Types of Cookies We Use</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}><strong>Essential Cookies:</strong> Required for the website to function properly, such as remembering your city selection.<br /><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website so we can improve performance and user experience.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>4. Managing Cookies</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>You can control and manage cookies through your browser settings. You may choose to block all cookies, but this may affect certain functionality of our website. You can also decline non-essential cookies using our cookie consent banner.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>5. Contact</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>If you have questions about our cookie policy, contact us at <a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a>.</p>
      </div>
    </section>
  );
}
