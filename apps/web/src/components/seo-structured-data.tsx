const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ampartechnova.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "AMPAR Technova LLP",
      url: siteUrl,
      logo: `${siteUrl}/brand/ampar-technova-full-logo.png`,
      email: "Sales@ampartechnova.com",
      telephone: "+91-76006-70953",
      description: "Engineering and manufacturing corrosion-resistant FRP, thermoplastic, dual-laminate and process equipment solutions.",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Plot No. 15, Madhav Industrial Park, Garden City Road, GIDC",
          addressLocality: "Ankleshwar",
          addressRegion: "Gujarat",
          postalCode: "393002",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "D3-E-40/4, Village Dahej, Taluka Vagra",
          addressLocality: "Bharuch",
          addressRegion: "Gujarat",
          postalCode: "392130",
          addressCountry: "IN",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+91-76006-70953",
        email: "Sales@ampartechnova.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "AMPAR Technova LLP",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export function SeoStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
    />
  );
}
