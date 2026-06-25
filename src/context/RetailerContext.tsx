"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Retailer = {
  id: string; fullName: string; businessName: string; phone: string;
  city: string; address: string; status: string; retailerId: string;
  adminNote: string; monthlyVolume: string; whatsapp: string;
};

type RetailerContextType = {
  retailer: Retailer | null;
  login: (id: string) => Promise<string | null>;
  logout: () => void;
  loading: boolean;
};

const RetailerContext = createContext<RetailerContextType>({
  retailer: null, login: async () => null, logout: () => {}, loading: false,
});

export function RetailerProvider({ children }: { children: React.ReactNode }) {
  const [retailer, setRetailer] = useState<Retailer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ks_retailer");
    if (stored) {
      try { setRetailer(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (id: string): Promise<string | null> => {
    setLoading(true);
    try {
      const { getDocs, collection } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");
      const snap = await getDocs(collection(db, "partners"));
      const found = snap.docs.find((d) => d.data().retailerId === id.trim().toUpperCase());
      if (!found) { setLoading(false); return "Invalid Retailer ID."; }
      const data = found.data() as Retailer;
      setRetailer({ ...data, id: found.id });
      localStorage.setItem("ks_retailer", JSON.stringify({ ...data, id: found.id }));
      setLoading(false);
      return null;
    } catch { setLoading(false); return "Something went wrong."; }
  };

  const logout = () => {
    setRetailer(null);
    localStorage.removeItem("ks_retailer");
  };

  return <RetailerContext.Provider value={{ retailer, login, logout, loading }}>{children}</RetailerContext.Provider>;
}

export const useRetailer = () => useContext(RetailerContext);
