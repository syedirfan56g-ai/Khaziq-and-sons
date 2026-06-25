import Link from "next/link";

const WHATSAPP_NUMBER = "923042130631";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3><img src="/logo.png" alt="Khaziq & Sons" style={{ height: 30, width: "auto", verticalAlign: "middle", marginRight: 8 }} /> Khaziq &amp; Sons</h3>
            <p>Karachi&apos;s trusted wholesale supplier of heavy-duty construction trolleys and hardware items. Premium iron trolleys, industrial wheelbarrows, and platform trucks. Factory-direct wholesale rates. Serving Pakistan since 2016.</p>
            <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
              <a href="https://www.facebook.com/profile.php?id=61555434190184" target="_blank" rel="noopener noreferrer" style={{ color: "#D97700", fontSize: "1.2rem" }}><i className="fab fa-facebook"></i></a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ color: "#D97700", fontSize: "1.2rem" }}><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <h4>Products</h4>
            <ul>
              <li><Link href="/customizer">Build Your Trolley</Link></li>
              <li><Link href="/catalog">Full Product Catalog</Link></li>
              <li><Link href="/quotation">Get Quotation</Link></li>
              <li><Link href="/freight">Freight Calculator</Link></li>
              <li><Link href="/certifications">Certifications</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/partner">Become a Retailer</Link></li>
              <li><Link href="/complaint">Submit Complaint</Link></li>
              <li><Link href="/leave">Staff Leave</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+923042130631">+92 304 2130631</a></li>
              <li><a href="mailto:khaziqandsons@gmail.com">khaziqandsons@gmail.com</a></li>
              <li>Landhi, Karachi, Pakistan</li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Account</h4>
            <ul>
              <li><Link href="/account/dashboard">My Account</Link></li>
              <li><Link href="/corporate">Corporate Portal</Link></li>
              <li><Link href="/retailer">Retailer Portal</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/cookie">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Khaziq &amp; Sons. All rights reserved. | <a href="https://khaziqandsons.com" style={{ color: "#D97700" }}>khaziqandsons.com</a>
        </div>
      </div>
    </footer>
  );
}
