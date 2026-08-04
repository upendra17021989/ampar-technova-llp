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

  it("exposes locations and contact routes", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Locations" })).toHaveAttribute("href", "/locations");
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact");
  });

  it("toggles the About Us section navigation", () => {
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: /About Us/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Who We Are" })).toHaveAttribute("href", "/about#who-we-are");
    expect(screen.getByRole("link", { name: "Why AMPAR" })).toHaveAttribute("href", "/about#why-ampar");
  });

  it("uses the full company name in the brand", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "AMPAR Technova LLP home" })).toBeInTheDocument();
    expect(screen.getByAltText("AMPAR Technova LLP")).toBeInTheDocument();
  });
});
