import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteParallaxEffects } from "@/components/site-parallax-effects";
import { VisitorTracker } from "@/components/visitor-tracker";
import { SeoStructuredData } from "@/components/seo-structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "AMPAR Technova LLP",
    template: "%s | AMPAR Technova LLP",
  },
  description: "AMPAR Technova engineers and manufactures corrosion-resistant FRP, thermoplastic, dual-laminate and process equipment in Gujarat, India.",
  keywords: ["FRP equipment manufacturer", "thermoplastic tanks", "dual laminate equipment", "corrosion resistant equipment", "process equipment manufacturer", "FRP tanks Gujarat"],
  applicationName: "AMPAR Technova LLP",
  authors: [{ name: "AMPAR Technova LLP", url: "/" }],
  creator: "AMPAR Technova LLP",
  publisher: "AMPAR Technova LLP",
  category: "Industrial Manufacturing",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: {
    icon: "/brand/ampar-technova-mark.jpeg",
    apple: "/brand/ampar-technova-mark.jpeg",
  },
  openGraph: {
    title: "AMPAR Technova LLP",
    description: "Engineering Tomorrowâ€™s Corrosion-Resistant Solutions",
    images: [{ url: "/brand/ampar-technova-logo-banner.jpeg", width: 1494, height: 578, alt: "AMPAR Technova LLP" }],
    type: "website",
    locale: "en_IN",
    siteName: "AMPAR Technova LLP",
  },
  twitter: { card: "summary_large_image", title: "AMPAR Technova LLP", description: "Engineering tomorrow's corrosion-resistant solutions.", images: ["/brand/ampar-technova-logo-banner.jpeg"] },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SeoStructuredData />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <SiteParallaxEffects />
        <VisitorTracker />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
