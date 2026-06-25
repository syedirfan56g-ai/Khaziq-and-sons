import type { Metadata } from "next";
import LeaveClient from "./LeaveClient";

export const metadata: Metadata = {
  title: "Staff Leave - Khaziq & Sons",
  description: "Submit a leave request form for Khaziq & Sons staff. Internal use only.",
};

export default function LeavePage() {
  return <LeaveClient />;
}
