import { act, render, screen } from "@testing-library/react";
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
    act(() => vi.advanceTimersByTime(2100));
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
});
