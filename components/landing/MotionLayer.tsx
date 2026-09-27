"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.config({ force3D: true, nullTargetWarn: false });
gsap.defaults({ ease: "power3.out", overwrite: "auto", force3D: true });
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

function revealIn(els: Element[]) {
  gsap.to(els, {
    x: 0,
    y: 0,
    opacity: 1,
    stagger: 0.07,
    duration: 0.78,
    ease: "power4.out",
    overwrite: true,
  });
}

export function MotionLayer() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP((_ctx, contextSafe) => {
    if (!contextSafe) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bar = root.current?.querySelector(".fx-progress") as HTMLElement | null;
    const cleanups: Array<() => void> = [];

    gsap.ticker.lagSmoothing(500, 33);

    if (reduce) {
      return () => cleanups.forEach((fn) => fn());
    }

    if (bar) {
      gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
        },
      });
    }

    const heroTl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.7 },
    });
    heroTl.to(".hero__aurora", { xPercent: -8, yPercent: 12 }, 0);
    heroTl.to(".hero__orb", { xPercent: 10, rotation: 28 }, 0);
    heroTl.to(".hero__mesh", { xPercent: 6 }, 0);
    heroTl.to(".hero__inner", { x: -20, autoAlpha: 0.5 }, 0);
    heroTl.to(".hero__visual", { x: 24 }, 0);

    const intro = gsap.utils.toArray<HTMLElement>(".hero .badge, .hero__sub, .hero__cta, .hero__trust, .hero__metrics");
    gsap.fromTo(
      intro,
      { x: -28, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.09, duration: 0.8, ease: "power4.out", delay: 0.08 }
    );

    gsap.set(
      ".sec-title, .sec-lead, .mod__main, .mod__aside, .prices__head, .sec-head--center, .cta__inner, .eyebrow, .reveal",
      { clearProps: "opacity,visibility,transform" }
    );

    const firstWave = gsap.utils.toArray<HTMLElement>(
      ".price-card, .bcard, .stats > div, .mods__tab, .split__list li, .flow__steps li, .hero__metrics > div, .deck__copy, .film__label"
    );
    gsap.set(firstWave, { x: -32, opacity: 0, visibility: "inherit" });
    ScrollTrigger.batch(firstWave, {
      start: "top 88%",
      once: true,
      interval: 0.06,
      batchMax: 8,
      onEnter: revealIn,
      onEnterBack: revealIn,
    });

    const secondWave = gsap.utils.toArray<HTMLElement>(
      ".panel__card, .int, .brow, .price-card__inc li, .cta__btns .btn, .cta__note"
    );
    gsap.set(secondWave, { x: -18, opacity: 0 });
    ScrollTrigger.batch(secondWave, {
      start: "top 92%",
      once: true,
      interval: 0.05,
      batchMax: 10,
      onEnter: revealIn,
      onEnterBack: revealIn,
    });

    const flushSeen = (els: HTMLElement[]) => {
      const ready: HTMLElement[] = [];
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.94 && r.bottom > 40) ready.push(el);
      });
      if (ready.length) revealIn(ready);
    };
    flushSeen(firstWave);
    flushSeen(secondWave);

    const sections = gsap.utils.toArray<HTMLElement>(
      "#how-it-works, #modules, #features, #platform, #pricing, .cta, .footer, .chapter, .deck"
    );
    sections.forEach((section) => {
      const bits = Array.from(
        section.querySelectorAll<HTMLElement>(".prices__toggle, .cta__btns, .split__cta, .flow__meta")
      ).filter((el) => !el.closest(".reveal"));
      if (!bits.length) return;
      gsap.set(bits, { x: -16, opacity: 0 });
      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        gsap.to(bits, {
          x: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.7,
          ease: "power4.out",
        });
      };
      if (section.getBoundingClientRect().top < window.innerHeight * 0.9) play();
      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        once: true,
        onEnter: play,
        onEnterBack: play,
        onRefresh: (self) => {
          if (self.scroll() >= self.start) play();
        },
      });
    });

    const rail = document.querySelector<HTMLElement>(".flow__track");
    const draw = document.querySelector<HTMLElement>(".flow__draw");
    const comet = document.querySelector<HTMLElement>(".flow__comet");
    if (rail && draw) {
      gsap.set(draw, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.to(draw, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: rail, start: "top 82%", end: "top 36%", scrub: 0.45 },
      });
    }
    if (rail && comet) {
      gsap.fromTo(
        comet,
        { x: 0 },
        {
          x: () => Math.max(0, (rail.querySelector(".flow__line") as HTMLElement | null)?.offsetWidth || 0),
          ease: "none",
          scrollTrigger: { trigger: rail, start: "top 82%", end: "top 36%", scrub: 0.45 },
        }
      );
    }

    gsap.utils.toArray<HTMLElement>(".chapter__rail").forEach((rail) => {
      gsap.fromTo(
        rail,
        { x: -16, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
          scrollTrigger: { trigger: rail, start: "top 86%", once: true },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".feat-card, .shelf__row").forEach((card, i) => {
      gsap.fromTo(
        card,
        { x: i % 2 ? 28 : -28, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.72,
          ease: "power4.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".sec-title").forEach((title) => {
      ScrollTrigger.create({
        trigger: title,
        start: "top 88%",
        once: true,
        onEnter: () => title.classList.add("is-in"),
        onEnterBack: () => title.classList.add("is-in"),
      });
      if (title.getBoundingClientRect().top < window.innerHeight * 0.9) title.classList.add("is-in");
    });

    gsap.utils.toArray<HTMLElement>(".split__media .panel, .flow__stage .panel, .feats__stage .panel").forEach((panel) => {
      gsap.fromTo(
        panel,
        { x: 28 },
        {
          x: -16,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        }
      );
    });

    gsap.utils.toArray<HTMLElement>(".section .bar i").forEach((el) => {
      gsap.set(el, { scaleX: 0, transformOrigin: "0% 50%" });
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => gsap.to(el, { scaleX: 1, duration: 0.85, ease: "power3.out" }),
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const end = Number(el.dataset.count || 0);
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: end,
            duration: 1.15,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".hero .btn, .cta .btn, .split__cta .btn, .flow__meta .btn").forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });
      const enterBtn = contextSafe((event: Event) => {
        const e = event as PointerEvent;
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.14);
        yTo((e.clientY - r.top - r.height / 2) * 0.18);
      });
      const leaveBtn = contextSafe(() => {
        xTo(0);
        yTo(0);
      });
      btn.addEventListener("pointermove", enterBtn, { passive: true });
      btn.addEventListener("pointerleave", leaveBtn);
      cleanups.push(() => {
        btn.removeEventListener("pointermove", enterBtn);
        btn.removeEventListener("pointerleave", leaveBtn);
      });
    });

    gsap.utils.toArray<HTMLElement>(".price-card, .bcard").forEach((card) => {
      const rotY = gsap.quickTo(card, "rotateY", { duration: 0.45, ease: "power3.out" });
      const rotX = gsap.quickTo(card, "rotateX", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(card, "y", { duration: 0.45, ease: "power3.out" });
      const move = contextSafe((event: Event) => {
        const e = event as PointerEvent;
        const r = card.getBoundingClientRect();
        rotY(((e.clientX - r.left) / r.width - 0.5) * 5);
        rotX(-((e.clientY - r.top) / r.height - 0.5) * 4);
        yTo(-4);
      });
      const leave = contextSafe(() => {
        rotY(0);
        rotX(0);
        yTo(0);
      });
      card.addEventListener("pointermove", move, { passive: true });
      card.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => cleanups.forEach((fn) => fn());
  });

  return (
    <div className="fx" ref={root} aria-hidden="true">
      <div className="fx-progress" />
    </div>
  );
}
