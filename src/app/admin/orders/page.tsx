import { Metadata } from "next";
import OrdersClient from "./OrdersClient";

export const metadata: Metadata = {
  title: "Orders - Khaziq & Sons Admin",
  robots: "noindex, nofollow",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
