export const metadata = {
  title: "Luka Bartulović",
  description: "Turning Ideas into Scalable, Beautiful Apps",
  verification: {
    google: "VLQOF6AG39HHR2ijeTNw8WDuIOgmTsHoAj-9MIsvBKw",
  },
};

import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Analytics />
      <body className="bg-black relative">{children}</body>
    </html>
  );
}
