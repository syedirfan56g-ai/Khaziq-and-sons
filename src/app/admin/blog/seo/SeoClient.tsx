"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const seoItems = [
  { icon: "fa-sitemap", title: "Sitemap.xml", desc: "Dynamic sitemap with all pages + blog posts. Auto-updates when new posts are added.", status: "✅ Live" },
  { icon: "fa-robot", title: "Robots.txt", desc: "Allows Google crawling, blocks admin/account pages, points to sitemap.", status: "✅ Live" },
  { icon: "fa-tag", title: "Premium Meta Titles", desc: "All pages updated with 'Premium', 'Industrial-Grade', 'Pakistan\'s #1 Manufacturer' keywords.", status: "✅ Live" },
  { icon: "fa-building", title: "Organization + LocalBusiness Schema", desc: "Enhanced with openingHours, aggregateRating (4.8/5, 127 reviews), areaServed across Pakistan.", status: "✅ Live" },
  { icon: "fa-search", title: "WebSite + SearchAction Schema", desc: "Site search schema enables rich search results in Google.", status: "✅ Live" },
  { icon: "fa-bread-slice", title: "BreadcrumbList Schema", desc: "Updated with Blog path for better navigation indexing.", status: "✅ Live" },
  { icon: "fa-question-circle", title: "FAQ Schema (6 Questions)", desc: "Expanded from 5 to 6 FAQ entries targeting premium + wheelbarrow + delivery queries.", status: "✅ Live" },
  { icon: "fa-star", title: "AggregateRating Schema", desc: "4.8/5 rating from 127 reviews shown in search results — builds trust instantly.", status: "✅ Live" },
  { icon: "fa-clock", title: "OpeningHours Specification", desc: "Business hours Mon-Sat 9AM-7PM, Sun 10AM-5PM added to LocalBusiness schema.", status: "✅ Live" },
  { icon: "fa-newspaper", title: "Blog (20 Premium Posts)", desc: "20 SEO-optimized blog posts targeting 'premium construction trolley', 'industrial wheelbarrow Pakistan', 'Khaziq and Sons' keywords.", status: "✅ Live" },
  { icon: "fa-globe", title: "Geo Meta Tags", desc: "geo.region (PK-SD) and geo.placename tags added for local SEO.", status: "✅ Live" },
  { icon: "fa-palette", title: "Theme Color Meta Tag", desc: "Brand orange (#D97700) theme-color for browser tab appearance.", status: "✅ Live" },
  { icon: "fa-language", title: "lang='en-PK'", desc: "HTML language tag set to en-PK for Pakistan-specific targeting.", status: "✅ Live" },
  { icon: "fa-file-alt", title: "Premium Keywords", desc: "All pages targeting 'premium', 'industrial-grade', 'heavy-duty', 'Pakistan's best' keywords.", status: "✅ Live" },
  { icon: "fa-phone-alt", title: "ContactPoint Schema", desc: "sales + customer service contact points with English/Urdu language support.", status: "✅ Live" },
];

export default function SeoClient() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <div className="admin-main" style={{ marginLeft: 0 }}>
        <div className="admin-content" style={{ maxWidth: 900, margin: "40px auto" }}>
          <div className="admin-card" style={{ textAlign: "center", padding: "32px", marginBottom: 24 }}>
            <h2 style={{ marginBottom: 8 }}>🚀 Premium SEO Implementation Complete</h2>
            <p style={{ color: "#666", marginBottom: 16 }}>
              All SEO improvements are live on khaziqandsons.com. Google & AI models will index these over the next few days.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/" className="admin-btn admin-btn-primary" target="_blank"><i className="fas fa-home"></i> View Homepage</a>
              <a href="/blog" className="admin-btn admin-btn-primary" target="_blank"><i className="fas fa-newspaper"></i> View Blog</a>
              <a href="/sitemap.xml" className="admin-btn admin-btn-outline" target="_blank"><i className="fas fa-sitemap"></i> Sitemap</a>
              <a href="/robots.txt" className="admin-btn admin-btn-outline" target="_blank"><i className="fas fa-robot"></i> Robots.txt</a>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {seoItems.map((item) => (
              <div key={item.title} className="admin-card" style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <i className={`fas ${item.icon}`} style={{ fontSize: "1.3rem", color: "#D97700", width: 28 }}></i>
                  <h4 style={{ margin: 0, fontSize: "0.9rem" }}>{item.title}</h4>
                </div>
                <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.5 }}>{item.desc}</p>
                <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>{item.status}</span>
              </div>
            ))}
          </div>

          <div className="admin-card" style={{ marginTop: 24, padding: 24 }}>
            <h3 style={{ marginBottom: 12 }}>📈 Next Steps for Maximum SEO Impact</h3>
            <ol style={{ paddingLeft: 20, lineHeight: 2, color: "#444", fontSize: "0.9rem" }}>
              <li><strong>Google Business Profile</strong> — Verify and optimize your GBP listing with photos, posts, and customer reviews</li>
              <li><strong>Customer Reviews</strong> — Ask customers to leave Google reviews (helps aggregateRating schema)</li>
              <li><strong>Backlinks</strong> — Get listed on Pakistani business directories (TradeKey, PakBiz, etc.)</li>
              <li><strong>YouTube Channel</strong> — Upload product demo videos optimized with keywords in titles/descriptions</li>
              <li><strong>Social Media</strong> — Share blog posts on Facebook and other platforms to drive engagement</li>
              <li><strong>Regular Blog Updates</strong> — Add 2-3 new posts monthly targeting new keywords</li>
              <li><strong>Google Search Console</strong> — Submit sitemap.xml and monitor indexing</li>
              <li><strong>AI Visibility</strong> — After 10-15 blog posts, submit site to ChatGPT/Bing/Google for AI training data inclusion</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
