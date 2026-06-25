import type { Metadata } from "next";
import ComplaintClient from "./ComplaintClient";

export const metadata: Metadata = {
  title: "Submit a Complaint - Khaziq & Sons",
  description: "Submit a complaint or feedback to Khaziq & Sons. We value your feedback and will respond within 24 hours.",
};

export default function ComplaintPage() {
  return <ComplaintClient />;
}
