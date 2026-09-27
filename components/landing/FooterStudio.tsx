"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandLogo } from "@/components/BrandLogo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PRODUCT = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/modules", label: "Modules" },
  { href: "/desk", label: "Hiring desk" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
];

const ACCOUNT = [
  { href: "/login", label: "Sign in" },
  { href: "/support", label: "Contact support" },
  { href: "/demo", label: "Book a demo" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function FooterStudio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      if (!contextSafe) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;
      const cleanups: Array<() => void> = [];
      const bits = wrap.querySelectorAll<HTMLElement>(".end__brand, .end__col, .end__cta, .end__bar");
      const draw = wrap.querySelector<HTMLElement>(".end__draw");

      if (bits.length && !reduce) {
        const play = () =>
          gsap.to(bits, { y: 0, opacity: 1, stagger: 0.07, duration: 0.68, ease: "power4.out", overwrite: true });
        gsap.set(bits, { y: 18, opacity: 0 });
        const tryPlay = () => {
          const box = wrap.getBoundingClientRect();
          if (box.top < window.innerHeight * 0.94 && box.bottom > 40) play();
        };
        tryPlay();
        ScrollTrigger.create({
          trigger: wrap,
          start: "top 90%",
          once: true,
          onEnter: play,
          onEnterBack: play,
          onRefresh: (self) => {
            if (self.scroll() >= self.start) play();
          },
        });
        const io = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) play();
        }, { threshold: 0.08 });
        io.observe(wrap);
        cleanups.push(() => io.disconnect());
        gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
      } else {
        gsap.set(bits, { y: 0, opacity: 1 });
      }

      if (draw && !reduce) {
        gsap.fromTo(
          draw,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "0% 50%",
            scrollTrigger: { trigger: wrap, start: "top 92%", end: "top 60%", scrub: 0.35 },
          }
        );
      }

      wrap.querySelectorAll<HTMLElement>(".end__col a").forEach((link) => {
        const xTo = gsap.quickTo(link, "x", { duration: 0.28, ease: "power3.out" });
        const enter = contextSafe(() => xTo(4));
        const leave = contextSafe(() => xTo(0));
        link.addEventListener("pointerenter", enter);
        link.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          link.removeEventListener("pointerenter", enter);
          link.removeEventListener("pointerleave", leave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: root }
  );

  return (
    <footer className="end" ref={root}>
      <i className="end__line" aria-hidden="true" />
      <i className="end__draw" aria-hidden="true" />
      <div className="wrap end__grid">
        <div className="end__brand">
          <BrandLogo href="/" />
          <p>
            Video interviews, assessments, job forms, talent pool, scheduling, employee management and resume tools — one platform for the whole hiring process.
          </p>
        </div>
        <nav className="end__nav" aria-label="Footer">
          <div className="end__col">
            <span>Product</span>
            {PRODUCT.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div className="end__col">
            <span>Account</span>
            {ACCOUNT.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </nav>
        <div className="end__cta">
          <span>Get started</span>
          <Link href="/signup" className="btn btn--primary">Start free trial</Link>
          <Link href="/demo" className="btn btn--ghost">Book a demo</Link>
        </div>
      </div>
      <div className="wrap end__bar">
        <p>© 2026 CareerFlix. All rights reserved.</p>
      </div>
    </footer>
  );
}
