"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthShell } from "@/components/AuthShell";

export default function CandidateLoginPage() {
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    setError("");
    window.location.href = "/";
  }

  return (
    <AuthShell>
      <div className="auth-form">
        <h1>Candidate login</h1>
        <p>Continue an interview, assessment or application.</p>
        <form onSubmit={onSubmit}>
          <label>
            Email
            <input name="email" type="email" required placeholder="you@email.com" />
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
          Invited to an interview? Use the link in your email, or{" "}
          <Link href="/signup">create an account</Link>.
        </p>
      </div>
    </AuthShell>
  );
}
