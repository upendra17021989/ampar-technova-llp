import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

describe("ContactPage", () => {
  it("shows company registration and founder contact details", () => {
    render(<ContactPage />);
    expect(screen.getByText("ACX-8187")).toBeInTheDocument();
    expect(screen.getByText("24ACOFA1924D1ZR")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Parshuram Singh" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Amarsingh Rajpurohit" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "amar@ampartechnova.com" })).toHaveAttribute("href", "mailto:amar@ampartechnova.com");
  });
});
