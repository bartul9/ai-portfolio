import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const siteUrl = "https://luka-bartulovic.com/";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luka Bartulović | Full-Stack Developer in Croatia",
    template: "%s | Luka Bartulović — Full-Stack Developer in Croatia",
  },
  description:
    "Luka Bartulović is a Croatia-based full-stack engineer with a frontend core, building fast, scalable web and mobile products for startups and ambitious teams.",
  keywords: [
    "Luka Bartulović",
    "Luka Bartulovic",
    "full stack developer Croatia",
    "full stack engineer",
    "frontend developer Croatia",
    "front end hrvatska",
    "React consultant",
    "Next.js expert",
    "Croatia UI engineer",
  ],
  authors: [{ name: "Luka Bartulović", url: siteUrl }],
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      hr: `${siteUrl}/?lang=hr`,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    title: "Luka Bartulović | Full-Stack Developer in Croatia",
    description:
      "Freelance full-stack developer from Split, Croatia creating high-performing digital experiences with React, Next.js and AI.",
    siteName: "Luka Bartulović Portfolio",
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Luka Bartulović — Croatia Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lukabartulovic",
    title: "Luka Bartulović | Full-Stack Developer in Croatia",
    description:
      "Full-stack engineer in Croatia delivering fast, modern products with React, Next.js and strong SEO foundations.",
    images: [`${siteUrl}/api/og`],
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "VLQOF6AG39HHR2ijeTNw8WDuIOgmTsHoAj-9MIsvBKw",
  },
};

export const viewport = {
  themeColor: "#070a12",
  colorScheme: "dark" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
