"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Link from "next/link";

type Post = {
  id: string; slug: string; title: string; excerpt: string;
  author: string; tags: string; createdAt: { seconds: number };
  image: string;
};

export default function BlogClient() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      const list: Post[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as Post));
      setPosts(list);
    })();
  }, []);

  return (
    <div className="page-header">
      <div className="container" style={{ padding: "60px 16px", maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 8, textAlign: "center" }}>Khaziq &amp; Sons Blog</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px" }}>
          Expert guides, buying tips, and industry insights about construction equipment, trolleys, wheelbarrows, and material handling in Pakistan.
        </p>

        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60, color: "#888" }}>
            <i className="fas fa-newspaper" style={{ fontSize: "3rem", marginBottom: 16, display: "block", color: "#ddd" }}></i>
            <h3>Coming Soon</h3>
            <p>We are writing helpful guides for you. Check back soon!</p>
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                {post.image && <img src={post.image} alt={post.title} className="blog-card-img" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                <div className="blog-card-body">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span><i className="fas fa-user"></i> {post.author || "Khaziq & Sons"}</span>
                    <span><i className="fas fa-calendar"></i> {post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
