"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  IconAnalyser,
  IconAssessment,
  IconDash,
  IconEditor,
  IconForms,
  IconGear,
  IconHelp,
  IconInterview,
  IconPeople,
  IconPool,
  IconSchedule,
} from "@/lib/icons";
import { Chapter } from "@/components/landing/Chapter";
import { deskHref } from "@/lib/paths";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DESK = [
  {
    id: "dash",
    label: "Dashboard",
    ico: IconDash,
    kicker: "Home",
    heading: "See the whole hiring week in one place",
    body: "Live interviews, open scheduling requests and the talent pool sit on one home screen — so your team starts the day from the work, not from a hunt through modules.",
    stat: "Today",
    rows: [
      { av: "12", name: "Interviews in review", tag: "Live" },
      { av: "3", name: "Scheduling requests", tag: "Needs you" },
      { av: "8", name: "Warm in the talent pool", tag: "Ready" },
    ],
  },
  {
    id: "interviews",
    label: "All Interviews",
    ico: IconInterview,
    kicker: "One-way video",
    heading: "Every interview, one list",
    body: "Open interviews, recorded answers and team scores stay on the same record. Filter by role, status or score — then share a shortlist without leaving CareerFlix.",
    stat: "62%",
    rows: [
      { av: "LC", name: "Lian Chen · Product Designer", tag: "In review" },
      { av: "EV", name: "Elena Vargas · Design", tag: "Scored 96" },
      { av: "MH", name: "Maya Haddad · Ops", tag: "Invited" },
    ],
  },
  {
    id: "pool",
    label: "Talent Pool",
    ico: IconPool,
    child: true,
    kicker: "Warm bench",
    heading: "Keep strong people for the next opening",
    body: "Park someone after an interview, assessment or resume pass. Tags, notes and the original score stay attached — pull them back in when the next role opens.",
    stat: "Warm",
    rows: [
      { av: "TM", name: "Théo Moreau · Product", tag: "Ready" },
      { av: "RK", name: "Rupinder Kaur · Design", tag: "Kept warm" },
      { av: "AS", name: "Ana Silva · Marketing", tag: "Kept warm" },
    ],
  },
  {
    id: "schedule",
    label: "Scheduling Requests",
    ico: IconSchedule,
    child: true,
    kicker: "Reschedules",
    heading: "Handle new slots without calendar ping-pong",
    body: "When a candidate needs a new time, the request lands on the same interview. Approve, offer a window or send a reminder from the record — not a separate thread.",
    stat: "Open",
    rows: [
      { av: "LC", name: "Lian Chen · new slot", tag: "Waiting" },
      { av: "EV", name: "Elena Vargas · approve", tag: "Needs you" },
      { av: "MH", name: "Maya Haddad · reminder", tag: "Sent" },
    ],
  },
  {
    id: "assessments",
    label: "Assessments",
    ico: IconAssessment,
    kicker: "Skills tests",
    heading: "Score the work, not the CV",
    body: "Send a role-relevant test before the first conversation. Everything is marked automatically and lands on the same candidate record as the interview.",
    stat: "96",
    rows: [
      { av: "EV", name: "Elena Vargas · Design craft", tag: "Pass 96" },
      { av: "LC", name: "Lian Chen · Systems", tag: "Pass 91" },
      { av: "DN", name: "Dami Nwosu · Judgement", tag: "Pass 88" },
    ],
  },
  {
    id: "forms",
    label: "Job Forms",
    ico: IconForms,
    kicker: "Applications",
    heading: "Ask exactly what the role needs",
    body: "Build a form per role, add knock-out questions and let the obvious no’s drop out before anybody reads a CV. Every submission lands in one filtered list.",
    stat: "40%",
    rows: [
      { av: "JF", name: "Product Designer form", tag: "Live" },
      { av: "KO", name: "Notice period knock-out", tag: "Passed" },
      { av: "12", name: "New submissions today", tag: "Inbox" },
    ],
  },
  {
    id: "people",
    label: "Employee Management",
    ico: IconPeople,
    kicker: "Your team",
    heading: "Invite people and scope what they see",
    body: "Add recruiters, hiring managers and admins. Each person only touches the modules their role needs — interviews, assessments, forms, the pool — and nothing more.",
    stat: "4",
    rows: [
      { av: "DN", name: "Dami Nwosu", tag: "Admin" },
      { av: "EV", name: "Elena Vargas", tag: "Recruiter" },
      { av: "TM", name: "Théo Moreau", tag: "Hiring manager" },
    ],
  },
  {
    id: "analyser",
    label: "Bulk Resume Analyser",
    ico: IconAnalyser,
    kicker: "CV batch",
    heading: "Read the whole pile in one pass",
    body: "Drop in a folder of CVs and get every one parsed, matched against the role and ranked — with the reason next to each score.",
    stat: "50",
    rows: [
      { av: "EV", name: "Elena Vargas", tag: "96" },
      { av: "LC", name: "Lian Chen", tag: "94" },
      { av: "DN", name: "Dami Nwosu", tag: "88" },
    ],
  },
  {
    id: "editor",
    label: "Bulk Resume Editor",
    ico: IconEditor,
    kicker: "On-brand CVs",
    heading: "Clean every resume into your template",
    body: "Bulk-import raw CVs and every section comes out structured and editable. Reformat, straighten the layout and export — without retyping a line.",
    stat: "Bulk",
    rows: [
      { av: "01", name: "Raw PDF · mixed fonts", tag: "Before" },
      { av: "02", name: "Your template applied", tag: "Ready" },
      { av: "03", name: "Share a secure link", tag: "Export" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    ico: IconGear,
    kicker: "Account",
    heading: "Brand, access and notifications",
    body: "Set your colours, email templates, team roles and how candidates hear from you. Changes apply across every module in the same account.",
    stat: "One",
    rows: [
      { av: "BR", name: "Brand colours & templates", tag: "On" },
      { av: "TM", name: "Team roles & scopes", tag: "On" },
      { av: "NT", name: "Email & WhatsApp alerts", tag: "On" },
    ],
  },
  {
    id: "support",
    label: "Contact Support",
    ico: IconHelp,
    kicker: "Help",
    heading: "A person when you need a walkthrough",
    body: "Book a demo, ask about a batch, or get a hand setting up the first interview. Support sits in the same account as the rest of the hiring desk.",
    stat: "Live",
    rows: [
      { av: "DM", name: "Book a product walkthrough", tag: "Demo" },
      { av: "EM", name: "Email the support desk", tag: "Reply" },
      { av: "14", name: "Trial help, every module", tag: "Open" },
    ],
  },
] as const;

const TOP = DESK.filter((item) => item.id !== "pool" && item.id !== "schedule");
const POOL_KIDS = DESK.filter((item) => item.id === "pool" || item.id === "schedule");

export function DeskStudio() {
  const [active, setActive] = useState("schedule");
  const [openPool, setOpenPool] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const item = DESK.find((row) => row.id === active) ?? DESK[3];
  const Ico = item.ico;

  function pick(id: string) {
    setActive(id);
    if (id === "pool" || id === "schedule") setOpenPool(true);
  }

  useGSAP(
    (_ctx, contextSafe) => {
      if (!contextSafe) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const cleanups: Array<() => void> = [];
      const bits = wrap.querySelectorAll<HTMLElement>(".desk__shell, .desk__note");

      if (bits.length && !reduce) {
        const play = () =>
          gsap.to(bits, { y: 0, opacity: 1, stagger: 0.08, duration: 0.68, ease: "power4.out", overwrite: true });
        gsap.set(bits, { y: 18, opacity: 0 });
        const tryPlay = () => {
          const box = wrap.getBoundingClientRect();
          if (box.top < window.innerHeight * 0.92 && box.bottom > 40) play();
        };
        tryPlay();
        ScrollTrigger.create({
          trigger: wrap,
          start: "top 88%",
          once: true,
          onEnter: play,
          onEnterBack: play,
          onRefresh: (self) => {
            if (self.scroll() >= self.start) play();
          },
        });
        const io = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) play();
        }, { threshold: 0.1 });
        io.observe(wrap);
        cleanups.push(() => io.disconnect());
        gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
      } else {
        gsap.set(bits, { y: 0, opacity: 1 });
      }

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const live = wrap.querySelector<HTMLElement>(".desk__live");
      if (live && !reduce) {
        gsap.fromTo(live, { y: 14, autoAlpha: 0.28 }, { y: 0, autoAlpha: 1, duration: 0.46, ease: "power4.out" });
      }
      const rows = wrap.querySelectorAll<HTMLElement>(".desk__row");
      if (rows.length && !reduce) {
        gsap.fromTo(rows, { y: 10, autoAlpha: 0.2 }, { y: 0, autoAlpha: 1, duration: 0.38, stagger: 0.05, ease: "power4.out" });
      }
    },
    { dependencies: [active], scope: root }
  );

  return (
    <Chapter
      id="desk"
      n="03"
      kicker="Hiring desk"
      title="The same menu your team opens after they sign in"
      lead="Dashboard, interviews, talent pool, scheduling requests, assessments, job forms, employee management, bulk resume tools, settings and support — click any item to see what it does."
    >
      <div className="desk" ref={root}>
        <p className="desk__note">Click a tool in the sidebar. This is the product map — not a live hiring account.</p>
        <div className="desk__shell">
          <aside className="desk__side" aria-label="CareerFlix product menu">
            <div className="desk__brand">
              <span className="desk__mark" aria-hidden="true" />
              <b>CareerFlix</b>
            </div>
            <nav className="desk__nav" aria-label="Product tools">
              {TOP.map((row) => {
                const RowIco = row.ico;
                if (row.id === "interviews") {
                  return (
                    <div key={row.id}>
                      <Link
                        href={deskHref(row.id)}
                        className={`desk__item${active === row.id ? " is-on" : ""}`}
                        aria-current={active === row.id ? "page" : undefined}
                        onMouseEnter={() => pick(row.id)}
                      >
                        <RowIco />
                        <span>{row.label}</span>
                      </Link>
                      <div className="desk__group">
                        <button
                          type="button"
                          className={`desk__item desk__item--parent${openPool || active === "pool" || active === "schedule" ? " is-open" : ""}`}
                          aria-expanded={openPool}
                          onClick={() => setOpenPool((v) => !v)}
                        >
                          <IconPool />
                          <span>Talent Pool</span>
                          <em>{openPool ? "▴" : "▾"}</em>
                        </button>
                        {openPool &&
                          POOL_KIDS.map((kid) => {
                            const KidIco = kid.ico;
                            return (
                              <Link
                                key={kid.id}
                                href={deskHref(kid.id)}
                                className={`desk__item desk__item--child${active === kid.id ? " is-on" : ""}`}
                                aria-current={active === kid.id ? "page" : undefined}
                                onMouseEnter={() => pick(kid.id)}
                              >
                                <KidIco />
                                <span>{kid.label}</span>
                              </Link>
                            );
                          })}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={row.id}
                    href={deskHref(row.id)}
                    className={`desk__item${active === row.id ? " is-on" : ""}`}
                    aria-current={active === row.id ? "page" : undefined}
                    onMouseEnter={() => pick(row.id)}
                  >
                    <RowIco />
                    <span>{row.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          <article className="desk__live" aria-live="polite">
            <div className="desk__chrome">
              <span className="desk__now"><i />{item.kicker}</span>
              <b>{item.label}</b>
            </div>
            <div className="desk__copy">
              <span className="desk__liveIco"><Ico /></span>
              <h3>{item.heading}</h3>
              <p>{item.body}</p>
              <div className="kit__stat">
                <b>{item.stat}</b>
                <small>on the same candidate record</small>
              </div>
              <Link href={deskHref(item.id)} className="link-arrow">Open {item.label} page</Link>
            </div>
            <div className="desk__rows">
              {item.rows.map((row) => (
                <div className="desk__row" key={row.name}>
                  <span className="pc__av">{row.av}</span>
                  <span className="pc__nm">{row.name}</span>
                  <span className="pc__tag pc__tag--ok">{row.tag}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </Chapter>
  );
}
