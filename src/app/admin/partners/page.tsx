import { Metadata } from "next";
import PartnersClient from "./PartnersClient";

export const metadata: Metadata = {
  title: "Partners - Khaziq & Sons Admin",
  robots: "noindex, nofollow",
};

export default function PartnersPage() {
  return <PartnersClient />;
}
