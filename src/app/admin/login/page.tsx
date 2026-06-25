import { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Login - Khaziq & Sons",
  robots: "noindex, nofollow",
};

export default function AdminLoginPage() {
  return <AdminLoginClient />;
}
