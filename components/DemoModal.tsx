"use client";

import { FormEvent, useEffect, useState } from "react";
import { IconClose } from "@/lib/icons";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DemoModal({ open, onClose }: Props) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (!open) return null;

  return (
    <div className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-title">
      <button className="demo-modal__backdrop" aria-label="Close" onClick={onClose} />
      <div className="demo-modal__panel">
        <button className="demo-modal__close" aria-label="Close" onClick={onClose}>
          <IconClose />
        </button>
        {sent ? (
          <div className="demo-modal__done">
            <h2 id="demo-title">You’re on the calendar</h2>
            <p>Thanks — a CareerFlix specialist will email you shortly to confirm a time.</p>
            <button type="button" className="btn btn--primary" onClick={onClose}>
              Back to the site
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Book a demo</span>
            <h2 id="demo-title">See CareerFlix on a role you are hiring for</h2>
            <p>Tell us who you are and we will walk you through interviews, assessments and resume screening in 20 minutes.</p>
            <form className="demo-modal__form" onSubmit={onSubmit}>
              <label>
                Full name
                <input name="name" required placeholder="Alex Rivera" />
              </label>
              <label>
                Work email
                <input name="email" type="email" required placeholder="alex@company.com" />
              </label>
              <label>
                Company
                <input name="company" required placeholder="Acme Hiring" />
              </label>
              <label>
                What are you hiring for?
                <textarea name="role" rows={3} placeholder="Product designer, 3 roles this quarter" />
              </label>
              <button type="submit" className="btn btn--primary">
                Request a demo
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
