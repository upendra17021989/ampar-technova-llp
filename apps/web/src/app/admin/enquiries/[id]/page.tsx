import type { Metadata } from "next";
import { AdminEnquiryDetail } from "./admin-enquiry-detail";

export const metadata: Metadata = { title: "Quote details | Administration", robots: { index: false, follow: false } };

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <main id="main-content" className="admin-page"><div className="shell admin-shell"><AdminEnquiryDetail id={id} /></div></main>;
}
