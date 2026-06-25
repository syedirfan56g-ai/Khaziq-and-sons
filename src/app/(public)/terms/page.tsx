import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Khaziq & Sons",
  description: "Khaziq & Sons terms and conditions. Please read these terms carefully before using our website or placing an order.",
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>Terms of <span className="accent">Service</span></h1>
        <p style={{ color: "#666", marginBottom: 24 }}>Last updated: June 2026</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>1. General</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>By accessing and using the Khaziq & Sons website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>2. Products & Pricing</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>All product prices are volume-based and quoted upon inquiry. Prices are subject to change without notice. We reserve the right to modify or discontinue products at any time. Images are for illustration purposes; actual products may vary slightly.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>3. Orders & Payments</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>Orders are confirmed upon receipt of advance payment. Standard payment terms: 50% advance on first order, 30% advance on subsequent orders with 70% due on delivery. All payments are in Pakistani Rupees (PKR).</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>4. Shipping & Delivery</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>We deliver nationwide across Pakistan. Standard dispatch time is 48 hours for in-stock products. Delivery timelines may vary based on location and order volume. Shipping costs are calculated at the time of quotation.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>5. Warranty</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>All our products carry a 12-month standard warranty covering manufacturing defects. Warranty does not cover misuse, unauthorized modifications, or normal wear and tear. Extended warranty options are available for premium products.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>6. Limitation of Liability</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>Khaziq & Sons shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability shall not exceed the purchase price of the products in question.</p>

        <h2 style={{ fontSize: "1.2rem", textAlign: "left", marginBottom: "0.5rem" }}>7. Contact</h2>
        <p style={{ color: "#555", marginBottom: 20, lineHeight: 1.7 }}>For any questions regarding these terms, contact us at <a href="mailto:khaziqandsons@gmail.com" style={{ color: "#D97700" }}>khaziqandsons@gmail.com</a>.</p>
      </div>
    </section>
  );
}
