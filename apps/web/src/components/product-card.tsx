import Link from "next/link";
import type { Product } from "@/content/catalogue";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card product-card">
      <p className="card-kicker">{product.category}</p>
      <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
      <p>{product.summary}</p>
      <ul className="tag-list" aria-label="Available materials">
        {product.materials.map((material) => <li key={material}>{material}</li>)}
      </ul>
      <Link className="text-link" href={`/products/${product.slug}`}>View product <span aria-hidden="true">→</span></Link>
    </article>
  );
}
