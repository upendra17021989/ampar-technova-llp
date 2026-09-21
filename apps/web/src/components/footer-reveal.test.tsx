import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FooterReveal } from "./footer-reveal";

vi.mock("next/navigation", () => ({ usePathname: () => "/materials" }));

describe("FooterReveal", () => {
  let top: number;
  let height: number;
  let matches: boolean;

  beforeEach(() => {
    top = 700;
    height = 1200;
    matches = true;
    vi.useFakeTimers();
    vi.stubGlobal("innerHeight", 900);
    vi.stubGlobal("matchMedia", () => ({ get matches() { return matches; }, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => window.setTimeout(() => callback(0), 16));
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(window.clearTimeout);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
      return { top: this.classList.contains("footer-reveal") ? top : 0, height: 88 } as DOMRect;
    });
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockImplementation(() => height);
  });

  afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.useRealTimers(); });

  function mount() {
    return render(<><header data-site-header /><FooterReveal><footer className="site-footer"><a href="/contact">Contact</a></footer></FooterReveal></>);
  }

  function scrollTo(nextTop: number) {
    top = nextTop;
    fireEvent.scroll(window);
    act(() => vi.advanceTimersByTime(20));
  }

  it("holds the tall footer behind the page, then releases it so the bottom remains reachable", () => {
    const view = mount();
    const region = view.container.querySelector<HTMLElement>(".footer-reveal")!;
    expect(region).toHaveClass("footer-reveal-active");
    expect(top + parseFloat(region.style.getPropertyValue("--footer-reveal-y"))).toBe(88);
    scrollTo(400);
    expect(top + parseFloat(region.style.getPropertyValue("--footer-reveal-y"))).toBe(88);
    scrollTo(0);
    expect(region.style.getPropertyValue("--footer-reveal-y")).toBe("0px");
    scrollTo(-300);
    expect(region.style.getPropertyValue("--footer-reveal-y")).toBe("0px");
  });

  it("aligns a short footer with the bottom of the viewport", () => {
    height = 400;
    const view = mount();
    const region = view.container.querySelector<HTMLElement>(".footer-reveal")!;
    expect(top + parseFloat(region.style.getPropertyValue("--footer-reveal-y")) + height).toBe(900);
  });

  it("keeps the footer in normal flow for mobile and reduced motion", () => {
    matches = false;
    const view = mount();
    const region = view.container.querySelector<HTMLElement>(".footer-reveal")!;
    expect(region).not.toHaveClass("footer-reveal-active");
    expect(region.style.getPropertyValue("--footer-reveal-y")).toBe("");
  });
});
