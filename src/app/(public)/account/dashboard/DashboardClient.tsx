"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import Link from "next/link";

type Msg = {
  id: string; name: string; message: string; adminNote: string;
  createdAt: { seconds: number }; status: string;
};

export default function DashboardClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [profile, setProfile] = useState<{ name: string; city: string; email: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/account/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setProfile(snap.data() as { name: string; city: string; email: string });

      const q = query(collection(db, "messages"), where("uid", "==", user.uid), orderBy("createdAt", "desc"));
      const msnap = await getDocs(q);
      const list: Msg[] = [];
      msnap.forEach((d) => list.push({ id: d.id, ...d.data() } as Msg));
      setMsgs(list);
    })();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) return <div className="account-page"><p>Loading...</p></div>;
  if (!user) return null;

  return (
    <div className="account-page">
      <div className="account-box" style={{ maxWidth: 600 }}>
        <div className="account-header">
          <img src="/logo.png" alt="Khaziq & Sons" style={{ height: 36 }} />
          <h2>My Account</h2>
        </div>
        {profile && (
          <div className="profile-info">
            <div className="profile-avatar">{profile.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0).toUpperCase()}</div>
            <div><strong>{profile.name || user.email}</strong><br /><small style={{ color: "#888" }}>{profile.city} &middot; {user.email}</small></div>
          </div>
        )}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <Link href="/" className="btn btn-outline" style={{ padding: "8px 16px" }}><i className="fas fa-home"></i> Home</Link>
          <button className="btn btn-outline" style={{ padding: "8px 16px" }} onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
        <h3 style={{ marginBottom: 12 }}>My Messages ({msgs.length})</h3>
        {msgs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "#888" }}>
            <i className="fas fa-comment-dots" style={{ fontSize: "2rem", marginBottom: 8, display: "block" }}></i>
            <p>No messages yet. <Link href="/" style={{ color: "#D97700" }}>Send a message</Link> from the chat icon.</p>
          </div>
        ) : (
          msgs.map((m) => (
            <div key={m.id} className="msg-thread" style={{ background: m.adminNote ? "#fefce8" : "#f9fafb" }}>
              <div className="msg-bubble user"><strong>You:</strong> {m.message}</div>
              {m.adminNote && (
                <div className="msg-bubble admin">
                  <strong style={{ color: "#D97700" }}>Khaziq & Sons:</strong> {m.adminNote}
                </div>
              )}
              <small style={{ color: "#aaa", fontSize: "0.75rem" }}>
                {m.createdAt?.seconds ? new Date(m.createdAt.seconds * 1000).toLocaleDateString() : ""}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
