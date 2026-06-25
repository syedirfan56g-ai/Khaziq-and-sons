"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export default function CatalogPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    if (!contentRef.current) return;
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = contentRef.current;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const opt: any = {
        margin:        [15, 15, 15, 15],
        filename:      "Khaziq_and_Sons_Product_Catalog.pdf",
        image:         { type: "jpeg", quality: 1 },
        html2canvas:   { scale: 3, useCORS: true, letterRendering: true, logging: false },
        jsPDF:         { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak:     { mode: ["avoid-all", "css", "legacy"] },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error(err);
      alert("Could not generate PDF. Try using your browser's Print (Ctrl+P) and save as PDF instead.");
    }
    setDownloading(false);
  };

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "40px 16px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", margin: 0 }}>Product <span className="accent">Catalog</span></h1>
            <p style={{ color: "#888", marginTop: 4 }}>Khaziq &amp; Sons — Complete Product Range</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" onClick={downloadPDF} disabled={downloading}>
              <i className="fas fa-file-pdf"></i> {downloading ? "Generating..." : "Download PDF"}
            </button>
            <Link href="/" className="btn btn-outline"><i className="fas fa-home"></i> Home</Link>
          </div>
        </div>

        <div ref={contentRef} className="catalog-print">
          <div className="catalog-print-header">
            <div className="catalog-print-header-inner">
              <img src="/logo.png" alt="Khaziq & Sons" style={{ height: 60 }} />
              <div>
                <h1>Khaziq &amp; Sons</h1>
                <p className="catalog-print-subtitle">Premium Construction Equipment Manufacturer</p>
              </div>
            </div>
            <div className="catalog-print-contact">
              <span><i className="fas fa-map-marker-alt"></i> Landhi, Karachi, Pakistan</span>
              <span><i className="fas fa-phone"></i> +92 304 2130631</span>
              <span><i className="fas fa-envelope"></i> khaziqandsons@gmail.com</span>
              <span><i className="fas fa-globe"></i> khaziqandsons.com</span>
            </div>
            <div className="catalog-print-divider"></div>
            <h2 className="catalog-print-title">Product Catalog 2024</h2>
            <p className="catalog-print-desc">Complete range of premium industrial equipment — wholesale pricing available on all items.</p>
          </div>

          <div className="catalog-list" style={{ margin: 0, maxWidth: "100%" }}>
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

          <div className="catalog-print-footer">
            <div className="catalog-print-divider"></div>
            <div className="catalog-print-footer-inner">
              <div>
                <p className="catalog-print-fw">Khaziq &amp; Sons</p>
                <p>Landhi, Karachi, Pakistan</p>
              </div>
              <div>
                <p>+92 304 2130631</p>
                <p>khaziqandsons@gmail.com</p>
              </div>
              <div>
                <p>khaziqandsons.com</p>
                <p style={{ fontSize: "0.75rem", color: "#888" }}>© {new Date().getFullYear()} Khaziq &amp; Sons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
