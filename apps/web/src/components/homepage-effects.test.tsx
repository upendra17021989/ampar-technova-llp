import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomepageEffects } from "./homepage-effects";

describe("HomepageEffects", () => {
  it("keeps content visible and avoids observers for reduced motion", () => {
    Object.defineProperty(window, "matchMedia", { configurable: true, value: vi.fn().mockReturnValue({ matches: true }) });
    const observe = vi.fn();
    Object.defineProperty(window, "IntersectionObserver", { configurable: true, value: vi.fn(() => ({ observe, disconnect: vi.fn(), unobserve: vi.fn() })) });
    const { container } = render(<><div className="home-hero-content">Content</div><HomepageEffects /></>);
    expect(container.querySelector(".home-hero-content")).toHaveClass("is-revealed");
    expect(observe).not.toHaveBeenCalled();
    expect(document.documentElement).not.toHaveClass("motion-ready");
  });
});
