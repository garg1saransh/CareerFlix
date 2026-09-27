"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export function DemoForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="leaf__form leaf__done">
        <h2>You’re on the calendar</h2>
        <p>A CareerFlix specialist will email you shortly to confirm a time.</p>
        <Link href="/" className="btn btn--primary">Back to the site</Link>
      </div>
    );
  }

  return (
    <form className="leaf__form" onSubmit={onSubmit}>
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
      <button type="submit" className="btn btn--primary">Request a demo</button>
    </form>
  );
}
