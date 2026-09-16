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
    <section className={`page-hero${className ? ` ${className}` : ""}`}>
      <div className="shell narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {action ? <Link className="button button-primary" href={action.href}>{action.label}</Link> : null}
      </div>
    </section>
  );
}
