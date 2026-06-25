import BlogClient from "./BlogClient";

export const metadata = {
  title: "Blog - Khaziq & Sons | Construction Trolley Guides & Insights",
  description: "Expert guides, buying tips, and industry insights on construction trolleys, wheelbarrows, heavy-duty equipment, and material handling in Pakistan.",
  keywords: "construction trolley blog, wheelbarrow guide Pakistan, heavy duty equipment tips, material handling insights, Khaziq & Sons blog",
  openGraph: {
    title: "Blog - Khaziq & Sons | Construction Equipment Guides",
    description: "Expert guides on construction trolleys, wheelbarrows & heavy-duty equipment in Pakistan.",
    url: "https://khaziqandsons.com/blog",
    siteName: "Khaziq & Sons",
    images: [{ url: "https://khaziqandsons.com/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_PK", type: "website",
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
