import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomepageEffects } from "@/components/homepage-effects";
import { products } from "@/content/catalogue";

type Props = { params: Promise<{ slug: string }> };
type ProductImage = { src: string; alt: string };

const productImages: Record<string, ProductImage[]> = {
  "frp-storage-tanks": [
    { src: "/products/who-we-are-tanks.png", alt: "Fabricated corrosion-resistant storage tanks inside the manufacturing facility" },
  ],
  "reactors-process-vessels": [
    { src: "/products/frp-horizontal-process-vessel.jpeg", alt: "Large horizontal FRP process vessel with bolted access flange and nozzles" },
    { src: "/products/frp-process-columns.jpeg", alt: "Installed FRP process columns and connecting ductwork" },
  ],
  "frp-process-equipment": [
    { src: "/products/frp-horizontal-process-vessel.jpeg", alt: "Large horizontal FRP process vessel under fabrication" },
    { src: "/products/frp-process-columns.jpeg", alt: "Twin FRP process columns installed on a structural platform" },
  ],
  "wet-packed-bed-scrubbers": [
    { src: "/products/packed-bed-scrubber-bank.jpeg", alt: "Bank of packed-bed scrubber vessels with common ducting" },
    { src: "/products/frp-scrubber-exhaust-system.jpeg", alt: "FRP scrubber, exhaust duct and stack installation" },
    { src: "/products/frp-wet-scrubber-installation.jpeg", alt: "Multiple wet scrubber units operating as an integrated fume-control system" },
    { src: "/products/frp-packed-bed-scrubber.jpeg", alt: "FRP packed-bed scrubber with circulation pumps and exhaust stack" },
  ],
  "frp-ducting-chimneys": [
    { src: "/products/frp-piping-installation.jpeg", alt: "Installed FRP pipework with flanged connections and isolation valves" },
    { src: "/products/frp-piping-rack.jpeg", alt: "Supported FRP ducting and pipework in an industrial process area" },
    { src: "/products/frp-piping-manifold.jpeg", alt: "FRP process piping manifold with valves and instrumentation" },
    { src: "/products/frp-pipe-fittings.jpeg", alt: "Fabricated FRP elbows, reducers and pipe fittings" },
  ],
};

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? { title: product.name, description: product.summary, alternates: { canonical: `/products/${product.slug}` }, openGraph: { title: product.name, description: product.summary, url: `/products/${product.slug}`, type: "website", ...(productImages[slug]?.[0] ? { images: [productImages[slug][0].src] } : {}) } } : {};
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const gallery = productImages[slug] ?? [];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ampartechnova.com";
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Product", name: product.name, description: product.summary, category: product.category, material: product.materials, manufacturer: { "@id": `${siteUrl}/#organization` }, url: `${siteUrl}/products/${product.slug}`, ...(gallery[0] ? { image: `${siteUrl}${gallery[0].src}` } : {}) }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Products", item: `${siteUrl}/products` }, { "@type": "ListItem", position: 2, name: product.name, item: `${siteUrl}/products/${product.slug}` }] }] };

  return <main id="main-content">
    <HomepageEffects />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="page-hero"><div className="shell narrow"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/products">Products</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="lead">{product.summary}</p><div className="action-row"><Link className="button button-primary" href={`/request-a-quote?product=${product.slug}`}>Request a Quote</Link><Link className="button button-inverse" href="/capabilities">View Capabilities</Link></div></div></section>
    {gallery.length ? <section className="section product-gallery-section" aria-labelledby="product-gallery-heading"><div className="shell"><p className="eyebrow dark">Project and equipment gallery</p><h2 id="product-gallery-heading">{product.name} in fabrication and service</h2><div className={`product-image-gallery${gallery.length === 1 ? " single" : ""}`}>{gallery.map((item, index) => <figure key={item.src}><Image src={item.src} alt={item.alt} width={1200} height={800} priority={index === 0} /><figcaption>{item.alt}</figcaption></figure>)}</div></div></section> : null}
    <section className="section"><div className="shell detail-grid"><div><p className="eyebrow dark">Typical duties</p><h2>Applications</h2><ul className="feature-list">{product.applications.map((application) => <li key={application}>{application}</li>)}</ul></div><aside className="spec-panel"><h2>Material options</h2><div className="tag-list">{product.materials.map((material) => <span key={material}>{material}</span>)}</div><p className="technical-note">Final material selection depends on chemical, concentration, temperature, pressure and process conditions. Technical review is required.</p></aside></div></section>
    <section className="section section-muted"><div className="shell"><p className="eyebrow dark">Performance</p><h2>Why this equipment is considered</h2><div className="four-grid">{product.benefits.map((benefit) => <article className="card" key={benefit}><h3>{benefit}</h3></article>)}</div>{product.capabilities ? <><h2 className="subsection-title">Available configurations</h2><div className="industry-list">{product.capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div></> : null}</div></section>
    <section className="section cta-section"><div className="shell cta-inner"><div><p className="eyebrow dark">Application review</p><h2>Share your process conditions.</h2><p>Chemical, concentration, temperature, pressure, capacity and site conditions help determine the appropriate construction.</p></div><Link className="button button-primary" href={`/request-a-quote?product=${product.slug}`}>Request This Equipment</Link></div></section>
  </main>;
}
