import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AdminEnquiryManager } from "./admin-enquiry-manager";

const enquiry = {
  id: "80bd6982-5b84-48fb-b548-0f387b1ec53b",
  referenceNumber: "AMP-20260803-ABCDEF12",
  enquiryType: "QUOTE",
  name: "Example User",
  company: "Example Industries",
  email: "user@example.com",
  phone: "+91 99999 99999",
  country: "India",
  productSlug: "frp-storage-tanks",
  industry: "Chemical Processing",
  message: "Please review this requirement.",
  status: "NEW",
  createdAt: "2026-08-03T07:00:00Z",
  updatedAt: "2026-08-03T07:00:00Z",
};

describe("AdminEnquiryManager", () => {
  beforeEach(() => window.sessionStorage.clear());
  afterEach(() => { cleanup(); vi.restoreAllMocks(); });

  it("authenticates and displays an enquiry", async () => {
    vi.stubGlobal("fetch", vi.fn()
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ token: "opaque-session-token" }) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ content: [enquiry], totalElements: 1, totalPages: 1, number: 0 }) }));
    render(<AdminEnquiryManager />);
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(await screen.findByText("AMP-20260803-ABCDEF12")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/api/admin/auth/login"), expect.objectContaining({ method: "POST" }));
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/api/admin/enquiries"), expect.objectContaining({ headers: expect.objectContaining({ Authorization: "Bearer opaque-session-token" }) }));
  });

  it("returns to login when credentials are rejected", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401 }));
    render(<AdminEnquiryManager />);
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "wrong" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in" }));
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Invalid administrator credentials"));
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("restores a session only after the initial hydrated render", async () => {
    window.sessionStorage.setItem("ampar-admin-session", "Bearer stored-token");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ content: [enquiry], totalElements: 1, totalPages: 1, number: 0 }) }));
    render(<AdminEnquiryManager />);
    expect(await screen.findByText("AMP-20260803-ABCDEF12")).toBeInTheDocument();
  });
});
