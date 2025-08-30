export const metadata = {
  title: "Luka Bartulović",
  description: "Turning Ideas into Scalable, Beautiful Apps",
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
