import type { Metadata } from "next";
import Link from "next/link";
import { AdminAnalytics } from "../admin-analytics";

export const metadata: Metadata = { title: "Visitor analytics | Administration", robots: { index: false, follow: false } };

export default function AnalyticsPage() {
  return <main id="main-content" className="admin-page"><div className="shell admin-shell">
    <div className="admin-heading"><p className="eyebrow dark">Internal workspace</p><h1>Visitor analytics</h1><p>Review anonymous, first-party website traffic.</p>
      <nav className="admin-nav" aria-label="Administration"><Link href="/admin">Enquiries</Link><Link className="is-active" href="/admin/analytics">Analytics</Link></nav>
    </div>
    <AdminAnalytics />
  </div></main>;
}
