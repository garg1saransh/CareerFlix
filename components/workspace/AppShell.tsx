"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import {
  IconAnalyser,
  IconAssessment,
  IconClose,
  IconDash,
  IconEditor,
  IconForms,
  IconGear,
  IconHelp,
  IconInterview,
  IconMenu,
  IconPeople,
  IconPool,
  IconSchedule,
} from "@/lib/icons";
import { clearSession, homeFor, initials, readSession, type Session } from "@/lib/session";

const NAV = [
  { href: "/app", id: "dash", label: "Dashboard", ico: IconDash },
  { href: "/app/interviews", id: "interviews", label: "All Interviews", ico: IconInterview },
  { href: "/app/talent-pool", id: "pool", label: "Talent Pool", ico: IconPool, child: false, parent: true },
  { href: "/app/talent-pool", id: "pool-child", label: "Talent Pool", ico: IconPool, child: true },
  { href: "/app/scheduling", id: "schedule", label: "Scheduling Requests", ico: IconSchedule, child: true },
  { href: "/app/assessments", id: "assessments", label: "Assessments", ico: IconAssessment },
  { href: "/app/job-forms", id: "forms", label: "Job Forms", ico: IconForms },
  { href: "/app/employees", id: "people", label: "Employee Management", ico: IconPeople },
  { href: "/app/analyser", id: "analyser", label: "Bulk Resume Analyser", ico: IconAnalyser },
  { href: "/app/editor", id: "editor", label: "Bulk Resume Editor", ico: IconEditor },
  { href: "/app/settings", id: "settings", label: "Settings", ico: IconGear },
  { href: "/app/support", id: "support", label: "Contact Support", ico: IconHelp },
];

type Props = {
  title: string;
  children: React.ReactNode;
};

export function AppShell({ title, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readSession();
    if (!next || next.role !== "employer") {
      router.replace("/login/employer");
      return;
    }
    setSession(next);
    setReady(true);
  }, [router]);

  function logout() {
    clearSession();
    router.push("/login");
  }

  if (!ready || !session) {
    return <div className="ws"><p className="ws__loading">Opening your workspace…</p></div>;
  }

  return (
    <ShellFrame
      home="/app"
      navLabel="Hiring workspace"
      kicker={session.company || "CareerFlix"}
      title={title}
      session={session}
      roleLine={`Employer · ${session.email}`}
      onLogout={logout}
      nav={
        <>
          {NAV.map((item) => {
            const Ico = item.ico;
            const on =
              item.href === pathname || (item.href === "/app" && pathname === "/app");
            const poolOn = pathname === "/app/talent-pool" || pathname === "/app/scheduling";
            if (item.parent) {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`ws__item ws__item--parent${poolOn ? " is-open" : ""}`}
                >
                  <Ico />
                  <span>{item.label}</span>
                  <em>▾</em>
                </Link>
              );
            }
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`ws__item${item.child ? " ws__item--child" : ""}${on ? " is-on" : ""}`}
                aria-current={on ? "page" : undefined}
              >
                <Ico />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </>
      }
    >
      {children}
    </ShellFrame>
  );
}

export function CandidateShell({ title, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readSession();
    if (!next || next.role !== "candidate") {
      router.replace("/login/candidate");
      return;
    }
    setSession(next);
    setReady(true);
  }, [router]);

  function logout() {
    clearSession();
    router.push("/login");
  }

  if (!ready || !session) {
    return <div className="ws"><p className="ws__loading">Opening your profile…</p></div>;
  }

  const links = [
    { href: "/profile", label: "My profile" },
    { href: "/profile/interviews", label: "Interviews" },
    { href: "/profile/applications", label: "Applications" },
    { href: "/profile/jobs", label: "Jobs" },
    { href: "/profile/settings", label: "Settings" },
  ];

  return (
    <ShellFrame
      home="/profile"
      navLabel="Candidate profile"
      kicker="Candidate"
      title={title}
      session={session}
      roleLine={session.email}
      onLogout={logout}
      extraWho={
        <Link href={homeFor("candidate")} className="btn btn--ghost btn--sm">Profile</Link>
      }
      nav={
        <>
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`ws__item${pathname === item.href ? " is-on" : ""}`}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </>
      }
    >
      {children}
    </ShellFrame>
  );
}

function ShellFrame({
  home,
  navLabel,
  kicker,
  title,
  session,
  roleLine,
  extraWho,
  onLogout,
  nav,
  children,
}: {
  home: string;
  navLabel: string;
  kicker: string;
  title: string;
  session: Session;
  roleLine: string;
  extraWho?: React.ReactNode;
  onLogout: () => void;
  nav: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={`ws${open ? " is-nav" : ""}`}>
      {open ? (
        <button type="button" className="ws__veil" aria-label="Close menu" onClick={() => setOpen(false)} />
      ) : null}
      <aside className={`ws__side${open ? " is-open" : ""}`}>
        <div className="ws__brand">
          <BrandLogo href={home} width={132} />
        </div>
        <nav className="ws__nav" aria-label={navLabel}>
          {nav}
        </nav>
      </aside>
      <div className="ws__main">
        <header className="ws__bar">
          <button
            type="button"
            className="ws__menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
          <div>
            <p className="ws__kicker">{kicker}</p>
            <h1>{title}</h1>
          </div>
          <div className="ws__who">
            <span className="ws__av">{initials(session.name)}</span>
            <span>
              <b>{session.name}</b>
              <small>{roleLine}</small>
            </span>
            {extraWho}
            <button type="button" className="btn btn--ghost btn--sm" onClick={onLogout}>
              Log out
            </button>
          </div>
        </header>
        <div className="ws__body">{children}</div>
      </div>
    </div>
  );
}
