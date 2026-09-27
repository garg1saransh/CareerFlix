"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Chapter } from "@/components/landing/Chapter";
import { FLOW_HREF } from "@/lib/paths";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = [
  {
    n: "01",
    title: "One link, not a calendar",
    body: "Candidates record their interview or sit their assessment whenever suits them.",
    kicker: "Invite sent",
    name: "Lian Chen",
    meta: "Video interview · Product Designer",
    tag: "Waiting",
    msg: "Strong communication and directly relevant experience — recommended to shortlist.",
    initials: "LC",
    bg: "var(--sky)",
    kind: "invite" as const,
  },
  {
    n: "02",
    title: "Every response scored automatically",
    body: "Interviews, assessments and resumes all get an AI-generated score and summary.",
    kicker: "Scored",
    name: "Elena Vargas",
    meta: "Skills assessment · Senior Designer",
    tag: "Passed · 96%",
    msg: "Cleared every section above the pass mark; auto-advanced for team review.",
    initials: "EV",
    bg: "var(--peach)",
    kind: "score" as const,
  },
  {
    n: "03",
    title: "Your team makes the call",
    body: "Review the ranking, comment, shortlist and push strong candidates into your talent pool.",
    kicker: "Decision",
    name: "Dami Nwosu",
    meta: "Resume analysis · Product Designer",
    tag: "Shortlisted",
    msg: "Ranked from a batch of 50 resumes and moved into the talent pool for this role.",
    initials: "DN",
    bg: "var(--peri)",
    kind: "decide" as const,
  },
];

const METERS = [
  { label: "Communication", width: "96%" },
  { label: "Craft", width: "94%" },
  { label: "Role fit", width: "92%" },
];

const DECISIONS = [
  { av: "EV", bg: "var(--peach)", name: "Elena Vargas", score: "96", tag: "Advance" },
  { av: "LC", bg: "var(--sky)", name: "Lian Chen", score: "94", tag: "Shortlist" },
  { av: "DN", bg: "var(--peri)", name: "Dami Nwosu", score: "88", tag: "Pool" },
];

function Scene({ step }: { step: (typeof STEPS)[number] }) {
  if (step.kind === "invite") {
    return (
      <div className="walk__scene">
        <div className="walk__mail">
          <div className="walk__mailh">
            <span>Invite ready</span>
            <span>Just now</span>
          </div>
          <strong>Your Product Designer interview is ready</strong>
          <p>One link. Lian records when it suits her — no calendar ping-pong.</p>
          <div className="walk__link">
            <span>careerflix.app / i / product-designer</span>
            <b>Copied</b>
          </div>
        </div>
        <ol className="walk__path">
          <li className="is-done"><span>01</span>Sent</li>
          <li className="is-done"><span>02</span>Opened</li>
          <li className="is-on"><span>03</span>Waiting</li>
        </ol>
      </div>
    );
  }

  if (step.kind === "decide") {
    return (
      <div className="walk__scene walk__scene--list">
        {DECISIONS.map((row, i) => (
          <div className="walk__row" key={row.name}>
            <em>{String(i + 1).padStart(2, "0")}</em>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <b className="walk__pts">{row.score}</b>
            <span className="pc__tag pc__tag--ok">{row.tag}</span>
          </div>
        ))}
        <p className="pc__msg">{step.msg}</p>
      </div>
    );
  }

  return (
    <div className="walk__scene walk__scene--score">
      <div className="walk__mark">
        <b>96</b>
        <small>AI score</small>
      </div>
      <div className="walk__meters">
        {METERS.map((meter) => (
          <div key={meter.label}>
            <span>{meter.label}</span>
            <i className="walk__meter"><b style={{ width: meter.width }} /></i>
          </div>
        ))}
        <p className="pc__msg">{step.msg}</p>
      </div>
    </div>
  );
}

export function FlowStudio() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const step = STEPS[active];

  useGSAP(
    (_ctx, contextSafe) => {
      if (!contextSafe) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const cleanups: Array<() => void> = [];
      const stops = wrap.querySelectorAll<HTMLElement>(".walk__stop");

      if (stops.length && !reduce) {
        const play = () =>
          gsap.to(stops, { y: 0, opacity: 1, stagger: 0.08, duration: 0.68, ease: "power4.out", overwrite: true });
        gsap.set(stops, { y: 18, opacity: 0 });
        if (wrap.getBoundingClientRect().top < window.innerHeight * 0.9) play();
        ScrollTrigger.create({
          trigger: wrap,
          start: "top 82%",
          once: true,
          onEnter: play,
          onEnterBack: play,
          onRefresh: (self) => {
            if (self.scroll() >= self.start) play();
          },
        });
      } else {
        gsap.set(stops, { y: 0, opacity: 1 });
      }

      stops.forEach((btn) => {
        const yTo = gsap.quickTo(btn, "y", { duration: 0.32, ease: "power3.out" });
        const enter = contextSafe(() => yTo(-4));
        const leave = contextSafe(() => yTo(0));
        btn.addEventListener("pointerenter", enter);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointerenter", enter);
          btn.removeEventListener("pointerleave", leave);
        });
      });

      const onKey = contextSafe((event: KeyboardEvent) => {
        const section = document.getElementById("how-it-works");
        if (!section) return;
        const box = section.getBoundingClientRect();
        if (box.top > window.innerHeight * 0.72 || box.bottom < 72) return;
        if (event.key === "ArrowRight") setActive((v) => (v + 1) % STEPS.length);
        if (event.key === "ArrowLeft") setActive((v) => (v - 1 + STEPS.length) % STEPS.length);
      });
      window.addEventListener("keydown", onKey);
      cleanups.push(() => window.removeEventListener("keydown", onKey));

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const live = wrap.querySelector<HTMLElement>(".walk__live");
      const name = wrap.querySelector<HTMLElement>(".walk__who");
      const draw = wrap.querySelector<HTMLElement>(".walk__draw");
      const comet = wrap.querySelector<HTMLElement>(".walk__comet");
      const track = wrap.querySelector<HTMLElement>(".walk__track");

      if (live && !reduce) {
        gsap.fromTo(live, { y: 16, autoAlpha: 0.28 }, { y: 0, autoAlpha: 1, duration: 0.52, ease: "power4.out" });
      }
      if (name && !reduce) {
        gsap.fromTo(name, { y: 8, autoAlpha: 0.3 }, { y: 0, autoAlpha: 1, duration: 0.34, ease: "power4.out" });
      }
      if (draw) {
        gsap.to(draw, {
          scaleX: (active + 1) / STEPS.length,
          duration: reduce ? 0.01 : 0.55,
          ease: "power3.out",
          transformOrigin: "0% 50%",
        });
      }
      if (comet && track) {
        gsap.to(comet, {
          x: Math.max(0, track.offsetWidth * ((active + 0.5) / STEPS.length) - 6),
          duration: reduce ? 0.01 : 0.55,
          ease: "power3.out",
        });
      }

      const meters = wrap.querySelectorAll<HTMLElement>(".walk__meter b");
      if (meters.length && !reduce) {
        gsap.fromTo(meters, { scaleX: 0 }, { scaleX: 1, duration: 0.8, stagger: 0.08, ease: "power3.out", transformOrigin: "0% 50%" });
      }
      const mark = wrap.querySelector<HTMLElement>(".walk__mark b");
      if (mark && !reduce) {
        gsap.fromTo(mark, { scale: 0.72, autoAlpha: 0.2 }, { scale: 1, autoAlpha: 1, duration: 0.55, ease: "power4.out" });
      }
      const rows = wrap.querySelectorAll<HTMLElement>(".walk__row");
      if (rows.length && !reduce) {
        gsap.fromTo(rows, { x: 18, autoAlpha: 0.2 }, { x: 0, autoAlpha: 1, duration: 0.45, stagger: 0.07, ease: "power4.out" });
      }
      const path = wrap.querySelectorAll<HTMLElement>(".walk__path li");
      if (path.length && !reduce) {
        gsap.fromTo(path, { y: 10, autoAlpha: 0.25 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08, ease: "power4.out" });
      }

      const bar = wrap.querySelector<HTMLElement>(".walk__stop.is-on .walk__prog i");
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
          if (!reduce) setActive((v) => (v + 1) % STEPS.length);
        },
      });
      return () => tween.kill();
    },
    { dependencies: [active], scope: root }
  );

  function go(dir: number) {
    setActive((v) => (v + dir + STEPS.length) % STEPS.length);
  }

  return (
    <Chapter
      id="how-it-works"
      n="01"
      kicker="How it works"
      title="From open role to shortlist, without the back-and-forth."
      lead="Build a structured interview, assessment or application form, send one link, and let CareerFlix score every response as it comes in. Your team reviews the ranked results and decides — nothing moves without you."
    >
      <div className="walk" ref={root}>
        <div className="walk__track" aria-hidden="true">
          <i className="walk__line" />
          <i className="walk__draw" />
          <i className="walk__comet" />
        </div>
        <div className="walk__rail" role="tablist" aria-label="How CareerFlix works">
          {STEPS.map((item, i) => (
            <Link
              key={item.n}
              href={FLOW_HREF[i]}
              role="tab"
              aria-selected={active === i}
              className={`walk__stop${active === i ? " is-on" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <span>{item.n}</span>
              <b>{item.title}</b>
              <small>{item.body}</small>
              {active === i && (
                <em className="walk__prog" aria-hidden="true"><i /></em>
              )}
            </Link>
          ))}
        </div>
        <div className="walk__board">
          <div className="walk__chrome">
            <span className="walk__now"><i />{step.kicker}</span>
            <b className="walk__who">{step.name}</b>
            <span className="walk__idx">0{active + 1} / 03</span>
            <div className="walk__dirs">
              <button type="button" aria-label="Previous step" onClick={() => go(-1)}>‹</button>
              <button type="button" aria-label="Next step" onClick={() => go(1)}>›</button>
            </div>
          </div>
          <article className="walk__live">
            <div className="walk__person">
              <span className="pc__av" style={{ background: step.bg }}>{step.initials}</span>
              <span>
                <span className="pc__nm">{step.name}</span>
                <span className="pc__mt">{step.meta}</span>
              </span>
              <span className="pc__tag pc__tag--ok">{step.tag}</span>
            </div>
            <Scene step={step} />
            <Link href={FLOW_HREF[active]} className="link-arrow">Open this step</Link>
          </article>
        </div>
      </div>
      <div className="walk__foot">
        <div className="stats">
          <div>
            <div className="stat__n"><span data-count="62">0</span><span>%</span></div>
            <div className="stat__l">Faster time-to-hire</div>
          </div>
          <div>
            <div className="stat__n"><span data-count="8">0</span></div>
            <div className="stat__l">Tools in one account, one login</div>
          </div>
          <div>
            <div className="stat__n"><span data-count="14">0</span><span>-day</span></div>
            <div className="stat__l">Free trial, every module unlocked</div>
          </div>
        </div>
        <Link href="/modules" className="btn btn--light">See all eight modules</Link>
      </div>
    </Chapter>
  );
}
