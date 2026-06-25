"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { seedPosts } from "./seedData";

export default function SeedClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "seeding" | "done" | "exists">("checking");
  const [count, setCount] = useState(0);
  const [total] = useState(seedPosts.length);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDocs(collection(db, "blog"));
      if (snap.size >= total) { setStatus("exists"); return; }
      setStatus("seeding");
      setResults([]);
      for (let i = 0; i < seedPosts.length; i++) {
        try {
          const post = seedPosts[i];
          await addDoc(collection(db, "blog"), {
            ...post,
            createdAt: Timestamp.now(),
          });
          setCount(i + 1);
          setResults((prev) => [...prev, `✅ ${post.title}`]);
        } catch (err) {
          setResults((prev) => [...prev, `❌ ${seedPosts[i].title} — ${(err as Error).message}`]);
        }
      }
      setStatus("done");
    })();
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <div className="admin-main" style={{ marginLeft: 0 }}>
        <div className="admin-content" style={{ maxWidth: 800, margin: "40px auto" }}>
          <div className="admin-card" style={{ textAlign: "center", padding: 40 }}>
            {status === "checking" && <p style={{ color: "#888" }}>Checking blog collection...</p>}

            {status === "exists" && (
              <>
                <h2 style={{ marginBottom: 12, color: "#16a34a" }}>✅ Blog Already Seeded</h2>
                <p style={{ marginBottom: 20 }}>{total} posts already exist.</p>
                <a href="/admin/blog" className="admin-btn admin-btn-primary"><i className="fas fa-newspaper"></i> View Blog Admin</a>
              </>
            )}

            {status === "seeding" && (
              <div>
                <h2 style={{ marginBottom: 12 }}>Seeding Blog Posts...</h2>
                <div style={{ fontSize: "1.2rem", marginBottom: 16 }}>{count}/{total}</div>
                <div style={{ width: "100%", background: "#f0f0f0", borderRadius: 8, height: 8, overflow: "hidden", marginBottom: 16 }}>
                  <div style={{ width: `${(count / total) * 100}%`, background: "#D97700", height: "100%", transition: "width 0.3s" }}></div>
                </div>
                <div style={{ textAlign: "left", maxHeight: 200, overflowY: "auto", background: "#f9fafb", borderRadius: 8, padding: 12, fontSize: "0.8rem", fontFamily: "monospace" }}>
                  {results.map((r, i) => <div key={i}>{r}</div>)}
                </div>
              </div>
            )}

            {status === "done" && (
              <>
                <h2 style={{ marginBottom: 12, color: "#16a34a" }}>✅ {count} Posts Added!</h2>
                <p style={{ marginBottom: 20 }}>All blog posts are live. Now running SEO implementation...</p>
                <div style={{ fontSize: "1.5rem", marginBottom: 16 }}>⏳</div>
                <p style={{ color: "#888" }}>Redirecting to SEO page...</p>
                {setTimeout(() => { router.push("/admin/blog/seo"); }, 2000)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
