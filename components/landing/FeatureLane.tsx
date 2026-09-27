"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { IconArrow, IconDash, IconSchedule } from "@/lib/icons";
import { FEATURE_HREF } from "@/lib/paths";
import { Chapter } from "@/components/landing/Chapter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function IconScore() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M4 14.5l3.2-6.2 2.6 3.8 2.8-5.6L16 14.5" />
      <path d="M3 16.5h14" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4.5h12a2 2 0 012 2v6a2 2 0 01-2 2H8l-4 3v-3H4a2 2 0 01-2-2v-6a2 2 0 012-2z" />
    </svg>
  );
}

function IconPool() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="7" cy="7" r="2.4" />
      <circle cx="13.2" cy="7.4" r="2" />
      <path d="M2.8 15.2a4.2 4.2 0 018.4 0M11 15.2a3.6 3.6 0 016.2 0" />
    </svg>
  );
}

function IconRoles() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <rect x="4" y="8.4" width="12" height="8" rx="2" />
      <path d="M7 8.4V6.2a3 3 0 016 0v2.2" />
    </svg>
  );
}

const FEATURES = [
  {
    n: "01",
    title: "AI-assisted scoring",
    body: "Interview answers, assessments and resumes all get a score and a reason, not just a gut feeling.",
    hint: "Score + reason on every response",
    ico: IconScore,
    preview: {
      kicker: "Live score",
      name: "Elena Vargas",
      meta: "Assessment · Design",
      tag: "AI score 92",
      initials: "EV",
      bg: "var(--cream)",
      width: "92%",
      msg: "Scored automatically against your pass mark — no manual grading.",
      kind: "score" as const,
    },
  },
  {
    n: "02",
    title: "WhatsApp built in",
    body: "Message candidates, run broadcasts and manage conversations without leaving the platform.",
    hint: "Chat from the candidate record",
    ico: IconChat,
    preview: {
      kicker: "Inbox",
      name: "Maya Haddad",
      meta: "WhatsApp · Interview reminder",
      tag: "Delivered",
      initials: "MH",
      bg: "var(--lav)",
      width: "100%",
      msg: "Sent straight from the candidate record — no separate app to open.",
      kind: "chat" as const,
    },
  },
  {
    n: "03",
    title: "Talent pool",
    body: "Keep strong candidates warm and pull them back in for the next opening.",
    hint: "Reuse people you already like",
    ico: IconPool,
    preview: {
      kicker: "Warm bench",
      name: "Théo Moreau",
      meta: "Talent pool · Product",
      tag: "Kept warm",
      initials: "TM",
      bg: "var(--peach)",
      width: "100%",
      msg: "Pulled back in for the next Product Designer opening.",
      kind: "pool" as const,
    },
  },
  {
    n: "04",
    title: "Team roles & permissions",
    body: "Invite your team and scope exactly which modules each person can touch.",
    hint: "One login, scoped access",
    ico: IconRoles,
    preview: {
      kicker: "Access",
      name: "Dami Nwosu",
      meta: "Admin · All modules",
      tag: "Owner",
      initials: "DN",
      bg: "var(--peri)",
      width: "80%",
      msg: "Recruiter, hiring manager and admin — each sees only what they need.",
      kind: "roles" as const,
    },
  },
  {
    n: "05",
    title: "Scheduling requests",
    body: "Candidate reschedules land on the same interview — approve, offer a new window or send a reminder from the record.",
    hint: "No calendar ping-pong",
    ico: IconSchedule,
    preview: {
      kicker: "Requests",
      name: "Lian Chen",
      meta: "Interview · new slot",
      tag: "Waiting",
      initials: "LC",
      bg: "var(--sky)",
      width: "100%",
      msg: "Approve or offer times without leaving the candidate record.",
      kind: "schedule" as const,
    },
  },
  {
    n: "06",
    title: "Hiring dashboard",
    body: "Live interviews, open requests and the talent pool sit on one home screen — start the day from the work, not a hunt through modules.",
    hint: "One home for the week",
    ico: IconDash,
    preview: {
      kicker: "Today",
      name: "Your desk",
      meta: "Dashboard · this week",
      tag: "Live",
      initials: "12",
      bg: "var(--cream)",
      width: "100%",
      msg: "Interviews in review, requests that need you, people already warm.",
      kind: "dash" as const,
    },
  },
];

function Preview({ kind }: { kind: (typeof FEATURES)[number]["preview"] }) {
  if (kind.kind === "chat") {
    return (
      <>
        <div className="forge__bubble forge__bubble--in">
          <span>Hi Maya — your interview is tomorrow at 10:00. Reply here if you need to reschedule.</span>
        </div>
        <div className="forge__bubble forge__bubble--out">
          <span>Thanks, I’ll be there.</span>
        </div>
        <p className="pc__msg">{kind.msg}</p>
      </>
    );
  }

  if (kind.kind === "pool") {
    return (
      <>
        {[
          { av: "TM", bg: "var(--peach)", name: "Théo Moreau", tag: "Kept warm" },
          { av: "RK", bg: "var(--lav)", name: "Rupinder Kaur", tag: "Ready" },
          { av: "AS", bg: "var(--sky)", name: "Ana Silva", tag: "Kept warm" },
        ].map((row) => (
          <div className="brow" key={row.name}>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <span className="pc__tag pc__tag--ok">{row.tag}</span>
          </div>
        ))}
      </>
    );
  }

  if (kind.kind === "roles") {
    return (
      <>
        {[
          { av: "EV", bg: "var(--peach)", name: "Elena Vargas", tag: "Recruiter" },
          { av: "TM", bg: "var(--sky)", name: "Théo Moreau", tag: "Hiring Manager" },
          { av: "DN", bg: "var(--lav)", name: "Dami Nwosu", tag: "Admin" },
        ].map((row) => (
          <div className="brow" key={row.name}>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <span className="pc__tag">{row.tag}</span>
          </div>
        ))}
      </>
    );
  }

  if (kind.kind === "schedule") {
    return (
      <>
        {[
          { av: "LC", bg: "var(--sky)", name: "Lian Chen", tag: "New slot" },
          { av: "EV", bg: "var(--peach)", name: "Elena Vargas", tag: "Approve" },
          { av: "MH", bg: "var(--lav)", name: "Maya Haddad", tag: "Remind" },
        ].map((row) => (
          <div className="brow" key={row.name}>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <span className="pc__tag pc__tag--ok">{row.tag}</span>
          </div>
        ))}
      </>
    );
  }

  if (kind.kind === "dash") {
    return (
      <>
        {[
          { av: "12", bg: "var(--cream)", name: "Interviews in review", tag: "Live" },
          { av: "3", bg: "var(--peach)", name: "Scheduling requests", tag: "Needs you" },
          { av: "8", bg: "var(--lav)", name: "Warm in the pool", tag: "Ready" },
        ].map((row) => (
          <div className="brow" key={row.name}>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <span className="pc__tag pc__tag--ok">{row.tag}</span>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="bar"><i style={{ width: kind.width }} /></div>
      <p className="pc__msg">{kind.msg}</p>
    </>
  );
}

export function FeatureLane() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const item = FEATURES[active];
  const Ico = item.ico;

  useGSAP(
    (_ctx, contextSafe) => {
      if (!contextSafe) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const cleanups: Array<() => void> = [];
      const tiles = wrap.querySelectorAll<HTMLElement>(".forge__tile");

      if (tiles.length && !reduce) {
        const playTiles = () =>
          gsap.to(tiles, { x: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power4.out", overwrite: true });
        gsap.set(tiles, { x: -22, opacity: 0 });
        if (wrap.getBoundingClientRect().top < window.innerHeight * 0.88) playTiles();
        ScrollTrigger.create({
          trigger: wrap,
          start: "top 82%",
          once: true,
          onEnter: playTiles,
          onEnterBack: playTiles,
          onRefresh: (self) => {
            if (self.scroll() >= self.start) playTiles();
          },
        });
      } else {
        gsap.set(tiles, { x: 0, opacity: 1 });
      }

      const spine = wrap.querySelector<HTMLElement>(".forge__draw");
      const comet = wrap.querySelector<HTMLElement>(".forge__comet");
      if (spine && !reduce) {
        gsap.set(spine, { scaleY: 0, transformOrigin: "50% 0%" });
        gsap.to(spine, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top 78%", end: "bottom 55%", scrub: 0.45 },
        });
      }
      if (comet && !reduce) {
        gsap.fromTo(
          comet,
          { y: 0, opacity: 0.2 },
          {
            y: () => Math.max(0, (wrap.querySelector(".forge__spine") as HTMLElement | null)?.offsetHeight || 0) - 18,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top 78%", end: "bottom 55%", scrub: 0.45 },
          }
        );
      }

      tiles.forEach((tile) => {
        const yTo = gsap.quickTo(tile, "y", { duration: 0.35, ease: "power3.out" });
        const enter = contextSafe(() => yTo(-4));
        const leave = contextSafe(() => yTo(0));
        tile.addEventListener("pointerenter", enter);
        tile.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          tile.removeEventListener("pointerenter", enter);
          tile.removeEventListener("pointerleave", leave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const live = wrap.querySelector<HTMLElement>(".forge__live");
      if (live && !reduce) {
        gsap.fromTo(live, { x: 22, autoAlpha: 0.35 }, { x: 0, autoAlpha: 1, duration: 0.5, ease: "power4.out" });
      }
      const bar = wrap.querySelector<HTMLElement>(".forge__tile.is-on .forge__prog i");
      const obj = { p: 0 };
      if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
      const tween = gsap.to(obj, {
        p: 1,
        duration: reduce ? 0.01 : 4.2,
        ease: "none",
        onUpdate: () => {
          if (bar) bar.style.transform = `scaleX(${obj.p})`;
        },
        onComplete: () => {
          if (!reduce) setActive((v) => (v + 1) % FEATURES.length);
        },
      });
      return () => tween.kill();
    },
    { dependencies: [active], scope: root }
  );

  return (
    <Chapter
      id="features"
      n="04"
      kicker="Features"
      title="The layer underneath every module"
      lead="AI scoring, WhatsApp, the talent pool, scheduling requests, the hiring dashboard and team permissions work the same way across every tool — learn it once, use it everywhere."
    >
      <div className="forge" ref={root}>
        <div className="forge__spine" aria-hidden="true">
          <i className="forge__line" />
          <i className="forge__draw" />
          <i className="forge__comet" />
        </div>
        <div className="forge__list" role="tablist" aria-label="Features">
          {FEATURES.map((feat, i) => {
            const TileIco = feat.ico;
            return (
              <Link
                key={feat.n}
                href={FEATURE_HREF[i]}
                role="tab"
                aria-selected={active === i}
                className={`forge__tile${active === i ? " is-on" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <span className="forge__n">{feat.n}</span>
                <span className="forge__ico"><TileIco /></span>
                <span className="forge__copy">
                  <b>{feat.title}</b>
                  <small>{feat.hint}</small>
                </span>
                {active === i && (
                  <span className="forge__prog" aria-hidden="true"><i /></span>
                )}
              </Link>
            );
          })}
        </div>
        <article className="forge__live" aria-live="polite">
          <span className="forge__liveK">{item.preview.kicker}</span>
          <div className="pc__row">
            <span className="pc__av" style={{ background: item.preview.bg }}>{item.preview.initials}</span>
            <span>
              <span className="pc__nm">{item.preview.name}</span>
              <span className="pc__mt">{item.preview.meta}</span>
            </span>
            <span className={`pc__tag${item.preview.kind === "score" || item.preview.kind === "pool" || item.preview.kind === "schedule" || item.preview.kind === "dash" ? " pc__tag--ok" : ""}`}>
              {item.preview.tag}
            </span>
          </div>
          <Preview kind={item.preview} />
          <p className="forge__liveB">{item.body}</p>
          <Link href={FEATURE_HREF[active]} className="link-arrow">
            Open {item.title} page <IconArrow />
          </Link>
          <span className="forge__liveIco"><Ico /></span>
        </article>
      </div>
      <div className="feats__cta split__cta">
        <Link href="/modules" className="btn btn--primary">Explore the modules</Link>
        <Link href="/pricing" className="link-arrow">
          Compare plans <IconArrow />
        </Link>
      </div>
    </Chapter>
  );
}
