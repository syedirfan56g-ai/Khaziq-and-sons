"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import AdminSidebar from "@/components/AdminSidebar";

export default function DashboardClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({ products: 0, partners: 0, orders: 0, complaints: 0, leaves: 0, messages: 0, approved: 0, pending: 0 });

  useEffect(() => {
    if (!loading && !user) router.push("/admin/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      try {
        const [pSnap, partSnap, oSnap, cSnap, lSnap, mSnap] = await Promise.all([
          getDocs(collection(db, "products")),
          getDocs(collection(db, "partners")),
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "complaints")),
          getDocs(collection(db, "leaves")),
          getDocs(collection(db, "messages")),
        ]);
        let approved = 0, pending = 0;
        partSnap.forEach((d) => {
          const status = d.data().status;
          if (status === "approved") approved++;
          else if (status === "pending" || !status) pending++;
        });
        setStats({ products: pSnap.size, partners: partSnap.size, orders: oSnap.size, complaints: cSnap.size, leaves: lSnap.size, messages: mSnap?.size || 0, approved, pending });
      } catch {} // ignore if no data yet
    };
    fetchStats();
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>Dashboard</h1>
          <div className="admin-topbar-right">
            <span className="admin-user-email">{user.email}</span>
            <div className="admin-avatar">{user.email?.charAt(0).toUpperCase()}</div>
          </div>
        </div>
        <div className="admin-content">
          <div className="admin-stats">
            <div className="admin-stat-card">
              <div className="admin-stat-icon orange"><i className="fas fa-box"></i></div>
              <div className="stat-info"><h3>{stats.products}</h3><p>Total Products</p></div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon green"><i className="fas fa-handshake"></i></div>
              <div className="stat-info"><h3>{stats.partners}</h3><p>Total Retailers</p></div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon blue"><i className="fas fa-file-invoice"></i></div>
              <div className="stat-info"><h3>{stats.orders}</h3><p>Total Inquiries</p></div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon green"><i className="fas fa-check-circle"></i></div>
              <div className="stat-info"><h3>{stats.approved}</h3><p>Approved Retailers</p></div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon red"><i className="fas fa-clock"></i></div>
              <div className="stat-info"><h3>{stats.pending}</h3><p>Pending Applications</p></div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon orange"><i className="fas fa-comment-dots"></i></div>
              <div className="stat-info"><h3>{stats.complaints}</h3><p>Complaints</p></div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon blue"><i className="fas fa-calendar-alt"></i></div>
              <div className="stat-info"><h3>{stats.leaves}</h3><p>Leave Requests</p></div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon green"><i className="fas fa-comments"></i></div>
              <div className="stat-info"><h3>{stats.messages}</h3><p>Messages</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
