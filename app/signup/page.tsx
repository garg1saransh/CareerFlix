"use client";

import Link from "next/link";
import { FormEvent, Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";
import { PLANS } from "@/lib/data";

function SignupForm() {
  const params = useSearchParams();
  const plan = params.get("plan") || "Starter";
  const [done, setDone] = useState(false);
  const selected = useMemo(
    () => PLANS.find((p) => p.name.toLowerCase() === plan.toLowerCase()) ?? PLANS[1],
    [plan]
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <div className="auth-form">
        <h1>Your 14-day trial is ready</h1>
        <p>
          We created a {selected.name} workspace. Check your inbox to verify your email, then start building your first interview.
        </p>
        <Link href="/login/employer" className="btn btn--primary" style={{ width: "100%" }}>
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-form">
      <h1>Start your free trial</h1>
      <p>
        {selected.name} plan · 14 days, every feature unlocked. No card needed.
      </p>
      <form onSubmit={onSubmit}>
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
          Password
          <input name="password" type="password" required minLength={8} placeholder="At least 8 characters" />
        </label>
        <button type="submit" className="btn btn--primary">
          Create account
        </button>
      </form>
      <p className="auth-alt">
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="auth-form"><h1>Start your free trial</h1></div>}>
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}
