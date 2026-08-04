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
    expect(screen.getByRole("heading", { name: /Engineering Excellence Built on Innovation/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "We Offer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Core Strengths" })).toBeInTheDocument();
    expect(screen.getByText("Customized Engineering Solutions")).toBeInTheDocument();
    expect(screen.getByText("Continuous Innovation")).toBeInTheDocument();
  });
});
