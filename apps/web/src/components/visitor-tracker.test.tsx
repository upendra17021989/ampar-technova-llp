import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isLocalHostname, VisitorTracker } from "./visitor-tracker";

vi.mock("next/navigation", () => ({ usePathname: () => "/products" }));

describe("VisitorTracker", () => {
  beforeEach(() => window.sessionStorage.clear());
  afterEach(() => { cleanup(); vi.restoreAllMocks(); });

  it.each(["localhost", "shop.localhost", "127.0.0.1", "::1", "[::1]"])("recognizes %s as local", (hostname) => {
    expect(isLocalHostname(hostname)).toBe(true);
  });

  it("does not send analytics from localhost", () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    render(<VisitorTracker />);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(window.sessionStorage.getItem("ampar-visitor-session")).toBeNull();
  });
});
