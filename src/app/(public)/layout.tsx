import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Nav />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  );
}
