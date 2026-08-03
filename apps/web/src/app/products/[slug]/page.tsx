import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/content/catalogue";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? { title: product.name, description: product.summary } : {};
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return <main id="main-content"><section className="page-hero"><div className="shell narrow"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/products">Products</Link><span aria-hidden="true">/</span><span>{product.name}</span></nav><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="lead">{product.summary}</p><div className="action-row"><Link className="button button-primary" href={`/request-a-quote?product=${product.slug}`}>Request a Quote</Link></div></div></section><section className="section"><div className="shell detail-grid"><div><h2>Applications</h2><ul className="feature-list">{product.applications.map((application) => <li key={application}>{application}</li>)}</ul></div><aside className="spec-panel"><h2>Material options</h2><div className="tag-list">{product.materials.map((material) => <span key={material}>{material}</span>)}</div><p className="technical-note">Final material selection depends on chemical, concentration, temperature, pressure and process conditions. Technical review is required.</p></aside></div></section></main>;
}
