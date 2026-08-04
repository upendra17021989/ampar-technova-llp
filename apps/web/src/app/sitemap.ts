import type { MetadataRoute } from "next";
import { products } from "@/content/catalogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ampartechnova.com";
  const routes = ["", "/about", "/products", "/materials", "/industries", "/locations", "/contact", "/request-a-quote"];
  return [...routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })), ...products.map((product) => ({ url: `${baseUrl}/products/${product.slug}`, changeFrequency: "monthly" as const, priority: 0.7 }))];
}
