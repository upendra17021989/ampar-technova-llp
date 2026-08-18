"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
const SESSION_KEY = "ampar-admin-session";
const statuses = ["NEW", "ASSIGNED", "CONTACTED", "QUALIFIED", "QUOTED", "WON", "LOST", "CLOSED"] as const;
type Status = (typeof statuses)[number];
type Enquiry = { id: string; referenceNumber: string; enquiryType: string; name: string; company: string; email: string; phone: string; country: string | null; productSlug: string | null; industry: string | null; message: string; status: Status; createdAt: string; updatedAt: string };

export function AdminEnquiryDetail({ id }: { id: string }) {
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const credential = window.sessionStorage.getItem(SESSION_KEY);
    if (!credential) {
      const timer = window.setTimeout(() => { if (active) { setError("Please sign in to view this enquiry."); setLoading(false); } }, 0);
      return () => { active = false; window.clearTimeout(timer); };
    }
    fetch(`${API_URL}/api/admin/enquiries/${id}`, { headers: { Authorization: credential }, cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) throw new Error("Your administrator session has expired. Please sign in again.");
        if (!response.ok) throw new Error("The enquiry could not be loaded.");
        const result = await response.json() as Enquiry;
        if (active) setEnquiry(result);
      })
      .catch((requestError: unknown) => { if (active) setError(requestError instanceof Error ? requestError.message : "The enquiry could not be loaded."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  async function updateStatus(status: Status) {
    if (!enquiry) return;
    const credential = window.sessionStorage.getItem(SESSION_KEY) ?? "";
    const response = await fetch(`${API_URL}/api/admin/enquiries/${enquiry.id}/status`, { method: "PATCH", headers: { Authorization: credential, "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (!response.ok) { setError("The enquiry status could not be updated."); return; }
    setError(""); setEnquiry(await response.json() as Enquiry);
  }

  return <>
    <div className="admin-heading"><p className="eyebrow dark">Internal workspace</p><h1>Quote details</h1><Link className="admin-back" href="/admin">← Back to enquiries</Link></div>
    {loading ? <p role="status">Loading quote details…</p> : null}
    {error ? <div><p className="admin-error" role="alert">{error}</p>{!enquiry ? <Link className="button button-primary" href="/admin">Administrator sign in</Link> : null}</div> : null}
    {enquiry ? <article className="admin-detail admin-detail-page"><div className="admin-detail-heading"><div><p className="eyebrow dark">{enquiry.enquiryType}</p><h2>{enquiry.referenceNumber}</h2></div><label><span>Status</span><select aria-label="Enquiry status" value={enquiry.status} onChange={(event) => void updateStatus(event.target.value as Status)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label></div><dl className="admin-fields"><div><dt>Contact</dt><dd>{enquiry.name}</dd></div><div><dt>Company</dt><dd>{enquiry.company}</dd></div><div><dt>Email</dt><dd><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></dd></div><div><dt>Phone</dt><dd><a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a></dd></div><div><dt>Country</dt><dd>{enquiry.country ?? "Not specified"}</dd></div><div><dt>Product</dt><dd>{enquiry.productSlug ?? "Not specified"}</dd></div><div><dt>Industry</dt><dd>{enquiry.industry ?? "Not specified"}</dd></div><div><dt>Submitted</dt><dd>{new Date(enquiry.createdAt).toLocaleString()}</dd></div><div className="admin-message"><dt>Requirement</dt><dd>{enquiry.message}</dd></div></dl></article> : null}
  </>;
}
