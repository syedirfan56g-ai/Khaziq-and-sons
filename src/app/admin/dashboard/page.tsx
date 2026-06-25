import { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard - Khaziq & Sons Admin",
  robots: "noindex, nofollow",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
