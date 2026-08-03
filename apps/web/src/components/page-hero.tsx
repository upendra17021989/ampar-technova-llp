import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: { label: string; href: string };
};

export function PageHero({ eyebrow, title, description, action }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {action ? <Link className="button button-primary" href={action.href}>{action.label}</Link> : null}
      </div>
    </section>
  );
}
