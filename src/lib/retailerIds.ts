export const cityCodes: Record<string, string> = {
  Karachi: "KHI", Lahore: "LHE", Islamabad: "ISB", Rawalpindi: "RWP",
  Faisalabad: "FSD", Multan: "MUX", Peshawar: "PEW", Quetta: "UET",
  Gujranwala: "GRW", Sialkot: "SKT", Hyderabad: "HYD", Sukkur: "SKZ",
  Larkana: "LRK", Other: "OTH",
};

function randomFourDigits(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function generateRetailerId(city: string, existingIds: Set<string>): string {
  const code = cityCodes[city] || "OTH";
  let num: string;
  let id: string;
  do {
    num = randomFourDigits();
    id = `KAS-${code}-${num}`;
  } while (existingIds.has(id));
  return id;
}
