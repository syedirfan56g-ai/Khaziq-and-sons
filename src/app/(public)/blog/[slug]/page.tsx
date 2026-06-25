"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<{ title: string; content: string; author: string; createdAt: { seconds: number } | null; image: string; excerpt: string; tags: string } | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const snap = await getDocs(collection(db, "blog"));
      const doc = snap.docs.find((d) => d.data().slug === slug);
      if (!doc) { setNotFound(true); return; }
      const data = doc.data();
      setPost({
        id: doc.id, title: data.title || "", slug: data.slug || "",
        content: data.content || "", excerpt: data.excerpt || "",
        author: data.author || "Khaziq & Sons", tags: data.tags || "",
        image: data.image || "", createdAt: data.createdAt || null,
      } as typeof post);
    })();
  }, [slug]);

  if (notFound) return <div className="page-header"><div className="container" style={{ padding: 80, textAlign: "center" }}><h2>Post Not Found</h2><Link href="/blog" style={{ color: "#D97700" }}>Back to Blog</Link></div></div>;
  if (!post) return <div className="page-header"><div className="container" style={{ padding: 80, textAlign: "center" }}><p>Loading...</p></div></div>;

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "40px 16px 80px", maxWidth: 800, margin: "0 auto" }}>
        <Link href="/blog" style={{ color: "#D97700", fontSize: "0.9rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          <i className="fas fa-arrow-left"></i> Back to Blog
        </Link>
        <article>
          {post.image && <img src={post.image} alt={post.title} className="blog-hero-img" />}
          <h1 style={{ fontSize: "1.8rem", margin: "24px 0 12px", lineHeight: 1.3 }}>{post.title}</h1>
          <div style={{ display: "flex", gap: 16, color: "#888", fontSize: "0.85rem", marginBottom: 24 }}>
            <span><i className="fas fa-user"></i> {post.author || "Khaziq & Sons"}</span>
            <span><i className="fas fa-calendar"></i> {post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
          </div>
          {post.tags && <div style={{ marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 6 }}>{post.tags.split(",").map((t: string) => (
            <span key={t} className="blog-tag">{t.trim()}</span>
          ))}</div>}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  );
}
