"use client";

import { useEffect, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
const SESSION_KEY = "ampar-admin-session";
type Summary = { visitsLast30Days: number; uniqueVisitorsLast30Days: number; visitsToday: number; topPages: { path: string; visits: number }[] };

export function AdminAnalytics() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    let active = true;
    const load = () => {
      const credential = window.sessionStorage.getItem(SESSION_KEY);
      if (!credential || summary) return;
      fetch(`${API_URL}/api/admin/analytics/summary`, { headers: { Authorization: credential }, cache: "no-store" })
        .then((response) => response.ok ? response.json() as Promise<Summary> : Promise.reject())
        .then((result) => { if (active) setSummary(result); })
        .catch(() => undefined);
    };
    load();
    const timer = window.setInterval(load, 1000);
    return () => { active = false; window.clearInterval(timer); };
  }, [summary]);

  if (!summary) return null;
  return <section className="analytics-panel" aria-label="Visitor analytics">
    <div className="analytics-heading"><div><p className="eyebrow dark">Last 30 days</p><h2>Website visitors</h2></div><p>Anonymous, first-party analytics</p></div>
    <div className="analytics-stats"><div><strong>{summary.visitsToday}</strong><span>Visits today</span></div><div><strong>{summary.visitsLast30Days}</strong><span>Page views</span></div><div><strong>{summary.uniqueVisitorsLast30Days}</strong><span>Unique visitors</span></div></div>
    <div className="analytics-pages"><h3>Most visited pages</h3>{summary.topPages.length ? <ol>{summary.topPages.map((page) => <li key={page.path}><span>{page.path}</span><strong>{page.visits}</strong></li>)}</ol> : <p>No visits recorded yet.</p>}</div>
  </section>;
}
