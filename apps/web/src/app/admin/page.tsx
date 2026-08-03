import type { Metadata } from "next";
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
        </div>
        <AdminEnquiryManager />
      </div>
    </main>
  );
}
