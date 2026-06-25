"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const picsumImages = [
  "https://picsum.photos/seed/wheelbarrow/800/400",
  "https://picsum.photos/seed/trolley/800/400",
  "https://picsum.photos/seed/construction/800/400",
  "https://picsum.photos/seed/industrial/800/400",
  "https://picsum.photos/seed/warehouse/800/400",
  "https://picsum.photos/seed/factory/800/400",
  "https://picsum.photos/seed/equipment/800/400",
  "https://picsum.photos/seed/tools/800/400",
  "https://picsum.photos/seed/hardware/800/400",
  "https://picsum.photos/seed/steel/800/400",
  "https://picsum.photos/seed/logistics/800/400",
  "https://picsum.photos/seed/material/800/400",
  "https://picsum.photos/seed/safety/800/400",
  "https://picsum.photos/seed/business/800/400",
  "https://picsum.photos/seed/quality/800/400",
  "https://picsum.photos/seed/premium/800/400",
  "https://picsum.photos/seed/heavy/800/400",
  "https://picsum.photos/seed/duty/800/400",
  "https://picsum.photos/seed/cargo/800/400",
  "https://picsum.photos/seed/platform/800/400",
];

export default function FixImagesClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<{ id: string; title: string; slug: string; hasImage: boolean }[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "done">("loading");
  const [count, setCount] = useState(0);

  useEffect(() => { if (!loading && !user) router.push("/admin/login"); }, [user, loading, router]);

  const loadPosts = async () => {
    const snap = await getDocs(collection(db, "blog"));
    const list = snap.docs.map((d) => ({
      id: d.id, title: d.data().title || "Untitled",
      slug: d.data().slug || "", hasImage: !!d.data().image,
    }));
    setPosts(list);
    setStatus("ready");
  };

  useEffect(() => { if (user) loadPosts(); }, [user]);

  const fixAll = async () => {
    setStatus("loading");
    setCount(0);
    const snap = await getDocs(collection(db, "blog"));
    const docs = snap.docs;
    for (let i = 0; i < docs.length; i++) {
      try {
        const img = picsumImages[i % picsumImages.length];
        await updateDoc(doc(db, "blog", docs[i].id), { image: img });
        setCount(i + 1);
      } catch {}
    }
    await loadPosts();
    setStatus("done");
  };

  if (loading || !user) return null;

  const missing = posts.filter((p) => !p.hasImage);

  return (
    <div className="admin-layout">
      <div className="admin-main" style={{ marginLeft: 0 }}>
        <div className="admin-content" style={{ maxWidth: 900, margin: "40px auto" }}>
          <div className="admin-card" style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 12 }}>🖼️ Fix Blog Images</h2>
            <p style={{ color: "#666", marginBottom: 8 }}>
              Total: <strong>{posts.length}</strong> | With images: <strong>{posts.length - missing.length}</strong> | Missing: <strong style={{ color: missing.length > 0 ? "#dc2626" : "#16a34a" }}>{missing.length}</strong>
            </p>
            <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: 16 }}>
              Using Picsum.photos — guaranteed working images. Replaces ALL existing images.
            </p>

            {status === "done" && <p style={{ color: "#16a34a", fontWeight: 600, marginBottom: 16 }}>✅ {count} posts updated!</p>}

            <button className="admin-btn admin-btn-primary" style={{ marginBottom: 20 }} onClick={fixAll} disabled={status === "loading"}>
              <i className="fas fa-wand-magic-sparkles"></i> Replace All {posts.length} Images
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {posts.map((p, i) => (
                <div key={p.id} style={{ background: "#f9fafb", borderRadius: 8, overflow: "hidden" }}>
                  <img src={picsumImages[i % picsumImages.length]} alt="" style={{ width: "100%", height: 120, objectFit: "cover" }} />
                  <div style={{ padding: "8px 12px", fontSize: "0.8rem" }}>
                    <div style={{ fontWeight: 600, marginBottom: 2 }}>{p.title.substring(0, 40)}...</div>
                    <span style={{ color: p.hasImage ? "#16a34a" : "#dc2626" }}>{p.hasImage ? "✅ Has image" : "❌ Missing"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
