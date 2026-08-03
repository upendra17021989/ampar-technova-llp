"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { products } from "@/content/catalogue";

export function QuoteForm() {
  const params = useSearchParams();
  const [notice, setNotice] = useState("");
  const selected = params.get("product") ?? "";

  return <form className="quote-form" onSubmit={(event) => { event.preventDefault(); setNotice("The quote interface is ready. Secure submission will be connected during backend development."); }}><div className="form-heading"><span>Step 1 of 4</span><h2>Your requirement</h2><p>Fields marked Required must be completed.</p></div><div className="field-grid"><label><span>Name <b>Required</b></span><input name="name" autoComplete="name" required /></label><label><span>Company <b>Required</b></span><input name="company" autoComplete="organization" required /></label><label><span>Email <b>Required</b></span><input name="email" type="email" autoComplete="email" required /></label><label><span>Phone <b>Required</b></span><input name="phone" type="tel" autoComplete="tel" required /></label><label className="field-wide"><span>Product or equipment</span><select name="product" defaultValue={selected}><option value="">Select a product</option>{products.map((product) => <option key={product.slug} value={product.slug}>{product.name}</option>)}</select></label><label className="field-wide"><span>Requirement summary <b>Required</b></span><textarea name="message" rows={5} required placeholder="Include capacity, chemical, concentration, temperature, pressure and project location where known." /></label></div><label className="consent"><input type="checkbox" required /><span>I agree that AMPAR may use this information to respond to my enquiry. <b>Required</b></span></label><button className="button button-primary" type="submit">Continue</button>{notice ? <p className="form-notice" role="status">{notice}</p> : null}</form>;
}
