import { Metadata } from "next";
import OrderClient from "./OrderClient";

export const metadata: Metadata = {
  title: "Order Premium Construction Trolleys & Industrial Wheelbarrows — Khaziq & Sons Pakistan",
  description: "Submit your inquiry for premium Khaziq & Sons industrial equipment. Heavy-duty platform trolleys, industrial wheelbarrows, cargo trolleys, and custom fabrication. Factory-direct wholesale pricing. Custom quotes within 24 hours. Nationwide delivery across Pakistan.",
  keywords: "premium construction trolley order Pakistan, buy industrial wheelbarrow, wholesale trolley price Pakistan, heavy duty equipment quote, Khaziq and Sons order, premium industrial equipment Pakistan",
  openGraph: {
    title: "Order Premium Industrial Equipment — Khaziq & Sons Pakistan",
    description: "Submit your inquiry for premium trolleys, wheelbarrows & custom fabrication. Factory-direct pricing. 48-hour dispatch.",
  },
};

export default function OrderPage() {
  return <OrderClient />;
}
