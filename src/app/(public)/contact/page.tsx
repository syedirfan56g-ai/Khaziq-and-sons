import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Khaziq & Sons — Pakistan's Premium Construction Trolley & Industrial Equipment Manufacturer",
  description: "Contact Khaziq & Sons — Pakistan's premium manufacturer of industrial-grade construction trolleys, heavy-duty wheelbarrows, and material handling equipment. Located in Landhi, Karachi. Call +92 304 2130631 or email khaziqandsons@gmail.com. Nationwide delivery.",
  keywords: "contact Khaziq and Sons, premium construction trolley Karachi, industrial wheelbarrow manufacturer Pakistan, heavy duty equipment supplier, Khaziq and Sons phone, premium trolley manufacturer Pakistan",
  openGraph: {
    title: "Contact Khaziq & Sons — Premium Industrial Equipment Pakistan",
    description: "Get in touch with Pakistan's premium construction equipment manufacturer. Call +92 304 2130631. Factory-direct pricing. Nationwide delivery.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
