"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IconArrow } from "@/lib/icons";
import type { DeskCopy } from "@/lib/desks";

gsap.registerPlugin(useGSAP);

const ACTS: Record<string, string[]> = {
  interviews: ["Play clip", "Shortlist"],
  "talent-pool": ["Keep warm", "Invite again"],
  scheduling: ["Approve slot", "Offer times"],
  assessments: ["Open score", "Move on"],
  "job-forms": ["Open form", "Rank batch"],
  employees: ["Scope access", "Send ping"],
  analyser: ["Move to interview", "Keep in pool"],
  editor: ["Apply template", "Share pack"],
  support: ["Book 20 min", "Email the desk"],
  applications: ["Open loop", "See score"],
  "c-interviews": ["Record clip", "Re-record"],
  "c-applications": ["Open loop", "See score"],
};

export function DeskScene({
  value,
  label,
  playing,
}: {
  value: string;
  label: string;
  playing?: boolean;
}) {
  return (
    <div className={`desk__scene${playing ? " is-play" : ""}`} aria-hidden="true">
      <i className="desk__orb desk__orb--a" />
      <i className="desk__orb desk__orb--b" />
      <div className="desk__wave">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${i * 0.09}s` }} />
        ))}
      </div>
      <div className="dash__today">
        <span>Now</span>
        <b>{value}</b>
        <small>{label}</small>
        <em className="dash__ring" />
      </div>
    </div>
  );
}

export function DeskBoard({ desk, tone }: { desk: DeskCopy; tone: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [front, setFront] = useState(0);
  const [held, setHeld] = useState(false);
  const [filter, setFilter] = useState("All");
  const [playing, setPlaying] = useState(false);
  const [ack, setAck] = useState<Record<string, string>>({});
  const [toggles, setToggles] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(desk.rows.map((row) => [row.name, row.tag === "On"]))
  );
  const [entered, setEntered] = useState<Record<string, boolean>>({});

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(desk.rows.map((row) => row.tag)))],
    [desk]
  );
  const visible = useMemo(
    () => (filter === "All" ? desk.rows : desk.rows.filter((row) => row.tag === filter)),
    [desk, filter]
  );
  const live = visible[front] ?? visible[0];
  const acts = desk.mode ? [] : ACTS[tone] || ["Mark done", "Open record"];
  const tape = desk.rows.map((row) => `${row.name} · ${row.tag}`);

  useEffect(() => {
    setFront(0);
    setHeld(false);
    setFilter("All");
    setPlaying(false);
    setAck({});
    setEntered({});
    setToggles(Object.fromEntries(desk.rows.map((row) => [row.name, row.tag === "On"])));
  }, [desk.title]);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const bits = wrap.querySelectorAll<HTMLElement>(".dash__hero, .dash__stat, .dash__col, .dash__lane");
      if (reduce) {
        gsap.set(bits, { y: 0, opacity: 1 });
        return;
      }
      gsap.set(bits, { y: 18, opacity: 0 });
      gsap.to(bits, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: "power4.out" });
      const meters = wrap.querySelectorAll<HTMLElement>(".dash__meter i, .desk__spark i");
      gsap.fromTo(
        meters,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.85, stagger: 0.05, ease: "power3.out", transformOrigin: "0% 50%", delay: 0.14 }
      );
      wrap.querySelectorAll<HTMLElement>(".dash__n").forEach((el) => {
        const end = Number(el.dataset.count || "0");
        const obj = { p: 0 };
        gsap.to(obj, {
          p: end,
          duration: 0.85,
          delay: 0.12,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.p));
          },
        });
      });
    },
    { scope: root, dependencies: [desk.title] }
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const card = wrap.querySelector<HTMLElement>(".dash__focus");
      if (card && !reduce) {
        gsap.fromTo(card, { y: 12, autoAlpha: 0.4 }, { y: 0, autoAlpha: 1, duration: 0.42, ease: "power4.out" });
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
        duration: reduce ? 0.01 : 3.8,
        ease: "none",
        onUpdate: () => {
          if (bar) bar.style.transform = `scaleX(${obj.p})`;
        },
        onComplete: () => {
          if (!reduce && !held && visible.length) setFront((v) => (v + 1) % visible.length);
        },
      });
      return () => tween.kill();
    },
    { dependencies: [front, desk.title, held, filter], scope: root }
  );

  function rowTag(name: string, fallback: string) {
    if (desk.mode === "toggles") return toggles[name] ? "On" : "Off";
    if (desk.mode === "apply") return entered[name] ? "Entered" : fallback;
    return ack[name] || fallback;
  }

  function runAct(label: string) {
    if (!live) return;
    setHeld(true);
    if (label.toLowerCase().includes("play")) {
      setPlaying((v) => !v);
      return;
    }
    setAck((cur) => ({ ...cur, [live.name]: label }));
  }

  if (!live) return null;

  return (
    <div className={`dash desk desk--${tone}`} ref={root}>
      <section className="dash__hero">
        <i className="dash__aurora" aria-hidden="true" />
        <i className="dash__aurora dash__aurora--2" aria-hidden="true" />
        <div className="dash__hello">
          <span className="dash__live"><i />{desk.kicker}</span>
          <h2>{desk.headline}</h2>
          <p>{desk.lead}</p>
          <div className="dash__cta">
            <Link href={desk.cta.href} className="btn btn--primary">{desk.cta.label} <IconArrow /></Link>
            <Link href={desk.next.href} className="link-arrow">{desk.next.label}</Link>
          </div>
          <div className="dash__tape" aria-hidden="true">
            {tape.concat(tape).map((line, i) => (
              <span key={line + i}>{line}</span>
            ))}
          </div>
        </div>
        <DeskScene value={desk.ring.value} label={desk.ring.label} playing={playing} />
      </section>

      <div className="dash__stats">
        {desk.stats.map((item) => (
          <div key={item.l} className="dash__stat">
            <small>{item.l}</small>
            <b className="dash__n" data-count={item.n}>0</b>
            <span className="dash__meter"><i style={{ width: item.fill }} /></span>
          </div>
        ))}
      </div>

      <div className="dash__split">
        <article className="dash__col">
          <div className="dash__head">
            <span>On this desk</span>
            <b>{String(front + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</b>
          </div>
          <div className="desk__filters" role="tablist" aria-label="Filter this desk">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                role="tab"
                aria-selected={filter === tag}
                className={`desk__chip${filter === tag ? " is-on" : ""}`}
                onClick={() => {
                  setHeld(true);
                  setFilter(tag);
                  setFront(0);
                }}
              >
                {tag}
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
              <span className="pc__tag pc__tag--ok">{rowTag(live.name, live.tag)}</span>
              {live.score !== "—" ? <strong>{live.score}</strong> : null}
            </div>
            <p>{live.note}</p>
            {ack[live.name] ? <span className="desk__ack">{ack[live.name]} · on this record</span> : null}
            {desk.mode === "apply" ? (
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => {
                  setHeld(true);
                  setEntered((cur) => ({ ...cur, [live.name]: !cur[live.name] }));
                }}
              >
                {entered[live.name] ? "Entered" : "Enter this role"}
              </button>
            ) : null}
            {desk.mode === "toggles" ? (
              <button
                type="button"
                className={`desk__switch${toggles[live.name] ? " is-on" : ""}`}
                aria-pressed={!!toggles[live.name]}
                onClick={() => {
                  setHeld(true);
                  setToggles((cur) => ({ ...cur, [live.name]: !cur[live.name] }));
                }}
              >
                <i />
                <span>{toggles[live.name] ? "On" : "Off"}</span>
              </button>
            ) : null}
            {acts.length ? (
              <div className="desk__acts">
                {acts.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={`desk__act${playing && label.toLowerCase().includes("play") ? " is-on" : ""}`}
                    onClick={() => runAct(label)}
                  >
                    {playing && label.toLowerCase().includes("play") ? "Playing" : label}
                  </button>
                ))}
              </div>
            ) : null}
            <span className="dash__prog" aria-hidden="true"><i /></span>
          </div>
        </article>

        <article className="dash__col">
          <div className="dash__head">
            <span>The list</span>
            <span>{visible.length} live</span>
          </div>
          <ul className="desk__list">
            {visible.map((row, i) => (
              <li key={row.name}>
                <button
                  type="button"
                  className={`desk__item${i === front ? " is-on" : ""}`}
                  onClick={() => {
                    setHeld(true);
                    setFront(i);
                  }}
                >
                  <span className="ws__av" style={{ background: row.bg }}>{row.av}</span>
                  <span>
                    <b>{row.name}</b>
                    <small>{row.meta}</small>
                    {row.score !== "—" ? (
                      <span className="desk__spark" aria-hidden="true">
                        <i style={{ width: `${row.score}%` }} />
                      </span>
                    ) : null}
                  </span>
                  <em>{rowTag(row.name, row.tag)}</em>
                  {row.score !== "—" ? <strong>{row.score}</strong> : null}
                </button>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="dash__lanes">
        {desk.lanes.map((lane) => (
          <Link key={lane.href + lane.n} href={lane.href} className="dash__lane">
            <span>{lane.n}</span>
            <b>{lane.title}</b>
            <small>{lane.hint}</small>
          </Link>
        ))}
      </div>
    </div>
  );
}
