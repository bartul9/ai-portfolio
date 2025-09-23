const siteUrl = "https://lukabartulovic.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luka Bartulović | Frontend Developer in Croatia",
    template: "%s | Luka Bartulović — Frontend Developer in Croatia",
  },
  description:
    "Luka Bartulović is a Croatia-based front-end engineer building fast, scalable web and mobile products for startups and ambitious teams.",
  keywords: [
    "Luka Bartulović",
    "Luka Bartulovic",
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
    title: "Luka Bartulović | Frontend Developer in Croatia",
    description:
      "Freelance front-end developer from Split, Croatia creating high-performing digital experiences with React and Next.js.",
    siteName: "Luka Bartulović Portfolio",
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Luka Bartulović — Croatia Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lukabartulovic",
    title: "Luka Bartulović | Frontend Developer in Croatia",
    description:
      "Front-end engineer in Croatia delivering fast, modern interfaces with React, Next.js and strong SEO foundations.",
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

import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

import "./globals.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Luka Bartulović",
  alternateName: ["Luka Bartulovic", "Luka Bartulović frontend"],
  url: siteUrl,
  jobTitle: "Frontend Developer",
  description:
    "Frontend developer based in Split, Croatia delivering high-performance web apps, SEO-friendly experiences, and mobile interfaces.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Split",
    addressCountry: "Croatia",
  },
  sameAs: [
    "https://www.linkedin.com/in/luka-bartulović-5b562b200/",
    "https://github.com/bartul9",
    "mailto:bartul123@outlook.com",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "Frontend development",
    "SEO",
    "Product design",
  ],
  knowsLanguage: ["Croatian", "English"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Split",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Split",
      addressCountry: "Croatia",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="ld-json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(structuredData)}
        </Script>
      </head>
      <body className="bg-black relative">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
