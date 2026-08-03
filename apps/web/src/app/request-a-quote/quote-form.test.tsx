import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuoteForm } from "./quote-form";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("product=frp-storage-tanks"),
}));

describe("QuoteForm", () => {
  afterEach(cleanup);

  it("preselects a product passed from a product page", () => {
    render(<QuoteForm />);
    expect(screen.getByRole("combobox", { name: /product or equipment/i })).toHaveValue("frp-storage-tanks");
  });

  it("does not imply that the interface-only form has sent an enquiry", () => {
    render(<QuoteForm />);
    fireEvent.change(screen.getByLabelText(/name required/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/company required/i), { target: { value: "Example Company" } });
    fireEvent.change(screen.getByLabelText(/email required/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/phone required/i), { target: { value: "+91 99999 99999" } });
    fireEvent.change(screen.getByLabelText(/requirement summary required/i), { target: { value: "FRP tank enquiry" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(screen.getByRole("status")).toHaveTextContent(/secure submission will be connected/i);
  });
});
