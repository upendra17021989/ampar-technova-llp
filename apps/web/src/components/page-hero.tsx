import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: { label: string; href: string };
  className?: string;
};

export function PageHero({ eyebrow, title, description, action, className }: PageHeroProps) {
  return (
    <section className={`page-hero editorial-page-hero${className ? ` ${className}` : ""}`}>
      <div className="shell editorial-page-hero-grid">
        <div><p className="eyebrow">{eyebrow}</p><span className="hero-index" aria-hidden="true">AMPAR / INDUSTRIAL ENGINEERING</span></div>
        <div><h1>{title}</h1><p className="lead">{description}</p>{action ? <Link className="button button-primary" href={action.href}>{action.label} <span aria-hidden="true">→</span></Link> : null}</div>
      </div>
    </section>
  );
}
