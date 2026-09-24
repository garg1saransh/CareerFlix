"use client";

import { BrandLogo } from "@/components/BrandLogo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <BrandLogo href="/" width={170} />
        <div>
          <h2>
            Hiring software that does <em>the boring parts</em> for you
          </h2>
          <p>Interviews, assessments and resume screening — scored automatically, in one workspace.</p>
          <ul>
            <li>14-day trial, every module unlocked</li>
            <li>No credit card to start</li>
            <li>One candidate record for the whole process</li>
          </ul>
        </div>
      </aside>
      <div className="auth-main">
        <div className="auth-main__brand">
          <BrandLogo href="/" width={150} />
        </div>
        {children}
      </div>
    </div>
  );
}
