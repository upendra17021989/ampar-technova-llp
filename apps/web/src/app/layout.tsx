import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AMPAR Technova LLP",
    template: "%s | AMPAR Technova LLP",
  },
  description: "Corrosion-resistant FRP, thermoplastic, dual-laminate and process equipment solutions.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
