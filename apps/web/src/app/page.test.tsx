import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("presents the primary value proposition and quote action", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /Engineering Tomorrow's Corrosion-Resistant Solutions/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Request a Quote/i })).not.toHaveLength(0);
    expect(screen.getAllByText("FRP Engineering")).not.toHaveLength(0);
    expect(screen.getAllByText("Dual Laminate")).not.toHaveLength(0);
  });
});
