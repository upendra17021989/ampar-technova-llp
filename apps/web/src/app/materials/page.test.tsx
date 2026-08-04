import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MaterialsPage from "./page";

describe("MaterialsPage", () => {
  it("presents the requested material families and review warning", () => {
    const { container } = render(<MaterialsPage />);
    expect(container.querySelector("#thermosets")).toBeInTheDocument();
    expect(container.querySelector("#thermoplastics")).toBeInTheDocument();
    expect(container.querySelector("#applications")).toBeInTheDocument();
    expect(container.querySelector("#dual-laminate")).toBeInTheDocument();
    expect(screen.getAllByText(/Engineering review required/i)).toHaveLength(2);
    expect(screen.getByRole("heading", { name: /The best of two technologies/i })).toBeInTheDocument();
    expect(screen.getByText("1. Thermoset Plastics")).toBeInTheDocument();
    expect(screen.getByText("2. Thermoplastics")).toBeInTheDocument();
    expect(screen.getByText("3. Dual Laminate Technology")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Inner Liner" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outer Structure" })).toBeInTheDocument();
    expect(screen.getByText("Pressure Equipment")).toBeInTheDocument();
  });
});
