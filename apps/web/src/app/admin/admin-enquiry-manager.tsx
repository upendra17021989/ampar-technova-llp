"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
const SESSION_KEY = "ampar-admin-session";
const statuses = ["NEW", "ASSIGNED", "CONTACTED", "QUALIFIED", "QUOTED", "WON", "LOST", "CLOSED"] as const;

type Status = (typeof statuses)[number];
type Enquiry = {
  id: string;
  referenceNumber: string;
  enquiryType: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string | null;
  productSlug: string | null;
  industry: string | null;
  message: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
};
type EnquiryPage = { content: Enquiry[]; totalElements: number; totalPages: number; number: number };

export function AdminEnquiryManager() {
  const [auth, setAuth] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [filter, setFilter] = useState<Status | "">("");
  const [data, setData] = useState<EnquiryPage | null>(null);
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const restore = window.setTimeout(() => {
      setAuth(window.sessionStorage.getItem(SESSION_KEY) ?? "");
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  const loadEnquiries = useCallback(async (credential: string, selectedFilter: Status | "" = "") => {
    setLoading(true);
    setError("");
    try {
      const query = selectedFilter ? `?status=${selectedFilter}` : "";
      const response = await fetch(`${API_URL}/api/admin/enquiries${query}`, {
        headers: { Authorization: credential },
        cache: "no-store",
      });
      if (response.status === 401 || response.status === 403) throw new Error("Invalid administrator credentials.");
      if (!response.ok) throw new Error("The administration API is unavailable. Please try again.");
      setData((await response.json()) as EnquiryPage);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to load enquiries.");
      if (requestError instanceof Error && requestError.message.startsWith("Invalid")) {
        window.sessionStorage.removeItem(SESSION_KEY);
        setAuth("");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!auth || data) return;
    let active = true;
    fetch(`${API_URL}/api/admin/enquiries`, { headers: { Authorization: auth }, cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401 || response.status === 403) throw new Error("Invalid administrator credentials.");
        if (!response.ok) throw new Error("The administration API is unavailable. Please try again.");
        const page = (await response.json()) as EnquiryPage;
        if (active) setData(page);
      })
      .catch((requestError: unknown) => {
        if (!active) return;
        setError(requestError instanceof Error ? requestError.message : "Unable to load enquiries.");
        if (requestError instanceof Error && requestError.message.startsWith("Invalid")) {
          window.sessionStorage.removeItem(SESSION_KEY);
          setAuth("");
        }
      });
    return () => { active = false; };
  }, [auth, data]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 401 || response.status === 403) throw new Error("Invalid administrator credentials.");
      if (!response.ok) throw new Error("The administration API is unavailable. Please try again.");
      const session = await response.json() as { token: string };
      const credential = `Bearer ${session.token}`;
      window.sessionStorage.setItem(SESSION_KEY, credential);
      setAuth(credential);
      setPassword("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    if (auth) {
      await fetch(`${API_URL}/api/admin/auth/logout`, { method: "POST", headers: { Authorization: auth } }).catch(() => undefined);
    }
    window.sessionStorage.removeItem(SESSION_KEY);
    setAuth("");
    setData(null);
    setSelected(null);
  }

  async function updateStatus(enquiry: Enquiry, status: Status) {
    setError("");
    const response = await fetch(`${API_URL}/api/admin/enquiries/${enquiry.id}/status`, {
      method: "PATCH",
      headers: { Authorization: auth, "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      setError("The enquiry status could not be updated.");
      return;
    }
    const updated = (await response.json()) as Enquiry;
    setSelected(updated);
    setData((current) => current ? { ...current, content: current.content.map((item) => item.id === updated.id ? updated : item) } : current);
  }

  if (!auth) {
    return (
      <form className="admin-login" onSubmit={signIn}>
        <h2>Administrator sign in</h2>
        <p>Use the credentials configured on the API server.</p>
        <label><span>Username</span><input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /></label>
        <label><span>Password</span><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        <button className="button button-primary" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
        {error ? <p className="admin-error" role="alert">{error}</p> : null}
      </form>
    );
  }

  return (
    <section className="admin-workspace" aria-label="Enquiry management">
      <div className="admin-toolbar">
        <div><strong>{data?.totalElements ?? 0}</strong><span> enquiries found</span></div>
        <label><span>Status</span><select value={filter} onChange={(event) => { const value = event.target.value as Status | ""; setFilter(value); void loadEnquiries(auth, value); }}><option value="">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
        <button className="button admin-secondary" type="button" onClick={() => void signOut()}>Sign out</button>
      </div>
      {error ? <p className="admin-error" role="alert">{error}</p> : null}
      {loading ? <p role="status">Loading enquiries…</p> : null}
      {!loading && data?.content.length === 0 ? <p className="admin-empty">No enquiries match this filter.</p> : null}
      <div className="admin-grid">
        <div className="admin-list" aria-label="Enquiries">
          {data?.content.map((enquiry) => (
            <button key={enquiry.id} type="button" className={`admin-list-item${selected?.id === enquiry.id ? " is-active" : ""}`} onClick={() => setSelected(enquiry)}>
              <span className="admin-list-top"><strong>{enquiry.referenceNumber}</strong><span className={`status status-${enquiry.status.toLowerCase()}`}>{enquiry.status}</span></span>
              <span>{enquiry.name} · {enquiry.company}</span>
              <small>{new Date(enquiry.createdAt).toLocaleString()}</small>
            </button>
          ))}
        </div>
        <div className="admin-detail">
          {selected ? <EnquiryDetail enquiry={selected} onStatusChange={(status) => void updateStatus(selected, status)} /> : <p>Select an enquiry to review its complete details.</p>}
        </div>
      </div>
    </section>
  );
}

function EnquiryDetail({ enquiry, onStatusChange }: { enquiry: Enquiry; onStatusChange: (status: Status) => void }) {
  return <article><div className="admin-detail-heading"><div><p className="eyebrow dark">{enquiry.enquiryType}</p><h2>{enquiry.referenceNumber}</h2></div><label><span>Status</span><select aria-label="Enquiry status" value={enquiry.status} onChange={(event) => onStatusChange(event.target.value as Status)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label></div><dl className="admin-fields"><div><dt>Contact</dt><dd>{enquiry.name}</dd></div><div><dt>Company</dt><dd>{enquiry.company}</dd></div><div><dt>Email</dt><dd><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a></dd></div><div><dt>Phone</dt><dd><a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a></dd></div><div><dt>Product</dt><dd>{enquiry.productSlug ?? "Not specified"}</dd></div><div><dt>Industry</dt><dd>{enquiry.industry ?? "Not specified"}</dd></div><div className="admin-message"><dt>Requirement</dt><dd>{enquiry.message}</dd></div></dl></article>;
}
