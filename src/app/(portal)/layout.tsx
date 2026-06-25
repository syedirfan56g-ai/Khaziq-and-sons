import { RetailerProvider } from "@/context/RetailerContext";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return <RetailerProvider>{children}</RetailerProvider>;
}
