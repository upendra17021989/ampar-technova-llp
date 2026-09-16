import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders every approved About section and anchor", () => {
    const { container } = render(<AboutPage />);
    expect(container.querySelector("#who-we-are")).toBeInTheDocument();
    expect(container.querySelector("#our-group")).toBeInTheDocument();
    expect(container.querySelector("#our-vision")).toBeInTheDocument();
    expect(container.querySelector("#our-mission")).toBeInTheDocument();
    expect(container.querySelector("#why-ampar")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Your Reliable Engineering Partner/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Engineering Excellence" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quality Assurance" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What We Stand For" })).toBeInTheDocument();
    expect(screen.getByText("Continuous Improvement")).toBeInTheDocument();
  });
});
