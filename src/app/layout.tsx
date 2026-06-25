import type { Metadata } from "next";
import "./globals.css";
import SiteOverlays from "@/components/SiteOverlays";

const baseMetadata = {
  applicationName: "Khaziq & Sons",
  robots: "index, follow",
  alternates: { canonical: "https://khaziqandsons.com" },
  openGraph: {
    type: "website" as const,
    locale: "en_PK",
    siteName: "Khaziq & Sons",
    url: "https://khaziqandsons.com",
    images: [{ url: "https://khaziqandsons.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image" as const,
  },
};

export const metadata: Metadata = {
  ...baseMetadata,
  title: "Khaziq & Sons | Pakistan's #1 Premium Construction & Agriculture Wheelbarrow, Trolley & Equipment Manufacturer",
  description: "Khaziq & Sons — Pakistan's trusted manufacturer of premium construction and agriculture wheelbarrows, heavy-duty trolleys, tubs, and material handling equipment. Superior quality, precision welding, factory-direct wholesale pricing since 2016. Serving contractors, farmers, and retailers nationwide.",
  keywords: "construction trolley Pakistan, agriculture wheelbarrow Pakistan, heavy duty trolley manufacturer Karachi, Khaziq and Sons, best wheelbarrow Pakistan, construction equipment supplier, farm wheelbarrow Pakistan, industrial trolley wholesale, kisan trolley, agriculture equipment Pakistan, premium wheelbarrow manufacturer, platform trolley Pakistan, material handling equipment Pakistan, trolley manufacturer Landhi Karachi",
  openGraph: {
    ...baseMetadata.openGraph,
    title: "Khaziq & Sons | Pakistan's #1 Premium Construction & Agriculture Equipment Manufacturer",
    description: "Premium construction and agriculture wheelbarrows, trolleys, tubs & material handling equipment. Factory-direct pricing. Pakistan's most trusted brand since 2016.",
  },
  twitter: {
    ...baseMetadata.twitter,
    title: "Khaziq & Sons | Premium Construction & Agriculture Equipment Pakistan",
    description: "Premium wheelbarrows, trolleys & equipment for construction and agriculture. Factory-direct nationwide.",
  },
  // Google Search Console: Replace with your verification code from https://search.google.com/search-console
  // other: { "google-site-verification": "VERIFICATION_CODE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK">
      <head>
        <meta name="theme-color" content="#D97700" />
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi, Pakistan" />
        <meta name="geo.position" content="24.8607;67.0011" />
        <meta name="ICBM" content="24.8607, 67.0011" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            "@id": "https://khaziqandsons.com",
            name: "Khaziq & Sons",
            legalName: "Khaziq & Sons",
            url: "https://khaziqandsons.com",
            logo: "https://khaziqandsons.com/logo.png",
            description: "Pakistan's premium manufacturer of heavy-duty construction and agriculture wheelbarrows, trolleys, tubs, and material handling equipment. Serving contractors, farmers, and retailers nationwide since 2016.",
            foundingDate: "2016",
            founder: { "@type": "Person", name: "Muhammad Khaziq Shah", jobTitle: "Founder & Owner" },
            ceo: { "@type": "Person", name: "Syed Afnan", jobTitle: "Director & CEO" },
            email: "khaziqandsons@gmail.com",
            telephone: "+92-304-2130631",
            address: { "@type": "PostalAddress", addressLocality: "Landhi, Karachi", addressCountry: "PK" },
            openingHoursSpecification: [
              { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "09:00", closes: "19:00" },
              { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "17:00" },
            ],
            contactPoint: [
              { "@type": "ContactPoint", telephone: "+92-304-2130631", contactType: "sales", availableLanguage: ["English", "Urdu"] },
              { "@type": "ContactPoint", telephone: "+92-304-2130631", contactType: "customer service", availableLanguage: ["English", "Urdu"] },
            ],
            sameAs: ["https://www.facebook.com/profile.php?id=61555434190184"],
            areaServed: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Gujranwala", "Sialkot", "Hyderabad", "Sukkur", "Gujrat", "Pakistan"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Premium Construction & Agriculture Equipment",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Premium Wheelbarrow — 300kg Capacity", description: "Industrial-grade wheelbarrow for construction and agriculture. 16-gauge steel tray, pneumatic tyre, 300kg load capacity. Best in Pakistan." } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Heavy Duty Platform Trolley — 1000kg Capacity", description: "Reinforced steel platform trolley with 1000kg capacity. Ideal for warehouses, factories, and farms." } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Agriculture Wheelbarrow — Heavy Duty", description: "Durable wheelbarrow designed for farm use. Larger tray, heavy-duty tyre, and corrosion-resistant finish." } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Premium Steel Tub — 16 Gauge", description: "Multi-purpose steel tub for construction and agriculture material handling. Available in 16/18/20/23 gauge." } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Platform Trolley — Standard 500kg", description: "Standard-duty platform trolley perfect for general transport. 500kg capacity, smooth-rolling wheels." } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Custom Industrial & Farm Trolleys", description: "Bespoke fabrication of trolleys for unique construction and agriculture requirements." } },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              bestRating: "5",
              ratingCount: "127",
              reviewCount: "127",
              itemReviewed: { "@type": "Organization", name: "Khaziq & Sons" },
            },
          }),
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://khaziqandsons.com/#website",
            url: "https://khaziqandsons.com",
            name: "Khaziq & Sons",
            description: "Pakistan's Premium Construction & Agriculture Wheelbarrow, Trolley & Equipment Manufacturer",
            potentialAction: {
              "@type": "SearchAction",
              target: { "@type": "EntryPoint", urlTemplate: "https://khaziqandsons.com/search?q={search_term_string}" },
              "query-input": "required name=search_term_string",
            },
          }),
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://khaziqandsons.com/" },
              { "@type": "ListItem", position: 2, name: "Product Catalog", item: "https://khaziqandsons.com/catalog" },
              { "@type": "ListItem", position: 3, name: "Build Your Trolley", item: "https://khaziqandsons.com/customizer" },
              { "@type": "ListItem", position: 4, name: "Blog", item: "https://khaziqandsons.com/blog" },
              { "@type": "ListItem", position: 5, name: "Contact", item: "https://khaziqandsons.com/contact" },
            ],
          }),
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              { "@type": "Question", name: "What is the warranty on Khaziq & Sons premium trolleys and wheelbarrows?", acceptedAnswer: { "@type": "Answer", text: "All Khaziq & Sons heavy-duty industrial and agriculture trolleys come with a standard 12-month warranty covering manufacturing defects. Premium models include an extended 2-year warranty." } },
              { "@type": "Question", name: "Do you deliver construction and agriculture equipment across Pakistan?", acceptedAnswer: { "@type": "Answer", text: "Yes, Khaziq & Sons delivers premium equipment to all major Pakistani cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Hyderabad, Sukkur, Gujranwala, and Sialkot." } },
              { "@type": "Question", name: "What makes Khaziq & Sons wheelbarrows and trolleys premium quality?", acceptedAnswer: { "@type": "Answer", text: "Khaziq & Sons uses high-grade steel, precision MIG welding, powder-coated anti-rust finishes, and industrial-grade wheels. Every product is load-tested at 125% of rated capacity before shipping." } },
              { "@type": "Question", name: "Can I get custom-designed trolleys for my farm or construction site?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. Khaziq & Sons specializes in custom fabrication for both construction and agriculture. Use our Product Customizer tool or contact our engineering team for bespoke requirements." } },
              { "@type": "Question", name: "Where to buy the best heavy duty wheelbarrow for construction and farming in Pakistan?", acceptedAnswer: { "@type": "Answer", text: "Khaziq & Sons is Pakistan's premium manufacturer of heavy-duty wheelbarrows for both construction and agriculture. Based in Karachi, we offer factory-direct wholesale pricing with nationwide delivery." } },
              { "@type": "Question", name: "What is the price of construction and farm trolleys in Pakistan?", acceptedAnswer: { "@type": "Answer", text: "Khaziq & Sons offers competitive volume-based pricing for premium trolleys and wheelbarrows. Use our online Product Customizer for live pricing or contact us at +92-304-2130631 for a customized bulk quotation." } },
              { "@type": "Question", name: "Do you make agriculture wheelbarrows for farmers (kissan gar)?", acceptedAnswer: { "@type": "Answer", text: "Yes, Khaziq & Sons manufactures heavy-duty agriculture wheelbarrows specifically designed for farm use with larger trays, reinforced frames, and corrosion-resistant finishes at factory-direct prices." } },
              { "@type": "Question", name: "What are the available steel gauges for your tubs and trays?", acceptedAnswer: { "@type": "Answer", text: "Khaziq & Sons offers tubs and trays in multiple steel gauges: Premium 16 Gauge (1.6mm), Heavy Duty 18 Gauge (1.2mm), Standard 20 Gauge (0.9mm), and Affordable 23 Gauge (0.6mm). Use our Product Customizer to select the right gauge." } },
            ],
          }),
        }} />
      </head>
      <body>{children}<SiteOverlays /></body>
    </html>
  );
}
