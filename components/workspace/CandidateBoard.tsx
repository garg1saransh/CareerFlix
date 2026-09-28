"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IconArrow, IconForms, IconInterview } from "@/lib/icons";
import { initials, type Session } from "@/lib/session";
import { DeskScene } from "@/components/workspace/DeskBoard";

gsap.registerPlugin(useGSAP);

const STATS = [
  { n: 3, l: "Roles in play", href: "/profile/applications", fill: "72%" },
  { n: 1, l: "Interview open", href: "/profile/interviews", fill: "48%" },
  { n: 2, l: "Answers recorded", href: "/profile/interviews", fill: "61%" },
  { n: 91, l: "Best score", href: "/profile/applications", fill: "91%" },
];

const NEXT = [
  { n: "02", title: "A product you shipped", meta: "Product Designer · 60s", tag: "Open", note: "Record one clip. The score lands on the same interview." },
  { n: "01", title: "Tell us about yourself", meta: "Product Designer · 60s", tag: "Done", note: "Already on file. You can re-record before they review." },
  { n: "03", title: "How you handle disagreement", meta: "Product Designer · 45s", tag: "Locked", note: "Unlocks after question 02 is in." },
];

const APPS = [
  { av: "PD", name: "Product Designer", meta: "Northwind · Interview invited", tag: "Active" },
  { av: "BE", name: "Backend Engineer", meta: "Helio · Assessment passed", tag: "Passed" },
  { av: "CS", name: "Customer Success", meta: "Orchard · Form submitted", tag: "In review" },
];

function hourLabel() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function CandidateBoard({ session }: { session: Session }) {
  const root = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(0);
  const [held, setHeld] = useState(false);
  const first = session.name.split(" ")[0];
  const live = NEXT[front];

  useGSAP(
    () => {
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
          if (!reduce && !held) setFront((v) => (v + 1) % NEXT.length);
        },
      });
      return () => tween.kill();
    },
    { dependencies: [front, held], scope: root }
  );

  return (
    <div className="dash desk desk--profile" ref={root}>
      <section className="dash__hero">
        <i className="dash__aurora" aria-hidden="true" />
        <i className="dash__aurora dash__aurora--2" aria-hidden="true" />
        <div className="dash__hello">
          <span className="dash__live"><i />Live profile</span>
          <h2>{hourLabel()}, {first}.</h2>
          <p>
            {session.email}. Your next clip, applications and invites stay on this desk.
          </p>
          <div className="dash__cta">
            <Link href="/profile/interviews" className="btn btn--primary">Continue interview <IconArrow /></Link>
            <Link href="/profile/applications" className="link-arrow">See applications</Link>
          </div>
          <div className="dash__tape" aria-hidden="true">
            <span>Q02 · A product you shipped</span>
            <span>Product Designer · invited</span>
            <span>Helio · assessment 91</span>
            <span>Q02 · A product you shipped</span>
          </div>
        </div>
        <DeskScene value={initials(session.name)} label="profile" />
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
            <span>Next clip</span>
            <b>{String(front + 1).padStart(2, "0")} / 03</b>
          </div>
          <div className="dash__stage">
            {NEXT.map((card, i) => (
              <button
                key={card.n}
                type="button"
                className={`dash__stack${i === front ? " is-on" : ""}`}
                onClick={() => {
                  setHeld(true);
                  setFront(i);
                }}
              >
                Q{card.n}
              </button>
            ))}
          </div>
          <div className="dash__focus">
            <div className="dash__row">
              <span className="pc__av" style={{ background: "var(--peri)" }}>{live.n}</span>
              <span>
                <span className="pc__nm">{live.title}</span>
                <span className="pc__mt">{live.meta}</span>
              </span>
              <span className="pc__tag pc__tag--ok">{live.tag}</span>
            </div>
            <p>{live.note}</p>
            <span className="dash__prog" aria-hidden="true"><i /></span>
          </div>
        </article>

        <article className="dash__col">
          <div className="dash__head">
            <span>Applications</span>
            <Link href="/profile/applications">Open all</Link>
          </div>
          <ul className="dash__need">
            {APPS.map((row) => (
              <li key={row.name}>
                <Link href="/profile/applications">
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
        <Link href="/profile/interviews" className="dash__lane">
          <span>01</span>
          <span className="dash__laneIco"><IconInterview /></span>
          <b>Interviews</b>
          <small>Question 02 is waiting</small>
        </Link>
        <Link href="/profile/applications" className="dash__lane">
          <span>02</span>
          <span className="dash__laneIco"><IconForms /></span>
          <b>Applications</b>
          <small>3 roles still in play</small>
        </Link>
        <Link href="/profile/jobs" className="dash__lane">
          <span>03</span>
          <span className="dash__laneIco"><IconForms /></span>
          <b>Jobs</b>
          <small>Open roles you can enter</small>
        </Link>
      </div>
    </div>
  );
}
