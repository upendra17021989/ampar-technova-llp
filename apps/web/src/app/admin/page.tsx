import type { Metadata } from "next";
import Link from "next/link";
import { AdminEnquiryManager } from "./admin-enquiry-manager";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main id="main-content" className="admin-page">
      <div className="shell admin-shell">
        <div className="admin-heading">
          <p className="eyebrow dark">Internal workspace</p>
          <h1>Enquiry administration</h1>
          <p>Review incoming requests and move qualified opportunities through the sales workflow.</p>
          <nav className="admin-nav" aria-label="Administration">
            <Link className="is-active" href="/admin">Enquiries</Link>
            <Link href="/admin/analytics">Analytics</Link>
          </nav>
        </div>
        <AdminEnquiryManager />
      </div>
    </main>
  );
}
