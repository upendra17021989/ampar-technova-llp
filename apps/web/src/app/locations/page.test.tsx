import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LocationsPage from "./page";

describe("LocationsPage", () => {
  it("lists both AMPAR locations with contact and map access", () => {
    render(<LocationsPage />);
    expect(screen.getByRole("heading", { name: "Registered Office & Unit 1" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Manufacturing Unit 2" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "View on Google Maps" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "Sales@ampartechnova.com" })).toHaveLength(2);
    expect(screen.getByTitle("Registered Office & Unit 1, Ankleshwar map")).toHaveAttribute("src", expect.stringContaining("output=embed"));
    expect(screen.getByTitle("Manufacturing Unit 2, Dahej map")).toHaveAttribute("loading", "lazy");
  });
});
