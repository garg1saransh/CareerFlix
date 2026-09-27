"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MODULES } from "@/lib/data";
import { IconArrow, IconTick, MODULE_ICONS } from "@/lib/icons";
import { moduleHref } from "@/lib/paths";
import { Chapter } from "@/components/landing/Chapter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ModScene({ id }: { id: (typeof MODULES)[number]["id"] }) {
  if (id === "interviews") {
    return (
      <div className="kit__scene">
        <div className="kit__clip">
          <div className="kit__cliph">
            <span>Q2 · 60s</span>
            <b className="kit__rec"><i />Recording</b>
          </div>
          <strong>Walk us through a product you shipped end to end.</strong>
          <p>Lian answers on her own time — no calendar ping-pong.</p>
        </div>
        <ol className="kit__qlist">
          <li className="is-done"><span>01</span>Tell us about yourself</li>
          <li className="is-on"><span>02</span>A product you shipped</li>
          <li><span>03</span>How you handle disagreement</li>
        </ol>
      </div>
    );
  }

  if (id === "assessments") {
    return (
      <div className="kit__scene kit__scene--score">
        <div className="kit__mark">
          <b>96</b>
          <small>Pass mark 80</small>
        </div>
        <div className="kit__meters">
          {[
            { label: "Craft", width: "96%" },
            { label: "Systems", width: "91%" },
            { label: "Judgement", width: "88%" },
          ].map((row) => (
            <div key={row.label}>
              <span>{row.label}</span>
              <i className="kit__meter"><b style={{ width: row.width }} /></i>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (id === "forms") {
    return (
      <div className="kit__scene kit__scene--form">
        {[
          { label: "Role", value: "Product Designer", tag: "" },
          { label: "Portfolio", value: "figma.com/file/lian", tag: "" },
          { label: "Notice period", value: "Under 4 weeks", tag: "Knock-out passed" },
        ].map((row) => (
          <div className="kit__field" key={row.label}>
            <span>{row.label}</span>
            <b>{row.value}</b>
            {row.tag ? <em>{row.tag}</em> : null}
          </div>
        ))}
      </div>
    );
  }

  if (id === "analyser") {
    return (
      <div className="kit__scene kit__scene--list">
        <div className="kit__batch">
          <span>Batch · 50 resumes</span>
          <i className="kit__meter"><b style={{ width: "86%" }} /></i>
        </div>
        {[
          { av: "EV", bg: "var(--peach)", name: "Elena Vargas", score: "96" },
          { av: "LC", bg: "var(--sky)", name: "Lian Chen", score: "94" },
          { av: "DN", bg: "var(--peri)", name: "Dami Nwosu", score: "88" },
        ].map((row, i) => (
          <div className="kit__row" key={row.name}>
            <em>{String(i + 1).padStart(2, "0")}</em>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <b className="kit__pts">{row.score}</b>
          </div>
        ))}
      </div>
    );
  }

  if (id === "pool") {
    return (
      <div className="kit__scene kit__scene--list">
        <div className="kit__batch">
          <span>Warm bench · Product</span>
          <b className="kit__pts">12</b>
        </div>
        {[
          { av: "TM", bg: "var(--peach)", name: "Théo Moreau", score: "Ready" },
          { av: "RK", bg: "var(--lav)", name: "Rupinder Kaur", score: "Warm" },
          { av: "AS", bg: "var(--sky)", name: "Ana Silva", score: "Warm" },
        ].map((row, i) => (
          <div className="kit__row" key={row.name}>
            <em>{String(i + 1).padStart(2, "0")}</em>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <b className="kit__pts">{row.score}</b>
          </div>
        ))}
      </div>
    );
  }

  if (id === "schedule") {
    return (
      <div className="kit__scene kit__scene--list">
        <div className="kit__batch">
          <span>Open requests</span>
          <b className="kit__pts">3</b>
        </div>
        {[
          { av: "LC", bg: "var(--sky)", name: "Lian Chen", score: "New slot" },
          { av: "EV", bg: "var(--peach)", name: "Elena Vargas", score: "Approve" },
          { av: "MH", bg: "var(--lav)", name: "Maya Haddad", score: "Remind" },
        ].map((row, i) => (
          <div className="kit__row" key={row.name}>
            <em>{String(i + 1).padStart(2, "0")}</em>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <b className="kit__pts">{row.score}</b>
          </div>
        ))}
      </div>
    );
  }

  if (id === "people") {
    return (
      <div className="kit__scene kit__scene--list">
        <div className="kit__batch">
          <span>Team · scoped access</span>
          <b className="kit__pts">4</b>
        </div>
        {[
          { av: "DN", bg: "var(--peri)", name: "Dami Nwosu", score: "Admin" },
          { av: "EV", bg: "var(--peach)", name: "Elena Vargas", score: "Recruiter" },
          { av: "TM", bg: "var(--sky)", name: "Théo Moreau", score: "Manager" },
        ].map((row, i) => (
          <div className="kit__row" key={row.name}>
            <em>{String(i + 1).padStart(2, "0")}</em>
            <span className="pc__av" style={{ background: row.bg }}>{row.av}</span>
            <span className="pc__nm">{row.name}</span>
            <b className="kit__pts">{row.score}</b>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="kit__scene kit__scene--edit">
      <div className="kit__doc">
        <span>Before</span>
        <p>raw pdf · mixed fonts · missing dates</p>
      </div>
      <div className="kit__doc kit__doc--on">
        <span>Your template</span>
        <p>Brand colours, clean sections, ready to export.</p>
      </div>
    </div>
  );
}

export function ModuleStudio() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const mod = MODULES[active];
  const Icon = MODULE_ICONS[mod.id];

  useGSAP(
    (_ctx, contextSafe) => {
      if (!contextSafe) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const cleanups: Array<() => void> = [];
      const stops = wrap.querySelectorAll<HTMLElement>(".kit__stop");

      if (stops.length && !reduce) {
        const play = () =>
          gsap.to(stops, { y: 0, opacity: 1, stagger: 0.06, duration: 0.64, ease: "power4.out", overwrite: true });
        gsap.set(stops, { y: 16, opacity: 0 });
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

      stops.forEach((btn) => {
        const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3.out" });
        const enter = contextSafe(() => yTo(-3));
        const leave = contextSafe(() => yTo(0));
        btn.addEventListener("pointerenter", enter);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointerenter", enter);
          btn.removeEventListener("pointerleave", leave);
        });
      });

      const onKey = contextSafe((event: KeyboardEvent) => {
        const section = document.getElementById("modules");
        if (!section) return;
        const box = section.getBoundingClientRect();
        if (box.top > window.innerHeight * 0.72 || box.bottom < 72) return;
        if (event.key === "ArrowRight") setActive((v) => (v + 1) % MODULES.length);
        if (event.key === "ArrowLeft") setActive((v) => (v - 1 + MODULES.length) % MODULES.length);
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
      const live = wrap.querySelector<HTMLElement>(".kit__live");
      const name = wrap.querySelector<HTMLElement>(".kit__who");
      if (live && !reduce) {
        gsap.fromTo(live, { y: 16, autoAlpha: 0.28 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power4.out" });
      }
      if (name && !reduce) {
        gsap.fromTo(name, { y: 8, autoAlpha: 0.3 }, { y: 0, autoAlpha: 1, duration: 0.32, ease: "power4.out" });
      }
      const meters = wrap.querySelectorAll<HTMLElement>(".kit__meter b");
      if (meters.length && !reduce) {
        gsap.fromTo(meters, { scaleX: 0 }, { scaleX: 1, duration: 0.75, stagger: 0.07, ease: "power3.out", transformOrigin: "0% 50%" });
      }
      const bits = wrap.querySelectorAll<HTMLElement>(".kit__gets li, .kit__qlist li, .kit__field, .kit__row, .kit__doc");
      if (bits.length && !reduce) {
        gsap.fromTo(bits, { y: 10, autoAlpha: 0.2 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.04, ease: "power4.out" });
      }

      const bar = wrap.querySelector<HTMLElement>(".kit__stop.is-on .kit__prog i");
      const obj = { p: 0 };
      if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
      const tween = gsap.to(obj, {
        p: 1,
        duration: reduce ? 0.01 : 5.2,
        ease: "none",
        onUpdate: () => {
          if (bar) bar.style.transform = `scaleX(${obj.p})`;
        },
        onComplete: () => {
          if (!reduce) setActive((v) => (v + 1) % MODULES.length);
        },
      });
      return () => tween.kill();
    },
    { dependencies: [active], scope: root }
  );

  function go(dir: number) {
    setActive((v) => (v + dir + MODULES.length) % MODULES.length);
  }

  return (
    <Chapter
      id="modules"
      n="02"
      kicker="Modules"
      title="Eight tools your hiring team already needs"
      lead="Interviews, assessments, job forms, resume analysis, the resume editor, talent pool, scheduling requests and employee management — one login, one candidate record, one bill."
    >
      <div className="kit" ref={root}>
        <div className="kit__rail" role="tablist" aria-label="Modules">
          {MODULES.map((item, i) => {
            const TabIco = MODULE_ICONS[item.id];
            return (
              <Link
                key={item.id}
                href={moduleHref(item.id)}
                role="tab"
                id={`mod-tab-${item.id}`}
                aria-selected={active === i}
                aria-controls={`mod-panel-${item.id}`}
                className={`kit__stop${active === i ? " is-on" : ""}`}
                onMouseEnter={() => setActive(i)}
              >
                <span>{item.num}</span>
                <span className="kit__ico"><TabIco /></span>
                <b>{item.title}</b>
                <small>{item.subtitle}</small>
                {active === i && (
                  <em className="kit__prog" aria-hidden="true"><i /></em>
                )}
              </Link>
            );
          })}
        </div>
        <div className="kit__board">
          <div className="kit__chrome">
            <span className="kit__now"><i />{mod.kicker}</span>
            <b className="kit__who">{mod.title}</b>
            <span className="kit__idx">{String(active + 1).padStart(2, "0")} / {String(MODULES.length).padStart(2, "0")}</span>
            <div className="kit__dirs">
              <button type="button" aria-label="Previous module" onClick={() => go(-1)}>‹</button>
              <button type="button" aria-label="Next module" onClick={() => go(1)}>›</button>
            </div>
          </div>
          <article
            className="kit__live"
            id={`mod-panel-${mod.id}`}
            role="tabpanel"
            aria-labelledby={`mod-tab-${mod.id}`}
          >
            <div className="kit__copy">
              <span className="kit__liveIco"><Icon /></span>
              <h3>{mod.heading}</h3>
              <p>{mod.body}</p>
              <div className="kit__stat">
                <b>{mod.stat}</b>
                <small>{mod.statLabel}</small>
              </div>
              <Link href={moduleHref(mod.id)} className="link-arrow">
                Open {mod.title} page <IconArrow />
              </Link>
            </div>
            <ModScene id={mod.id} />
          </article>
          <div className="kit__gets">
            <span>What you get</span>
            <ul>
              {mod.items.map((item) => (
                <li key={item}>
                  <span className="mod__tick"><IconTick /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
