import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  afterEach(cleanup);

  it("exposes and toggles the mobile navigation state", () => {
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: /menu/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toHaveClass("is-open");
  });

  it("uses native hash navigation for homepage sections", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Technologies" })).toHaveAttribute("href", "/#technologies");
    expect(screen.getByRole("link", { name: "Capabilities" })).toHaveAttribute("href", "/#capabilities");
  });
});
