"use client";

import { useEffect, useState } from "react";

const sessionKey = "ampar-intro-seen";

export function LogoIntro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    try { if (window.sessionStorage.getItem(sessionKey)) return; } catch { /* Storage is optional. */ }
    document.body.classList.add("intro-active");
    const showTimer = window.setTimeout(() => setVisible(true), 0);
    const leaveTimer = window.setTimeout(() => {
      setLeaving(true);
      try { window.sessionStorage.setItem(sessionKey, "true"); } catch { /* Storage is optional. */ }
      window.dispatchEvent(new Event("ampar:intro-reveal"));
    }, 1250);
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.classList.remove("intro-active");
    }, 2170);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove("intro-active");
    };
  }, []);

  if (!visible) return null;
  return (
    <div className={`logo-intro reference-intro${leaving ? " is-leaving" : ""}`} aria-hidden="true">
      <div className="intro-curtain intro-curtain-accent" />
      <div className="intro-curtain intro-curtain-ink">
      <div className="logo-intro-mark">
        <svg viewBox="0 0 240 150" role="presentation"><path d="M24 127 82 23h76l58 104h-50l-13-25H87l-13 25H24Zm80-59-10 19h52l-10-19h-32Z" /><path d="M82 23 43 92h30l31-55h32l31 55h30l-39-69H82Z" /></svg>
        <span>AMPAR TECHNOVA</span>
      </div>
      <div className="logo-intro-line"><i /></div>
      <p>Engineering corrosion resistance</p>
      </div>
    </div>
  );
}
