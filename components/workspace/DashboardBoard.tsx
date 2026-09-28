"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IconArrow, IconInterview, IconPool, IconSchedule } from "@/lib/icons";
import type { Session } from "@/lib/session";
import { DeskScene } from "@/components/workspace/DeskBoard";

gsap.registerPlugin(useGSAP);

const STATS = [
  { n: 12, l: "Interviews in review", href: "/app/interviews", fill: "78%" },
  { n: 3, l: "Need a new slot", href: "/app/scheduling", fill: "42%" },
  { n: 8, l: "Warm in the pool", href: "/app/talent-pool", fill: "64%" },
  { n: 4, l: "Live job forms", href: "/app/job-forms", fill: "55%" },
];

const LIVE = [
  { av: "LC", bg: "var(--sky)", name: "Lian Chen", meta: "Product Designer · Interview", tag: "In review", score: "94", note: "Strong communication — recommended to shortlist." },
  { av: "EV", bg: "var(--peach)", name: "Elena Vargas", meta: "Senior Designer · Assessment", tag: "Passed", score: "96", note: "Cleared every section above the pass mark." },
  { av: "DN", bg: "var(--peri)", name: "Dami Nwosu", meta: "Product Designer · Resume", tag: "Warm", score: "88", note: "Ranked from a batch of 50 and moved to the pool." },
];

const NEED = [
  { av: "LC", name: "Lian Chen", meta: "Asked for a new interview slot", tag: "Waiting", href: "/app/scheduling" },
  { av: "EV", name: "Elena Vargas", meta: "Reschedule needs your approval", tag: "Needs you", href: "/app/scheduling" },
  { av: "MH", name: "Maya Haddad", meta: "Reminder sent, no reply yet", tag: "Sent", href: "/app/scheduling" },
];

const LANES = [
  { href: "/app/interviews", ico: IconInterview, n: "01", title: "Interviews", hint: "12 waiting on a score" },
  { href: "/app/scheduling", ico: IconSchedule, n: "02", title: "Scheduling", hint: "3 requests still open" },
  { href: "/app/talent-pool", ico: IconPool, n: "03", title: "Talent pool", hint: "8 people kept warm" },
];

function hourLabel() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function DashboardBoard({ session }: { session: Session }) {
  const root = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(0);
  const [held, setHeld] = useState(false);
  const first = session.name.split(" ")[0];
  const live = LIVE[front];

  useGSAP(
    (_ctx, contextSafe) => {
      if (!contextSafe) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const hero = wrap.querySelectorAll<HTMLElement>(".dash__hero, .dash__stat, .dash__col, .dash__lane");
      if (reduce) {
        gsap.set(hero, { y: 0, opacity: 1 });
        return;
      }
      gsap.set(hero, { y: 18, opacity: 0 });
      gsap.to(hero, { y: 0, opacity: 1, stagger: 0.06, duration: 0.62, ease: "power4.out" });
      const meters = wrap.querySelectorAll<HTMLElement>(".dash__meter i");
      gsap.fromTo(meters, { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", transformOrigin: "0% 50%", delay: 0.2 });
      wrap.querySelectorAll<HTMLElement>(".dash__n").forEach((el) => {
        const end = Number(el.dataset.count || "0");
        const obj = { p: 0 };
        gsap.to(obj, {
          p: end,
          duration: 0.9,
          delay: 0.18,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.p));
          },
        });
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const card = wrap.querySelector<HTMLElement>(".dash__focus");
      if (card && !reduce) {
        gsap.fromTo(card, { y: 14, autoAlpha: 0.35 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power4.out" });
      }
      const bar = wrap.querySelector<HTMLElement>(".dash__prog i");
      if (held) {
        if (bar) gsap.set(bar, { scaleX: 1, transformOrigin: "0% 50%" });
        return;
      }
      const obj = { p: 0 };
      if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
      const tween = gsap.to(obj, {
        p: 1,
        duration: reduce ? 0.01 : 3.6,
        ease: "none",
        onUpdate: () => {
          if (bar) bar.style.transform = `scaleX(${obj.p})`;
        },
        onComplete: () => {
          if (!reduce && !held) setFront((v) => (v + 1) % LIVE.length);
        },
      });
      return () => tween.kill();
    },
    { dependencies: [front, held], scope: root }
  );

  return (
    <div className="dash desk desk--home" ref={root}>
      <section className="dash__hero">
        <i className="dash__aurora" aria-hidden="true" />
        <i className="dash__aurora dash__aurora--2" aria-hidden="true" />
        <div className="dash__hello">
          <span className="dash__live"><i />Live desk</span>
          <h2>{hourLabel()}, {first}.</h2>
          <p>
            {session.company || "Your team"} · {session.email}. Interviews, reschedules and the talent pool are waiting on this desk.
          </p>
          <div className="dash__cta">
            <Link href="/app/interviews" className="btn btn--primary">Review interviews <IconArrow /></Link>
            <Link href="/app/scheduling" className="link-arrow">Clear requests</Link>
          </div>
          <div className="dash__tape" aria-hidden="true">
            <span>Lian Chen · Q2 scored 94</span>
            <span>Elena Vargas · assessment pass</span>
            <span>Maya Haddad · new slot requested</span>
            <span>Dami Nwosu · moved to the pool</span>
            <span>Lian Chen · Q2 scored 94</span>
            <span>Elena Vargas · assessment pass</span>
          </div>
        </div>
        <DeskScene value="12" label="in review" />
      </section>

      <div className="dash__stats">
        {STATS.map((item) => (
          <Link key={item.l} href={item.href} className="dash__stat">
            <small>{item.l}</small>
            <b className="dash__n" data-count={item.n}>0</b>
            <span className="dash__meter"><i style={{ width: item.fill }} /></span>
          </Link>
        ))}
      </div>

      <div className="dash__split">
        <article className="dash__col">
          <div className="dash__head">
            <span>Live shortlist</span>
            <b>{String(front + 1).padStart(2, "0")} / 03</b>
          </div>
          <div className="dash__stage">
            {LIVE.map((card, i) => (
              <button
                key={card.name}
                type="button"
                className={`dash__stack${i === front ? " is-on" : ""}`}
                onClick={() => {
                  setHeld(true);
                  setFront(i);
                }}
              >
                {card.name.split(" ")[0]}
              </button>
            ))}
          </div>
          <div className="dash__focus">
            <div className="dash__row">
              <span className="pc__av" style={{ background: live.bg }}>{live.av}</span>
              <span>
                <span className="pc__nm">{live.name}</span>
                <span className="pc__mt">{live.meta}</span>
              </span>
              <span className="pc__tag pc__tag--ok">{live.tag}</span>
              <strong>{live.score}</strong>
            </div>
            <p>{live.note}</p>
            <span className="dash__prog" aria-hidden="true"><i /></span>
          </div>
        </article>

        <article className="dash__col">
          <div className="dash__head">
            <span>Needs you</span>
            <Link href="/app/scheduling">Open all</Link>
          </div>
          <ul className="dash__need">
            {NEED.map((row) => (
              <li key={row.name}>
                <Link href={row.href}>
                  <span className="ws__av">{row.av}</span>
                  <span>
                    <b>{row.name}</b>
                    <small>{row.meta}</small>
                  </span>
                  <em>{row.tag}</em>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="dash__lanes">
        {LANES.map((lane) => {
          const Ico = lane.ico;
          return (
            <Link key={lane.href} href={lane.href} className="dash__lane">
              <span>{lane.n}</span>
              <span className="dash__laneIco"><Ico /></span>
              <b>{lane.title}</b>
              <small>{lane.hint}</small>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
