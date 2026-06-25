"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

type Cert = { id: string; title: string; description: string; fileUrl: string; icon: string };

export default function CertificationsPage() {
  const [certs, setCerts] = useState<Cert[]>([]);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "certifications"));
      const list: Cert[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Cert));
      setCerts(list);
    })();
  }, []);

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "60px 16px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 8, textAlign: "center" }}>Certifications &amp; <span className="accent">Compliance</span></h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
          Quality certificates, load testing reports, and compliance documents for mega projects and government contracts.
        </p>

        {certs.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#888" }}>
            <i className="fas fa-file-certificate" style={{ fontSize: "3rem", marginBottom: 16, display: "block", color: "#ddd" }}></i>
            <h3>Documents Coming Soon</h3>
            <p>Our certification documents are being compiled. Check back soon.</p>
          </div>
        ) : (
          <div className="certs-grid">
            {certs.map((c) => (
              <a key={c.id} href={c.fileUrl} target="_blank" rel="noopener noreferrer" className="cert-card">
                <div className="cert-icon"><i className={`fas ${c.icon || "fa-file-pdf"}`}></i></div>
                <div className="cert-body">
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <span className="cert-download"><i className="fas fa-download"></i> Download PDF</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
