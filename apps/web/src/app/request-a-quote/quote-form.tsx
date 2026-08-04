"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { industries, products } from "@/content/catalogue";

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080").replace(/\/$/, "");

type EnquiryResponse = {
  referenceNumber: string;
  status: "NEW";
  submittedAt: string;
};

type ApiError = {
  message?: string;
  fieldErrors?: Record<string, string>;
};

export function QuoteForm() {
  const params = useSearchParams();
  const selected = params.get("product") ?? "";
  const validSelectedProduct = products.some((product) => product.slug === selected) ? selected : "";
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true);
    setNotice("");
    setError("");

    const payload = {
      enquiryType: "QUOTE",
      name: String(formData.get("name") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      country: String(formData.get("country") ?? "").trim() || null,
      productSlug: String(formData.get("productSlug") ?? "").trim() || null,
      industry: String(formData.get("industry") ?? "").trim() || null,
      message: String(formData.get("message") ?? "").trim(),
      consentGiven: formData.get("consentGiven") === "on",
    };

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const apiError = await response.json().catch(() => ({})) as ApiError;
        const fieldMessage = apiError.fieldErrors ? Object.values(apiError.fieldErrors)[0] : undefined;
        throw new Error(fieldMessage ?? apiError.message ?? "Your quote request could not be submitted.");
      }

      const result = await response.json() as EnquiryResponse;
      form.reset();
      setNotice(`Thank you. Your quote request has been submitted. Reference: ${result.referenceNumber}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Your quote request could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="quote-form" onSubmit={submitQuote}>
      <div className="form-heading"><span>Technical quote request</span><h2>Your requirement</h2><p>Fields marked Required must be completed.</p></div>
      <div className="field-grid">
        <label><span>Name <b>Required</b></span><input name="name" autoComplete="name" maxLength={120} required /></label>
        <label><span>Company <b>Required</b></span><input name="company" autoComplete="organization" maxLength={180} required /></label>
        <label><span>Email <b>Required</b></span><input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
        <label><span>Phone <b>Required</b></span><input name="phone" type="tel" autoComplete="tel" maxLength={40} required /></label>
        <label><span>Country</span><input name="country" autoComplete="country-name" maxLength={100} /></label>
        <label><span>Industry</span><select name="industry" defaultValue=""><option value="">Select an industry</option>{industries.map((industry) => <option key={industry.slug} value={industry.name}>{industry.name}</option>)}</select></label>
        <label className="field-wide"><span>Product or equipment</span><select name="productSlug" defaultValue={validSelectedProduct}><option value="">Select a product</option>{products.map((product) => <option key={product.slug} value={product.slug}>{product.name}</option>)}</select></label>
        <label className="field-wide"><span>Requirement summary <b>Required</b></span><textarea name="message" rows={5} minLength={10} maxLength={5000} required placeholder="Include capacity, chemical, concentration, temperature, pressure and project location where known." /></label>
      </div>
      <label className="consent"><input name="consentGiven" type="checkbox" required /><span>I agree that AMPAR may use this information to respond to my enquiry. <b>Required</b></span></label>
      <button className="button button-primary" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit Quote Request"}</button>
      {notice ? <p className="form-notice" role="status" aria-live="polite">{notice}</p> : null}
      {error ? <p className="admin-error quote-error" role="alert">{error}</p> : null}
    </form>
  );
}
