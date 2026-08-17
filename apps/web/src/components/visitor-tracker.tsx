"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");
const SESSION_KEY = "ampar-visitor-session";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || navigator.doNotTrack === "1") return;
    let sessionId = window.sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      window.sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    void fetch(`${API_URL}/api/analytics/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer || null, sessionId }),
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
