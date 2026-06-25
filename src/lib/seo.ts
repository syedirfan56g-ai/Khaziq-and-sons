import { Metadata } from "next";

const site = "Khaziq & Sons";
const baseUrl = "https://khaziqandsons.com";

export function pageMeta(title: string, description: string, keywords?: string): Metadata {
  return {
    title: `${title} | ${site}`,
    description,
    keywords,
    openGraph: {
      title: `${title} | ${site}`,
      description,
      url: baseUrl,
    },
  };
}

export const homeMeta: Metadata = {
  title: `${site} | Pakistan's #1 Premium Construction & Agriculture Wheelbarrow, Trolley & Equipment Manufacturer`,
  description: `${site} — Pakistan's trusted manufacturer of premium construction and agriculture wheelbarrows, heavy-duty trolleys, tubs, and material handling equipment since 2016.`,
};

export const catalogMeta = pageMeta(
  "Full Product Catalog — Wheelbarrows, Trolleys, Tubs & Spare Parts",
  "Browse Khaziq & Sons' complete product catalog. Premium wheelbarrows, platform trolleys, tubs, stools, tyres, rims, and spare parts for construction and agriculture. Download PDF catalog.",
  "Khaziq and Sons product catalog, construction trolley price list Pakistan, wheelbarrow catalog Pakistan, platform trolley catalog, agriculture equipment catalog"
);

export const customizerMeta = pageMeta(
  "Build Your Own Trolley — Product Customizer with Live Pricing",
  "Customize your own construction or agriculture wheelbarrow, trolley, tub or stool. Select gauge, tyre type, size, and color — see live price instantly. Pakistan's first trolley product customizer.",
  "custom trolley builder Pakistan, wheelbarrow customizer, build your own trolley, trolley configurator, live pricing tool Pakistan"
);

export const quotationMeta = pageMeta(
  "Get a Bulk Quotation — PDF Quotation for Wheelbarrows & Trolleys",
  "Request a professional PDF quotation for bulk orders of premium wheelbarrows, platform trolleys, and agriculture equipment. Volume-based pricing. Download official Khaziq & Sons quotation.",
  "bulk quotation Pakistan, wheelbarrow wholesale price, trolley quotation PDF, construction equipment bulk order, agriculture equipment quotation"
);

export const freightMeta = pageMeta(
  "Freight & Shipping Cost Calculator — Pakistan Wide Delivery",
  "Calculate estimated freight cost for heavy-duty trolleys and wheelbarrows delivery across Pakistan. City-to-city transport cost calculator for goods adda and courier services.",
  "freight calculator Pakistan, shipping cost trolley, transport charges Karachi to Lahore, goods adda rates Pakistan, heavy equipment delivery cost"
);

export const blogMeta = pageMeta(
  "Blog — Construction & Agriculture Equipment Tips & Guides",
  "Expert guides, tips, and articles about construction and agriculture equipment in Pakistan. Wheelbarrow maintenance, trolley buying guide, industry insights from Khaziq & Sons.",
  "construction equipment blog Pakistan, trolley buying guide, wheelbarrow tips, agriculture equipment guide Pakistan"
);

export const certificationsMeta = pageMeta(
  "Certifications & Compliance — Quality Certified Equipment",
  "Download Khaziq & Sons' quality certifications, load testing reports, and compliance documents. ISO standards, steel strength tests, and safety certificates for mega projects.",
  "Khaziq and Sons certifications, load testing report Pakistan, ISO compliance construction equipment, steel strength certificate, quality assurance trolley manufacturer"
);

export const corporateMeta = pageMeta(
  "Corporate Client Portal — Bulk Order Tracking & Invoices",
  "Login to Khaziq & Sons' corporate client portal. Track bulk orders, download invoices, and manage your account. For DHA, Bahria, and corporate procurement teams.",
  "corporate client portal Pakistan, bulk order tracking, construction equipment procurement, DHA supplier Pakistan, Bahria town contractor"
);

export const partnerMeta = pageMeta(
  "Become a Khaziq & Sons Retailer — Join Pakistan's Fastest Growing Dealer Network",
  "Apply to become an authorized Khaziq & Sons retailer. Competitive wholesale pricing, marketing support, and exclusive territory rights. Join 350+ retailers across Pakistan.",
  "become a retailer Pakistan, trolley dealership, construction equipment distributor, hardware store supplier Pakistan, wholesale dealer program"
);

export const orderMeta = pageMeta(
  "Company Order Form — Bulk Construction & Agriculture Equipment",
  "Submit a bulk order for premium wheelbarrows, trolleys, and equipment. Khaziq & Sons — factory-direct wholesale pricing for companies and contractors across Pakistan.",
  "company order form Pakistan, bulk trolley order, construction equipment wholesale, company supply Karachi, contractor equipment order"
);

export const contactMeta = pageMeta(
  "Contact Khaziq & Sons — Premium Wheelbarrow & Trolley Manufacturer Karachi",
  "Get in touch with Khaziq & Sons. Call, WhatsApp, or email our sales team for quotes, orders, and inquiries. Landhi, Karachi, Pakistan.",
  "contact Khaziq and Sons, Karachi trolley manufacturer phone number, wheelbarrow supplier contact, construction equipment inquiry Pakistan"
);

export const complaintMeta = pageMeta(
  "File a Complaint — Khaziq & Sons Customer Support",
  "Submit a complaint regarding your Khaziq & Sons product. Our team will address quality, delivery, or service issues within 24 hours.",
  "complaint Khaziq and Sons, product complaint Pakistan, trolley warranty claim, customer support Pakistan"
);

export const leaveMeta = pageMeta(
  "Staff Leave Application — Khaziq & Sons Employee Portal",
  "Internal staff leave application form for Khaziq & Sons employees. Submit annual, sick, or casual leave requests.",
  "staff leave form, employee leave application Pakistan"
);
