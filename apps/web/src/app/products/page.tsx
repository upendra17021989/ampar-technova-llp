import type { Metadata } from "next";
import Link from "next/link";
import { HomepageEffects } from "@/components/homepage-effects";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { productCategories, products } from "@/content/catalogue";

export const metadata: Metadata = { title: "Products", description: "Explore AMPAR Technova corrosion-resistant storage, process, pollution-control, piping and custom-fabrication equipment.", alternates: { canonical: "/products" } };

export default function ProductsPage() {
  return <main id="main-content" className="interior-page products-index">
    <HomepageEffects />
    <PageHero className="products-hero" eyebrow="Product portfolio" title="Corrosion-resistant equipment for industrial processes" description="Explore catalogue-backed product families. Final material and equipment selection depends on reviewed process conditions." action={{ label: "Request a Quote", href: "/request-a-quote" }} />
    <section className="section"><div className="shell"><div className="filter-strip" aria-label="Product categories">{productCategories.map((category) => category.slug === "pollution-control" ? <Link className="filter-category-link" key={category.slug} href="/products/pollution-control">{category.name} →</Link> : <span key={category.slug}>{category.name}</span>)}</div><div className="three-grid">{products.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
  </main>;
}
