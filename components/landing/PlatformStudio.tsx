"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowWide, IconBrand, IconData, IconLock } from "@/lib/icons";
import { Chapter } from "@/components/landing/Chapter";
import { PLATFORM_HREF } from "@/lib/paths";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SHELVES = [
  {
    n: "01",
    ico: IconBrand,
    kicker: "Branding",
    title: "Your brand, not ours",
    body: "Put your logo, colours and email templates on every screen a candidate sees — from the invite email to the interview itself and the CVs you send out.",
    vis: "brand" as const,
    live: "Brand kit",
  },
  {
    n: "02",
    ico: IconData,
    kicker: "Analytics, exports & webhooks",
    title: "Your data, out whenever you need it",
    body: "Export interview, assessment and resume data, or get events pushed to your own endpoint the moment they happen.",
    vis: "data" as const,
    live: "Event stream",
  },
  {
    n: "03",
    ico: IconLock,
    kicker: "Team roles & permissions",
    title: "Your team, your rules",
    body: "Invite teammates and scope each one to exactly the modules their role needs — nothing more.",
    vis: "team" as const,
    live: "Access",
  },
];

function HoldScene({ kind }: { kind: (typeof SHELVES)[number]["vis"] }) {
  if (kind === "brand") {
    return (
      <div className="hold__scene">
        <div className="hold__swatches" aria-hidden="true">
          <i style={{ background: "#9d6fff" }} />
          <i style={{ background: "#1a120c" }} />
          <i style={{ background: "#f8f1e8" }} />
          <i style={{ background: "#0c0a0c" }} />
        </div>
        <div className="hold__chips">
          {["Logo", "Brand colours", "Email templates", "Interview intro", "Interview farewell", "Branded CVs"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "data") {
    return (
      <div className="hold__scene hold__scene--data">
        <div className="hold__code">
          <div className="hold__codeh"><b>POST</b> /v1/webhooks</div>
          <pre>{`{
  "event": "interview.scored",
  "candidate": "product-designer-42",
  "score": 94
}`}</pre>
        </div>
        <ol className="hold__events">
          <li className="is-on"><span>Now</span>interview.scored</li>
          <li><span>2m</span>assessment.passed</li>
          <li><span>6m</span>resume.ranked</li>
        </ol>
      </div>
    );
  }

  return (
    <div className="hold__scene hold__scene--list">
      {[
        { av: "EV", bg: "var(--peach)", name: "Elena Vargas", tag: "Recruiter", scope: "Interviews · Forms" },
        { av: "TM", bg: "var(--sky)", name: "Théo Moreau", tag: "Hiring Manager", scope: "Assessments · Pool" },
        { av: "DN", bg: "var(--lav)", name: "Dami Nwosu", tag: "Admin", scope: "All modules" },
      ].map((row) => (
        <div className="hold__row" key={row.name}>
          <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
          <span>
            <span className="pc__nm">{row.name}</span>
            <span className="pc__mt">{row.scope}</span>
          </span>
          <span className={`pc__tag${row.tag === "Admin" ? "" : " pc__tag--ok"}`}>{row.tag}</span>
        </div>
      ))}
    </div>
  );
}

export function PlatformStudio() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const item = SHELVES[active];
  const Ico = item.ico;

  useGSAP(
    (_ctx, contextSafe) => {
      if (!contextSafe) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const cleanups: Array<() => void> = [];
      const stops = wrap.querySelectorAll<HTMLElement>(".hold__stop");

      if (stops.length && !reduce) {
        const play = () =>
          gsap.to(stops, { y: 0, opacity: 1, stagger: 0.08, duration: 0.66, ease: "power4.out", overwrite: true });
        gsap.set(stops, { y: 18, opacity: 0 });
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
        }, { threshold: 0.12 });
        io.observe(wrap);
        cleanups.push(() => io.disconnect());
        gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
      } else {
        gsap.set(stops, { y: 0, opacity: 1 });
      }

      const draw = wrap.querySelector<HTMLElement>(".hold__draw");
      const comet = wrap.querySelector<HTMLElement>(".hold__comet");
      const track = wrap.querySelector<HTMLElement>(".hold__track");
      if (draw && !reduce) {
        gsap.set(draw, { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.to(draw, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: wrap, start: "top 80%", end: "bottom 55%", scrub: 0.45 },
        });
      }
      if (comet && track && !reduce) {
        gsap.fromTo(
          comet,
          { x: 0, opacity: 0.25 },
          {
            x: () => Math.max(0, track.offsetWidth - 12),
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: wrap, start: "top 80%", end: "bottom 55%", scrub: 0.45 },
          }
        );
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
        const section = document.getElementById("platform");
        if (!section) return;
        const box = section.getBoundingClientRect();
        if (box.top > window.innerHeight * 0.72 || box.bottom < 72) return;
        if (event.key === "ArrowRight") setActive((v) => (v + 1) % SHELVES.length);
        if (event.key === "ArrowLeft") setActive((v) => (v - 1 + SHELVES.length) % SHELVES.length);
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
      const live = wrap.querySelector<HTMLElement>(".hold__live");
      const name = wrap.querySelector<HTMLElement>(".hold__who");
      if (live && !reduce) {
        gsap.fromTo(live, { y: 16, autoAlpha: 0.28 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power4.out" });
      }
      if (name && !reduce) {
        gsap.fromTo(name, { y: 8, autoAlpha: 0.3 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: "power4.out" });
      }
      const bits = wrap.querySelectorAll<HTMLElement>(".hold__chips span, .hold__row, .hold__events li, .hold__swatches i");
      if (bits.length && !reduce) {
        gsap.fromTo(bits, { y: 10, autoAlpha: 0.2 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: "power4.out" });
      }

      const bar = wrap.querySelector<HTMLElement>(".hold__stop.is-on .hold__prog i");
      const obj = { p: 0 };
      if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
      const tween = gsap.to(obj, {
        p: 1,
        duration: reduce ? 0.01 : 4.4,
        ease: "none",
        onUpdate: () => {
          if (bar) bar.style.transform = `scaleX(${obj.p})`;
        },
        onComplete: () => {
          if (!reduce) setActive((v) => (v + 1) % SHELVES.length);
        },
      });
      return () => tween.kill();
    },
    { dependencies: [active], scope: root }
  );

  function go(dir: number) {
    setActive((v) => (v + dir + SHELVES.length) % SHELVES.length);
  }

  return (
    <Chapter
      id="platform"
      n="05"
      kicker="Your platform"
      title="Your brand, your data, your team"
      lead="Every candidate-facing screen carries your branding, every event can be exported or pushed to your own systems, and you decide who on your team sees what."
    >
      <div className="hold" ref={root}>
        <div className="hold__track" aria-hidden="true">
          <i className="hold__line" />
          <i className="hold__draw" />
          <i className="hold__comet" />
        </div>
        <div className="hold__rail" role="tablist" aria-label="Your platform">
          {SHELVES.map((shelf, i) => {
            const StopIco = shelf.ico;
            return (
              <Link
                key={shelf.n}
                href={PLATFORM_HREF[i]}
                role="tab"
                aria-selected={active === i}
                className={`hold__stop${active === i ? " is-on" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <span>{shelf.n}</span>
                <span className="hold__ico"><StopIco /></span>
                <b>{shelf.title}</b>
                <small>{shelf.kicker}</small>
                {active === i && (
                  <em className="hold__prog" aria-hidden="true"><i /></em>
                )}
              </Link>
            );
          })}
        </div>
        <div className="hold__board">
          <div className="hold__chrome">
            <span className="hold__now"><i />{item.live}</span>
            <b className="hold__who">{item.kicker}</b>
            <span className="hold__idx">0{active + 1} / 03</span>
            <div className="hold__dirs">
              <button type="button" aria-label="Previous platform item" onClick={() => go(-1)}>‹</button>
              <button type="button" aria-label="Next platform item" onClick={() => go(1)}>›</button>
            </div>
          </div>
          <article className="hold__live">
            <div className="hold__copy">
              <span className="hold__liveIco"><Ico /></span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link href={PLATFORM_HREF[active]} className="bcard__link">Open this page<IconArrowWide /></Link>
            </div>
            <HoldScene kind={item.vis} />
          </article>
        </div>
      </div>
    </Chapter>
  );
}
