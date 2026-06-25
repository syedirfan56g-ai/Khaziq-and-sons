import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Khaziq & Sons",
  description: "Khaziq & Sons privacy policy. Learn how we collect, use, and protect your personal information when you use our website and services.",
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Privacy <span className="accent">Policy</span></h1>
        <p style={{ color: "#666", marginBottom: 24 }}>Last updated: June 2026</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>1. Information We Collect</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>We collect information you voluntarily provide when you submit our company form, partner application, or contact us — including your name, company name, phone number, email address, and business details. We also collect basic usage data through cookies to improve our website experience.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>2. How We Use Your Information</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>We use your information solely to respond to your inquiries, process your orders, communicate with you about our products and services, and improve our offerings. We do not sell, rent, or share your personal information with third parties for their marketing purposes.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>3. Data Protection</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>4. Data Retention</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, or as required by law.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>5. Your Rights</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>You have the right to request access to, correction of, or deletion of your personal data held by us. To exercise these rights, please contact us at khaziqandsons@gmail.com.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>6. Contact Us</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a> or call <a href="tel:+923042130631" style={{ color: "#D97700" }}>+92 304 2130631</a>.</p>
      </div>
    </section>
  );
}
