import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="AMPAR Technova home">
            AMPAR TECHNOVA
          </Link>
          <Link className="primary-action" href="/request-a-quote">
            Request a Quote
          </Link>
        </div>
      </header>
      <main id="main-content">
        <section className="hero" aria-labelledby="home-heading">
          <div className="shell hero-copy">
            <div className="eyebrow">Corrosion-resistant engineering solutions</div>
            <h1 id="home-heading">Engineering Tomorrow&apos;s Corrosion-Resistant Solutions</h1>
            <p className="lead">
              Advanced thermoplastics, FRP, dual-laminate technology and process equipment for demanding industrial applications.
            </p>
            <div className="hero-actions">
              <Link className="primary-action" href="/request-a-quote">
                Request a Quote
              </Link>
              <Link className="secondary-action" href="/products">
                Explore Products
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
