"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { SCORE_HREF } from "@/lib/paths";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const CARDS = [
  {
    id: "lc",
    initials: "LC",
    name: "Lian Chen",
    meta: "Video interview · Product Designer",
    source: "Interview",
    score: "94",
    note: "Strong communication — recommended to shortlist.",
    action: "Shortlist",
    bg: "var(--sky)",
  },
  {
    id: "ev",
    initials: "EV",
    name: "Elena Vargas",
    meta: "Skills assessment · Senior Designer",
    source: "Assessment",
    score: "96",
    note: "Cleared every section above the pass mark.",
    action: "Advance",
    bg: "var(--peach)",
  },
  {
    id: "dn",
    initials: "DN",
    name: "Dami Nwosu",
    meta: "Resume analysis · Product Designer",
    source: "Resume",
    score: "88",
    note: "Ranked from a batch of 50 and moved to the pool.",
    action: "Keep warm",
    bg: "var(--peri)",
  },
];

export function ScoreDeck() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const front = CARDS[active];

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const cards = wrap.querySelectorAll<HTMLElement>(".deck__card");
      if (!cards.length) return;

      cards.forEach((card, i) => {
        const slot = (i - active + CARDS.length) % CARDS.length;
        const pose =
          slot === 0
            ? { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3, autoAlpha: 1 }
            : slot === 1
              ? { x: 36, y: 22, rotate: 5, scale: 0.93, zIndex: 2, autoAlpha: 0.68 }
              : { x: -28, y: 36, rotate: -6, scale: 0.88, zIndex: 1, autoAlpha: 0.4 };
        gsap.to(card, { ...pose, duration: reduce ? 0.01 : 0.72, ease: "power4.out", force3D: true });
      });

      const live = wrap.querySelector<HTMLElement>(".deck__live");
      const bar = wrap.querySelector<HTMLElement>(".deck__card.is-front .deck__bar i");
      if (live && !reduce) {
        gsap.fromTo(live, { y: 8, autoAlpha: 0.25 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power4.out" });
      }
      if (bar && !reduce) {
        gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: "power3.out", transformOrigin: "0% 50%" });
      }

      if (reduce) return;
      const hold = gsap.delayedCall(3.4, () => setActive((v) => (v + 1) % CARDS.length));
      return () => hold.kill();
    },
    { dependencies: [active], scope: root }
  );

  function step(dir: number) {
    setActive((v) => (v + dir + CARDS.length) % CARDS.length);
  }

  return (
    <section className="deck" aria-label="Live candidate scores">
      <div className="wrap deck__grid">
        <div className="deck__copy">
          <span className="eyebrow">Live shortlist</span>
          <h2 className="sec-title">Every response lands scored, not in a pile.</h2>
          <p className="sec-lead">
            Interviews, assessments and resumes share one record — so the next person who opens it already knows who to talk to.
          </p>
          <div className="deck__pills" role="tablist" aria-label="Score sources">
            {CARDS.map((card, i) => (
              <Link
                key={card.id}
                href={SCORE_HREF[i]}
                role="tab"
                aria-selected={active === i}
                className={active === i ? "is-on" : ""}
                onMouseEnter={() => setActive(i)}
              >
                {card.source}
              </Link>
            ))}
          </div>
        </div>
        <div className="deck__board" ref={root}>
          <div className="deck__chrome">
            <span className="deck__now">
              <i />
              Live scoring
            </span>
            <b className="deck__live">{front.name}</b>
            <span className="deck__idx">0{active + 1} / 03</span>
            <div className="deck__step">
              <button type="button" aria-label="Previous candidate" onClick={() => step(-1)}>‹</button>
              <button type="button" aria-label="Next candidate" onClick={() => step(1)}>›</button>
            </div>
          </div>
          <div className="deck__stage">
            {CARDS.map((card, i) => (
              <article
                key={card.id}
                className={`deck__card${active === i ? " is-front" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className="deck__top">
                  <span className="pc__av" style={{ background: card.bg }}>{card.initials}</span>
                  <span>
                    <span className="pc__nm">{card.name}</span>
                    <span className="pc__mt">{card.meta}</span>
                  </span>
                  <span className="deck__score">{card.score}</span>
                </div>
                <div className="deck__bar"><i style={{ width: `${card.score}%` }} /></div>
                <p className="pc__msg">{card.note}</p>
                <div className="deck__foot">
                  <Link href={SCORE_HREF[i]} className="pc__tag pc__tag--ok">{card.action}</Link>
                  <Link href={SCORE_HREF[i]} className="deck__src">{card.source}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
