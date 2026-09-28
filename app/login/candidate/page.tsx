"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/AuthShell";
import { nameFromEmail, writeSession } from "@/lib/session";

export default function CandidateLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    writeSession({
      role: "candidate",
      name: nameFromEmail(email),
      email,
    });
    router.push("/profile");
  }

  return (
    <AuthShell>
      <div className="auth-form">
        <h1>Candidate login</h1>
        <p>Sign in to open your profile, interviews and applications.</p>
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
