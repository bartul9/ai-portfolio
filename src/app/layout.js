export const metadata = {
  title: "Luka Bartulović — Maximal Player 13",
  description: "Turning Ideas into Scalable, Beautiful Apps",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black relative">{children}</body>
    </html>
  );
}
