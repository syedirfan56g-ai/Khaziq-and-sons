import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://khaziqandsons.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/catalog`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/customizer`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/quotation`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/freight`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/certifications`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/order`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/partner`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/corporate`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${baseUrl}/complaint`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/leave`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/account/login`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/account/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/cookie`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const { getDocs, collection, orderBy } = await import("firebase/firestore");
    const { db } = await import("@/lib/firebase");
    const snap = await getDocs(collection(db, "blog"));
    blogPosts = snap.docs
      .filter((d) => d.data().slug)
      .map((d) => ({
        url: `${baseUrl}/blog/${d.data().slug}`,
        lastModified: d.data().createdAt?.toDate() || now,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      }));
  } catch {}

  return [...staticPages, ...blogPosts];
}
