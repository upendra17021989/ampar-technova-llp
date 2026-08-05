import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteParallaxEffects } from "@/components/site-parallax-effects";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "AMPAR Technova LLP",
    template: "%s | AMPAR Technova LLP",
  },
  description: "Corrosion-resistant FRP, thermoplastic, dual-laminate and process equipment solutions.",
  icons: {
    icon: "/brand/ampar-technova-mark.jpeg",
    apple: "/brand/ampar-technova-mark.jpeg",
  },
  openGraph: {
    title: "AMPAR Technova LLP",
    description: "Engineering Tomorrow’s Corrosion-Resistant Solutions",
    images: [{ url: "/brand/ampar-technova-logo-banner.jpeg", width: 1494, height: 578, alt: "AMPAR Technova LLP" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <SiteParallaxEffects />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
