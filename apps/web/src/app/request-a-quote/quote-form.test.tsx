import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { QuoteForm } from "./quote-form";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("product=frp-storage-tanks"),
}));

describe("QuoteForm", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("preselects a valid product passed from a product page", () => {
    render(<QuoteForm />);
    expect(screen.getByRole("combobox", { name: /product or equipment/i })).toHaveValue("frp-storage-tanks");
  });

  it("submits the complete quote payload and displays its reference", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      referenceNumber: "AMP-20260804-ABCDEF12",
      status: "NEW",
      submittedAt: "2026-08-04T05:00:00Z",
    }), { status: 201, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);
    render(<QuoteForm />);

    fireEvent.change(screen.getByLabelText(/name required/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/company required/i), { target: { value: "Example Company" } });
    fireEvent.change(screen.getByLabelText(/email required/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/phone required/i), { target: { value: "+91 99999 99999" } });
    fireEvent.change(screen.getByLabelText(/^country$/i), { target: { value: "India" } });
    fireEvent.change(screen.getByLabelText(/^industry$/i), { target: { value: "Chemical Processing" } });
    fireEvent.change(screen.getByLabelText(/requirement summary required/i), { target: { value: "FRP tank enquiry for chemical storage" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Submit Quote Request" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [, request] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(String(request.body))).toMatchObject({
      enquiryType: "QUOTE",
      name: "Test User",
      company: "Example Company",
      country: "India",
      industry: "Chemical Processing",
      productSlug: "frp-storage-tanks",
      consentGiven: true,
    });
    expect(await screen.findByRole("status")).toHaveTextContent("AMP-20260804-ABCDEF12");
  });

  it("shows backend validation errors without claiming success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      code: "VALIDATION_FAILED",
      message: "The request contains invalid fields",
      fieldErrors: { message: "Requirement summary is invalid" },
    }), { status: 400, headers: { "Content-Type": "application/json" } })));
    render(<QuoteForm />);

    const form = screen.getByRole("button", { name: "Submit Quote Request" }).closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(await screen.findByRole("alert")).toHaveTextContent("Requirement summary is invalid");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
