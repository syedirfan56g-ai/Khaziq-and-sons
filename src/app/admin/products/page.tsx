import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products - Khaziq & Sons Admin",
  robots: "noindex, nofollow",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
