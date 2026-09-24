"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/AuthShell";

export default function EmployerLoginPage() {
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    if (!email || !password) {
      setError("Enter your work email and password.");
      return;
    }
    setError("");
    window.location.href = "/";
  }

  return (
    <AuthShell>
      <div className="auth-form">
        <h1>Employer login</h1>
        <p>Access your hiring workspace, candidates and interviews.</p>
        <form onSubmit={onSubmit}>
          <label>
            Work email
            <input name="email" type="email" required placeholder="you@company.com" />
          </label>
          <label>
            Password
            <input name="password" type="password" required placeholder="••••••••" />
          </label>
          <div className="auth-links">
            <Link href="/login">Change account type</Link>
            <Link href="/signup">Create account</Link>
          </div>
          {error && <p style={{ color: "#dc2626", fontSize: 14 }}>{error}</p>}
          <button type="submit" className="btn btn--primary">
            Sign in
          </button>
        </form>
        <p className="auth-alt">
          New to CareerFlix? <Link href="/signup">Start a free trial</Link>
        </p>
      </div>
    </AuthShell>
  );
}
