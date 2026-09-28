"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MODULES } from "@/lib/data";
import { IconArrow, MODULE_ICONS } from "@/lib/icons";
import { moduleHref, NAV_PAGES } from "@/lib/paths";

gsap.registerPlugin(useGSAP);

const STAGES: Record<
  string,
  {
    n: string;
    kicker: string;
    headline: string;
    lead: string;
    ring: { value: string; label: string };
    stats: { n: number; l: string; fill: string }[];
    tape: string[];
    beats: { k: string; t: string; d: string }[];
    cta: { href: string; label: string };
    next: { href: string; label: string };
  }
> = {
  "how-it-works": {
    n: "01",
    kicker: "How it works",
    headline: "Three moves. One shortlist.",
    lead: "Send one link. Every response is scored. Your team decides, and strong people stay in your talent pool.",
    ring: { value: "03", label: "steps" },
    stats: [
      { n: 1, l: "Link, not a calendar", fill: "70%" },
      { n: 1, l: "Score on every reply", fill: "82%" },
      { n: 1, l: "Your team decides", fill: "64%" },
      { n: 62, l: "Faster to hire", fill: "62%" },
    ],
    tape: ["Invite sent · Lian Chen", "Scored · Elena Vargas 96", "Shortlisted · Dami Nwosu", "Kept warm · talent pool"],
    beats: [
      { k: "01", t: "Send one link", d: "Candidates record or sit the test whenever it suits them." },
      { k: "02", t: "Score every reply", d: "Interviews, assessments and resumes get a score and a reason." },
      { k: "03", t: "Your team decides", d: "Shortlist, comment, and keep strong people in your talent pool." },
    ],
    cta: { href: "/signup", label: "Start free trial" },
    next: { href: "/modules", label: "See the modules" },
  },
  modules: {
    n: "02",
    kicker: "Modules",
    headline: "Eight tools. One login.",
    lead: "Interviews, assessments, job forms, resume tools, talent pool, scheduling and employee management — one candidate record, one bill.",
    ring: { value: "08", label: "tools" },
    stats: [
      { n: 8, l: "Tools in one account", fill: "80%" },
      { n: 1, l: "Candidate record", fill: "100%" },
      { n: 1, l: "Login for the desk", fill: "100%" },
      { n: 14, l: "Day trial, all unlocked", fill: "48%" },
    ],
    tape: ["Interviews", "Assessments", "Job forms", "Analyser", "Editor", "Talent pool", "Scheduling", "Employees"],
    beats: [
      { k: "08", t: "Tools, one login", d: "Stop stitching five products together for one hire." },
      { k: "01", t: "One candidate record", d: "Score, notes and files sit on the same person." },
      { k: "14", t: "Days, fully unlocked", d: "Every module is on for the trial. Nothing gated." },
    ],
    cta: { href: "/signup", label: "Unlock every module" },
    next: { href: "/desk", label: "See the hiring desk" },
  },
  desk: {
    n: "03",
    kicker: "Hiring desk",
    headline: "The menu you sign in to.",
    lead: "Dashboard, interviews, talent pool, scheduling, assessments, job forms, the team and resume tools — each item in the sidebar has its own page.",
    ring: { value: "11", label: "boards" },
    stats: [
      { n: 11, l: "Items in the sidebar", fill: "88%" },
      { n: 1, l: "Home for the week", fill: "55%" },
      { n: 3, l: "Requests that need you", fill: "42%" },
      { n: 8, l: "Warm in the pool", fill: "64%" },
    ],
    tape: ["Dashboard", "All Interviews", "Talent Pool", "Scheduling", "Assessments", "Job Forms", "Settings"],
    beats: [
      { k: "Home", t: "Start from the week", d: "Live interviews, open requests and the pool on one screen." },
      { k: "List", t: "Every tool, one sidebar", d: "Click an item after login — this is that same menu." },
      { k: "Warm", t: "Talent pool stays attached", d: "People you already like wait for the next opening." },
    ],
    cta: { href: "/login/employer", label: "Open the desk" },
    next: { href: "/features", label: "See the layer" },
  },
  features: {
    n: "04",
    kicker: "Features",
    headline: "Learn it once. Use it everywhere.",
    lead: "AI scoring, WhatsApp, the talent pool, scheduling, the dashboard and team permissions sit under every module.",
    ring: { value: "06", label: "layers" },
    stats: [
      { n: 6, l: "Shared across tools", fill: "75%" },
      { n: 1, l: "Score and a reason", fill: "90%" },
      { n: 1, l: "WhatsApp on the record", fill: "58%" },
      { n: 1, l: "Dashboard for the week", fill: "50%" },
    ],
    tape: ["AI scoring", "WhatsApp", "Talent pool", "Team roles", "Scheduling", "Dashboard"],
    beats: [
      { k: "AI", t: "Score plus a reason", d: "Not a gut feeling — a mark against your pass criteria." },
      { k: "Chat", t: "WhatsApp on the record", d: "Remind, broadcast and reply without another app." },
      { k: "Team", t: "Roles, not extra seats chaos", d: "Recruiter, hiring manager and admin see their slice." },
    ],
    cta: { href: "/signup", label: "Try the layer" },
    next: { href: "/pricing", label: "Compare plans" },
  },
  pricing: {
    n: "05",
    kicker: "Pricing",
    headline: "Fourteen days. Every module.",
    lead: "Pick a plan and every feature on it unlocks immediately. No card, no charge, nothing to cancel.",
    ring: { value: "14", label: "days" },
    stats: [
      { n: 14, l: "Day trial", fill: "70%" },
      { n: 0, l: "Card to start", fill: "8%" },
      { n: 8, l: "Modules unlocked", fill: "80%" },
      { n: 99, l: "Save yearly", fill: "99%" },
    ],
    tape: ["Free trial", "No card", "Every module", "Cancel any time", "Data stays put"],
    beats: [
      { k: "00", t: "No card to start", d: "Create an account. The trial begins on first login." },
      { k: "14", t: "Every module on", d: "Interviews, assessments, forms, resume tools, pool." },
      { k: "Keep", t: "Data stays put", d: "When the trial ends we stop new work — nothing is wiped." },
    ],
    cta: { href: "/signup", label: "Start the 14 days" },
    next: { href: "/demo", label: "Book a walkthrough" },
  },
};

const FLOW_CARDS = [
  { n: "01", tag: "Invite", name: "Lian Chen", meta: "Product Designer · waiting", tone: "a" },
  { n: "02", tag: "Scored 96", name: "Elena Vargas", meta: "Assessment · passed", tone: "b" },
  { n: "03", tag: "Talent pool", name: "Dami Nwosu", meta: "Shortlisted · kept warm", tone: "c" },
];

const DESK_ROWS = [
  { label: "Dashboard", on: true },
  { label: "All Interviews", on: false },
  { label: "Talent Pool", on: false },
  { label: "Scheduling", on: false },
  { label: "Assessments", on: false },
  { label: "Job Forms", on: false },
];

const FEATURE_LAYERS = [
  { n: "01", t: "AI scoring" },
  { n: "02", t: "WhatsApp" },
  { n: "03", t: "Talent pool" },
  { n: "04", t: "Team roles" },
  { n: "05", t: "Scheduling" },
  { n: "06", t: "Dashboard" },
];

const PLAN_CHIPS = ["Free", "Starter", "Professional", "Business"];

function Canvas({ slug, ring }: { slug: string; ring: { value: string; label: string } }) {
  if (slug === "how-it-works") {
    return (
      <div className="np__canvas np__canvas--flow" aria-hidden="true">
        <i className="np__spine" />
        {FLOW_CARDS.map((card) => (
          <article key={card.n} className={`np__bit np__flow np__flow--${card.tone}`}>
            <span>{card.n}</span>
            <div>
              <b>{card.name}</b>
              <small>{card.meta}</small>
            </div>
            <em>{card.tag}</em>
          </article>
        ))}
      </div>
    );
  }

  if (slug === "modules") {
    return (
      <div className="np__canvas np__canvas--mods">
        {MODULES.map((item) => {
          const Ico = MODULE_ICONS[item.id as keyof typeof MODULE_ICONS];
          return (
            <Link key={item.id} href={moduleHref(item.id)} className="np__bit np__mod">
              <span>{item.num}</span>
              <i>{Ico ? <Ico /> : null}</i>
              <b>{item.title}</b>
            </Link>
          );
        })}
      </div>
    );
  }

  if (slug === "desk") {
    return (
      <div className="np__canvas np__canvas--desk" aria-hidden="true">
        <div className="np__desk">
          <div className="np__deskh">
            <i />
            <b>CareerFlix</b>
          </div>
          {DESK_ROWS.map((row) => (
            <div key={row.label} className={`np__bit np__deskrow${row.on ? " is-on" : ""}`}>
              <i />
              <span>{row.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === "features") {
    return (
      <div className="np__canvas np__canvas--feat" aria-hidden="true">
        {FEATURE_LAYERS.map((row, i) => (
          <div key={row.n} className="np__bit np__layer" style={{ ["--i" as string]: String(i) }}>
            <span>{row.n}</span>
            <b>{row.t}</b>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="np__canvas np__canvas--price" aria-hidden="true">
      <div className="np__clock">
        <i className="np__clockring" />
        <b>{ring.value}</b>
        <small>{ring.label} free</small>
      </div>
      <ul className="np__plans">
        {PLAN_CHIPS.map((name) => (
          <li key={name} className="np__bit">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NavStage({ slug }: { slug: string }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = STAGES[slug];
  if (!stage) return null;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const intro = wrap.querySelectorAll<HTMLElement>(".np__rail, .np__copy, .np__canvas, .np__stat, .np__beat");
      const bits = wrap.querySelectorAll<HTMLElement>(".np__bit");
      if (reduce) {
        gsap.set([intro, bits], { y: 0, opacity: 1, x: 0 });
        return;
      }
      gsap.set(intro, { y: 22, opacity: 0 });
      gsap.to(intro, { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: "power4.out" });
      if (bits.length) {
        gsap.set(bits, { y: 14, opacity: 0 });
        gsap.to(bits, { y: 0, opacity: 1, stagger: 0.06, duration: 0.55, delay: 0.18, ease: "power3.out" });
      }
      wrap.querySelectorAll<HTMLElement>(".np__meter i").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 0.95, ease: "power3.out", transformOrigin: "0% 50%", delay: 0.22 });
      });
      wrap.querySelectorAll<HTMLElement>(".np__n").forEach((el) => {
        const end = Number(el.dataset.count || "0");
        const obj = { p: 0 };
        gsap.to(obj, {
          p: end,
          duration: 0.95,
          delay: 0.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.p));
          },
        });
      });
    },
    { scope: root, dependencies: [slug] }
  );

  return (
    <section className={`np np--${slug}`} ref={root}>
      <i className="np__wash" aria-hidden="true" />
      <span className="np__mark" aria-hidden="true">
        {stage.n}
      </span>
      <div className="wrap">
        <nav className="np__rail" aria-label="Product pages">
          {NAV_PAGES.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`np__step${item.hash === slug ? " is-on" : ""}`}
              aria-current={item.hash === slug ? "page" : undefined}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="np__hero">
          <div className="np__copy">
            <span className="np__live">
              <i />
              {stage.n} · {stage.kicker}
            </span>
            <h1 className="np__title">{stage.headline}</h1>
            <p className="np__lead">{stage.lead}</p>
            <div className="np__cta">
              <Link href={stage.cta.href} className="btn btn--primary">
                {stage.cta.label} <IconArrow />
              </Link>
              <Link href={stage.next.href} className="link-arrow">
                {stage.next.label}
              </Link>
            </div>
            <div className="np__tape" aria-hidden="true">
              {stage.tape.concat(stage.tape).map((line, i) => (
                <span key={line + i}>{line}</span>
              ))}
            </div>
          </div>
          <Canvas slug={slug} ring={stage.ring} />
        </div>

        <div className="np__stats">
          {stage.stats.map((item) => (
            <div key={item.l} className="np__stat">
              <small>{item.l}</small>
              <b className="np__n" data-count={item.n}>
                0
              </b>
              <span className="np__meter">
                <i style={{ width: item.fill }} />
              </span>
            </div>
          ))}
        </div>

        <div className="np__beats">
          {stage.beats.map((item) => (
            <article key={item.t} className="np__beat">
              <span>{item.k}</span>
              <h2>{item.t}</h2>
              <p>{item.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NextStrip({ slug }: { slug: string }) {
  const i = NAV_PAGES.findIndex((item) => item.hash === slug);
  if (i < 0) return null;
  const next = NAV_PAGES[(i + 1) % NAV_PAGES.length];
  return (
    <div className="npnext">
      <div className="wrap npnext__inner">
        <span>Next chapter</span>
        <Link href={next.href}>
          {next.label}
          <IconArrow />
        </Link>
      </div>
    </div>
  );
}
