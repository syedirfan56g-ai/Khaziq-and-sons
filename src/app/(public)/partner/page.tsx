import { Metadata } from "next";
import PartnerClient from "./PartnerClient";

export const metadata: Metadata = {
  title: "Become a Premium Retailer — Khaziq & Sons | Authorized Distributor Program Pakistan",
  description: "Join the Khaziq & Sons retailer network. Become an authorized distributor of Pakistan's premium construction equipment brand. Offer your customers industrial-grade trolleys, wheelbarrows, and material handling equipment. Wholesale partnerships available nationwide.",
  keywords: "Khaziq and Sons authorized retailer, premium construction equipment distributor Pakistan, industrial trolley reseller, wholesale partnership Karachi, become dealer Khaziq and Sons",
  openGraph: {
    title: "Become a Premium Retailer — Khaziq & Sons Distributor Program",
    description: "Partner with Pakistan's premium construction equipment brand. Wholesale rates, marketing support, and nationwide logistics.",
  },
};

export default function PartnerPage() {
  return <PartnerClient />;
}
