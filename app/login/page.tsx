import Link from "next/link";
import { AuthShell } from "@/components/AuthShell";

export default function LoginPage() {
  return (
    <AuthShell>
      <div className="auth-wrap">
        <h1>Welcome Back</h1>
        <p>Select your account type to access your personalized dashboard</p>

        <Link href="/login/employer" className="auth-card">
          <span className="auth-card__ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="8" cy="8" r="3" />
              <circle cx="16" cy="9" r="2.4" />
              <path d="M3.5 19c.5-3 2.6-4.5 4.5-4.5s4 1.5 4.5 4.5" />
              <path d="M13 18.7c.4-2.2 1.9-3.2 3-3.2 1.2 0 2.5 1 3 3.2" />
            </svg>
          </span>
          <span>
            <h3>Employer / Recruiter Login</h3>
            <p>Access your network, manage placements, and track leads</p>
            <small>Secure access · Quick login</small>
          </span>
          <span className="auth-card__arrow">→</span>
        </Link>

        <Link href="/login/candidate" className="auth-card">
          <span className="auth-card__ico">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M5 19c.7-3.4 3.4-5 7-5s6.3 1.6 7 5" />
            </svg>
          </span>
          <span>
            <h3>Candidate Login</h3>
            <p>Search jobs, track applications, and get hired faster</p>
            <small>Secure access · Quick login</small>
          </span>
          <span className="auth-card__arrow">→</span>
        </Link>
      </div>
    </AuthShell>
  );
}
