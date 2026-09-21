import { act, render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LogoIntro } from "./logo-intro";

describe("LogoIntro", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.sessionStorage.clear();
    Object.defineProperty(window, "matchMedia", { configurable: true, value: vi.fn().mockReturnValue({ matches: false }) });
  });

  afterEach(() => { vi.useRealTimers(); document.body.className = ""; });

  it("runs once per session and removes itself after the sequence", () => {
    const first = render(<LogoIntro />);
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByText("AMPAR TECHNOVA")).toBeInTheDocument();
    expect(document.body).toHaveClass("intro-active");
    act(() => vi.advanceTimersByTime(2300));
    expect(screen.queryByText("AMPAR TECHNOVA")).not.toBeInTheDocument();
    first.unmount();
    render(<LogoIntro />);
    act(() => vi.runAllTimers());
    expect(screen.queryByText("AMPAR TECHNOVA")).not.toBeInTheDocument();
  });

  it("does not run when reduced motion is requested", () => {
    vi.mocked(window.matchMedia).mockReturnValue({ matches: true } as MediaQueryList);
    render(<LogoIntro />);
    act(() => vi.runAllTimers());
    expect(screen.queryByText("AMPAR TECHNOVA")).not.toBeInTheDocument();
  });

  it("survives Strict Mode and releases the entrance when the curtain opens", () => {
    const reveal = vi.fn();
    window.addEventListener("ampar:intro-reveal", reveal);
    const view = render(<StrictMode><LogoIntro /></StrictMode>);
    act(() => vi.advanceTimersByTime(1251));
    expect(reveal).toHaveBeenCalledTimes(1);
    expect(screen.getByText("AMPAR TECHNOVA")).toBeInTheDocument();
    view.unmount();
    expect(document.body).not.toHaveClass("intro-active");
    window.removeEventListener("ampar:intro-reveal", reveal);
  });
});
