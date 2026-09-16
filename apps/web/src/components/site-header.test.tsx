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

  it("exposes the three technology submenus and the dedicated capabilities page", () => {
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: /Technologies/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "FRP Engineering" })).toHaveAttribute("href", "/technologies/frp-engineering");
    expect(screen.getByRole("link", { name: "Thermoplastic Fabrication" })).toHaveAttribute("href", "/technologies/thermoplastic-fabrication");
    expect(screen.getByRole("link", { name: "Dual Laminate Technology" })).toHaveAttribute("href", "/technologies/dual-laminate-technology");
    expect(screen.getByRole("link", { name: "Capabilities" })).toHaveAttribute("href", "/capabilities");
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
    expect(screen.getByText("Technova LLP")).toBeInTheDocument();
  });
});
