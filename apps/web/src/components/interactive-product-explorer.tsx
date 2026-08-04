"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/content/catalogue";

const ALL = "All solutions";

export function InteractiveProductExplorer({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const categories = useMemo(() => [ALL, ...Array.from(new Set(products.map((product) => product.category)))], [products]);
  const visibleProducts = activeCategory === ALL ? products.slice(0, 6) : products.filter((product) => product.category === activeCategory);

  useEffect(() => {
    const updateBackToTop = () => setShowBackToTop(window.scrollY > 600);
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    return () => window.removeEventListener("scroll", updateBackToTop);
  }, []);

  return <>
    <div className="product-explorer" aria-label="Filter featured products">
      <div className="explorer-tabs" role="group" aria-label="Product categories">
        {categories.map((category) => <button className={activeCategory === category ? "explorer-tab is-active" : "explorer-tab"} type="button" key={category} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
      </div>
      <p className="explorer-result" aria-live="polite">Showing {visibleProducts.length} {visibleProducts.length === 1 ? "solution" : "solutions"}</p>
      <div className="three-grid explorer-grid">{visibleProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
    </div>
    <button className={showBackToTop ? "back-to-top is-visible" : "back-to-top"} type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span aria-hidden="true">↑</span></button>
  </>;
}
