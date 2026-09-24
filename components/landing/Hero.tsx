"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TOUR_VIEWS, type TourView } from "@/lib/data";

gsap.registerPlugin(useGSAP);

const HOLD = 3.6;
const COUNT = TOUR_VIEWS.length;

function poseFor(slot: number, compact: boolean) {
  const k = compact ? 0.56 : 1;
  const table = [
    { x: 0, y: 0, z: 50, scale: 1, rotationY: 0, autoAlpha: 1, zIndex: 20 },
    { x: 88 * k, y: 12, z: -80, scale: 0.88, rotationY: -18, autoAlpha: 0.72, zIndex: 16 },
    { x: 152 * k, y: 26, z: -165, scale: 0.78, rotationY: -30, autoAlpha: 0.4, zIndex: 12 },
    { x: 190 * k, y: 42, z: -250, scale: 0.7, rotationY: -38, autoAlpha: 0.14, zIndex: 8 },
    { x: -190 * k, y: 42, z: -250, scale: 0.7, rotationY: 38, autoAlpha: 0.14, zIndex: 8 },
    { x: -152 * k, y: 26, z: -165, scale: 0.78, rotationY: 30, autoAlpha: 0.4, zIndex: 12 },
    { x: -88 * k, y: 12, z: -80, scale: 0.88, rotationY: 18, autoAlpha: 0.72, zIndex: 16 },
  ];
  return table[slot];
}

function Av({ initials, bg }: { initials: string; bg: string }) {
  return <span className="pc__av pcard__av" style={{ background: `var(${bg})` }}>{initials}</span>;
}

function Bar({ path }: { path: string }) {
  return (
    <div className="rot__bar">
      <span /><span /><span />
      <em>{path}</em>
    </div>
  );
}

function Head({ title, chip }: { title: string; chip: string }) {
  return (
    <div className="mock__head">
      <span className="mock__h">{title}</span>
      <span className="mock__chip">{chip}</span>
    </div>
  );
}

const HEAD_A = "Hiring software that does ";
const HEAD_B = "the boring parts";
const HEAD_C = " for you";
const HEAD_LEN = HEAD_A.length + HEAD_B.length + HEAD_C.length;

function TypedHeadline() {
  const root = useRef<HTMLHeadingElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const bRef = useRef<HTMLElement>(null);
  const cRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const aEl = aRef.current;
      const bEl = bRef.current;
      const cEl = cRef.current;
      const head = root.current;
      if (!aEl || !bEl || !cEl || !head) return;

      const paint = (count: number) => {
        const n = Math.max(0, Math.min(HEAD_LEN, Math.round(count)));
        if (n <= HEAD_A.length) {
          aEl.textContent = HEAD_A.slice(0, n);
          bEl.textContent = "";
          cEl.textContent = "";
        } else if (n <= HEAD_A.length + HEAD_B.length) {
          aEl.textContent = HEAD_A;
          bEl.textContent = HEAD_B.slice(0, n - HEAD_A.length);
          cEl.textContent = "";
        } else {
          aEl.textContent = HEAD_A;
          bEl.textContent = HEAD_B;
          cEl.textContent = HEAD_C.slice(0, n - HEAD_A.length - HEAD_B.length);
        }
      };

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        paint(HEAD_LEN);
        head.classList.add("is-typed");
        return;
      }

      paint(0);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: HEAD_LEN,
        duration: 2.55,
        delay: 0.28,
        ease: "none",
        onUpdate: () => paint(obj.v),
        onComplete: () => {
          paint(HEAD_LEN);
          head.classList.add("is-typed");
        },
      });
    },
    { scope: root }
  );

  return (
    <h1 ref={root} className="typed-head shine" aria-label="Hiring software that does the boring parts for you">
      <span className="typed-head__sizer" aria-hidden="true">
        {HEAD_A}
        <em>{HEAD_B}</em>
        {HEAD_C}
      </span>
      <span className="typed-head__live" aria-hidden="true">
        <span ref={aRef} />
        <em ref={bRef} />
        <span ref={cRef} />
        <i className="typed-caret" />
      </span>
    </h1>
  );
}

type Props = { onDemo: () => void };

export function Hero({ onDemo }: Props) {
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const items = copyRef.current?.querySelectorAll(".hero-in");
      if (!items?.length) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        items,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.14, duration: 1.15, delay: 0.04 }
      );
      const chips = copyRef.current?.querySelectorAll(".hero__trust li");
      if (chips?.length) {
        tl.fromTo(chips, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.7 }, "-=0.55");
      }
    },
    { scope: copyRef }
  );

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const compact = window.matchMedia("(max-width: 640px)").matches;

      cards.current.forEach((card, i) => {
        if (!card) return;
        const slot = (i - active + COUNT) % COUNT;
        const pose = poseFor(slot, compact);
        gsap.to(card, {
          ...pose,
          duration: reduce ? 0 : 1.35,
          ease: "expo.inOut",
          overwrite: "auto",
        });
        card.classList.toggle("is-front", i === active);
      });

      if (reduce) return;
      const front = cards.current[active];
      if (!front) return;
      const bits = front.querySelectorAll(".rise, .jcard, .ctrow, .slot, .orow, .tile");
      if (!bits.length) return;
      gsap.fromTo(
        bits,
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.5, ease: "expo.out", delay: 0.08, force3D: true }
      );
    },
    { dependencies: [active], scope: visualRef }
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const stage = visualRef.current?.querySelector(".rot__stage");
      if (!stage) return;
      const floatTween = gsap.to(stage, {
        y: -12,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        force3D: true,
      });
      const vis = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) floatTween.play();
          else floatTween.pause();
        },
        { threshold: 0.08 }
      );
      vis.observe(visualRef.current!);
      return () => {
        vis.disconnect();
        floatTween.kill();
      };
    },
    { scope: visualRef }
  );

  useGSAP(
    (_ctx, contextSafe) => {
      if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bar = visualRef.current?.querySelector<HTMLElement>(".rot__dot.is-on .rot__dot-prog");
      const prog = { v: 0 };
      if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
      const tween = gsap.to(prog, {
        v: 1,
        duration: HOLD,
        ease: "none",
        onUpdate: () => {
          if (bar) bar.style.transform = `scaleX(${prog.v})`;
        },
        onComplete: contextSafe(() => {
          if (bar) bar.style.transform = "scaleX(0)";
          setActive((v) => (v + 1) % COUNT);
        }),
      });
      return () => tween.kill();
    },
    { dependencies: [active, paused], scope: visualRef }
  );

  useGSAP(
    (_ctx, contextSafe) => {
      const root = visualRef.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const stage = root.querySelector(".rot");
      if (!stage) return;

      const rotY = gsap.quickTo(stage, "rotationY", { duration: 1.1, ease: "expo.out" });
      const rotX = gsap.quickTo(stage, "rotationX", { duration: 1.1, ease: "expo.out" });
      const onMove = contextSafe((event: Event) => {
        const e = event as PointerEvent;
        const rect = root.getBoundingClientRect();
        const dx = (e.clientX - rect.left) / rect.width - 0.5;
        const dy = (e.clientY - rect.top) / rect.height - 0.5;
        rotY(dx * 11);
        rotX(-dy * 8);
      });
      const onLeave = contextSafe(() => {
        rotY(0);
        rotX(0);
      });

      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: visualRef }
  );

  function go(view: TourView) {
    setActive(TOUR_VIEWS.indexOf(view));
  }

  function bindCard(index: number) {
    return (el: HTMLElement | null) => {
      cards.current[index] = el;
    };
  }

  return (
    <section className="hero">
      <div className="hero__mesh" aria-hidden="true" />
      <div className="hero__aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="wrap hero__grid">
        <div className="hero__inner" ref={copyRef}>
          <span className="badge hero-in">
            <span className="badge__pill">New</span>
            <span className="badge__txt">AI scoring on interviews, assessments and resumes</span>
          </span>
          <TypedHeadline />
          <p className="hero__sub hero-in">
            Video interviews, skills assessments, application forms and bulk resume screening — every answer scored automatically, one candidate record for the whole process. Built for teams who hire without a hiring department.
          </p>
          <div className="hero__cta hero-in">
            <Link href="/signup" className="btn btn--primary">
              Start a free trial
            </Link>
            <button type="button" className="btn btn--ghost" onClick={onDemo}>
              Book a demo
            </button>
          </div>
          <ul className="hero__trust hero-in">
            <li>14-day free trial</li>
            <li>No credit card</li>
            <li>Cancel any time</li>
          </ul>
        </div>

        <div
          className="hero__visual"
          id="tour"
          ref={visualRef}
          role="group"
          aria-label="Rotating tour of the CareerFlix dashboard: pipeline, candidates, jobs, interviews, offers, people and reports"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <div className="rot__glow" aria-hidden="true" />
          <div className="rot" id="rot">
            <div className="rot__stage" id="rotStage">
              <article className="rot__card" data-screen="pipeline" ref={bindCard(0)} onClick={() => go("pipeline")}>
                <Bar path="careerflix.app / pipeline / product-designer" />
                <div className="rot__body">
                  <Head title="Product Designer · Remote" chip="42 active" />
                  <div className="board">
                    <div>
                      <div className="col__h">Applied <b>18</b></div>
                      <div className="pcard rise"><span className="pcard__av" style={{ background: "var(--lav)" }}>RK</span><span><span className="pcard__nm">R. Kaur</span><span className="pcard__rl">Sr. Designer</span></span><span className="pcard__sc">92</span></div>
                      <div className="pcard rise"><span className="pcard__av" style={{ background: "var(--sky)" }}>TM</span><span><span className="pcard__nm">T. Moreau</span><span className="pcard__rl">Product Designer</span></span><span className="pcard__sc">88</span></div>
                      <div className="pcard rise"><span className="pcard__av" style={{ background: "var(--peach)" }}>JO</span><span><span className="pcard__nm">J. Okafor</span><span className="pcard__rl">UX Lead</span></span><span className="pcard__sc">85</span></div>
                    </div>
                    <div>
                      <div className="col__h">Screening <b>11</b></div>
                      <div className="pcard rise"><span className="pcard__av" style={{ background: "var(--peri)" }}>AS</span><span><span className="pcard__nm">A. Silva</span><span className="pcard__rl">Designer II</span></span><span className="pcard__sc">90</span></div>
                      <div className="pcard rise"><span className="pcard__av" style={{ background: "var(--cream)" }}>MH</span><span><span className="pcard__nm">M. Haddad</span><span className="pcard__rl">Design Systems</span></span><span className="pcard__sc">83</span></div>
                    </div>
                    <div>
                      <div className="col__h">Interview <b>8</b></div>
                      <div className="pcard rise"><span className="pcard__av" style={{ background: "var(--sky)" }}>LC</span><span><span className="pcard__nm">L. Chen</span><span className="pcard__rl">Sr. Designer</span></span><span className="pcard__sc">94</span></div>
                      <div className="pcard rise"><span className="pcard__av" style={{ background: "var(--lav)" }}>DN</span><span><span className="pcard__nm">D. Nwosu</span><span className="pcard__rl">Product Designer</span></span><span className="pcard__sc">87</span></div>
                    </div>
                    <div>
                      <div className="col__h">Offer <b>2</b></div>
                      <div className="pcard rise"><span className="pcard__av" style={{ background: "var(--peach)" }}>EV</span><span><span className="pcard__nm">E. Vargas</span><span className="pcard__rl">Sr. Designer</span></span><span className="pcard__sc">96</span></div>
                    </div>
                  </div>
                </div>
              </article>

              <article className="rot__card" data-screen="candidates" ref={bindCard(1)} onClick={() => go("candidates")}>
                <Bar path="careerflix.app / candidates" />
                <div className="rot__body">
                  <Head title="All candidates" chip="128 total" />
                  <div className="ctbar">
                    <span className="ctbar__search">Search candidates</span>
                    <span className="ctbar__f">Stage</span>
                    <span className="ctbar__f">Source</span>
                    <span className="ctbar__f ctbar__f--on">Score high → low</span>
                  </div>
                  <div className="ctable">
                    <div className="ctrow rise"><Av initials="EV" bg="--peach" /><span className="ctrow__id"><span className="pc__nm">Elena Vargas</span><span className="pc__mt">elena.v@mail.com</span></span><span className="ctrow__role">Sr. Designer</span><span className="pc__tag pc__tag--ok">Offer</span><span className="pcard__sc">96</span></div>
                    <div className="ctrow rise"><Av initials="LC" bg="--sky" /><span className="ctrow__id"><span className="pc__nm">Lian Chen</span><span className="pc__mt">lian.chen@mail.com</span></span><span className="ctrow__role">Sr. Designer</span><span className="pc__tag">Interview</span><span className="pcard__sc">94</span></div>
                    <div className="ctrow rise"><Av initials="RK" bg="--lav" /><span className="ctrow__id"><span className="pc__nm">Rupinder Kaur</span><span className="pc__mt">r.kaur@mail.com</span></span><span className="ctrow__role">Sr. Designer</span><span className="pc__tag">Applied</span><span className="pcard__sc">92</span></div>
                    <div className="ctrow rise"><Av initials="AS" bg="--peri" /><span className="ctrow__id"><span className="pc__nm">Ana Silva</span><span className="pc__mt">ana.silva@mail.com</span></span><span className="ctrow__role">Designer II</span><span className="pc__tag">Screening</span><span className="pcard__sc">90</span></div>
                    <div className="ctrow rise"><Av initials="TM" bg="--sky" /><span className="ctrow__id"><span className="pc__nm">Théo Moreau</span><span className="pc__mt">theo.m@mail.com</span></span><span className="ctrow__role">Product Designer</span><span className="pc__tag">Applied</span><span className="pcard__sc">88</span></div>
                  </div>
                </div>
              </article>

              <article className="rot__card" data-screen="jobs" ref={bindCard(2)} onClick={() => go("jobs")}>
                <Bar path="careerflix.app / jobs" />
                <div className="rot__body">
                  <Head title="Open roles" chip="4 live" />
                  <div className="jgrid">
                    <article className="jcard rise"><span className="jcard__st jcard__st--open">Open</span><h4>Product Designer</h4><p>Remote · Full-time</p><div className="bar"><i style={{ width: "78%" }} /></div><span className="jcard__n">42 applicants</span></article>
                    <article className="jcard rise"><span className="jcard__st jcard__st--open">Open</span><h4>Backend Engineer</h4><p>Berlin · Hybrid</p><div className="bar"><i style={{ width: "54%" }} /></div><span className="jcard__n">67 applicants</span></article>
                    <article className="jcard rise"><span className="jcard__st jcard__st--interview">Interviewing</span><h4>Customer Success Lead</h4><p>London · On-site</p><div className="bar"><i style={{ width: "86%" }} /></div><span className="jcard__n">23 applicants</span></article>
                    <article className="jcard rise"><span className="jcard__st jcard__st--draft">Draft</span><h4>Data Analyst</h4><p>Remote · Contract</p><div className="bar"><i style={{ width: "8%" }} /></div><span className="jcard__n">Not published</span></article>
                  </div>
                </div>
              </article>

              <article className="rot__card" data-screen="interviews" ref={bindCard(3)} onClick={() => go("interviews")}>
                <Bar path="careerflix.app / interviews / this-week" />
                <div className="rot__body">
                  <Head title="This week" chip="4 scheduled" />
                  <div className="agenda__strip">
                    <span className="agenda__d">Mon<b>11</b></span>
                    <span className="agenda__d">Tue<b>12</b></span>
                    <span className="agenda__d on">Wed<b>13</b></span>
                    <span className="agenda__d">Thu<b>14</b></span>
                    <span className="agenda__d">Fri<b>15</b></span>
                  </div>
                  <div className="agenda">
                    <div className="slot rise"><time>09:00</time><span className="slot__b"><span className="pc__nm">Portfolio review</span><span className="pc__mt">with Elena Vargas</span></span><Av initials="EV" bg="--peach" /><span className="slot__tag">Video</span></div>
                    <div className="slot rise"><time>11:30</time><span className="slot__b"><span className="pc__nm">Systems deep-dive</span><span className="pc__mt">with Lian Chen</span></span><Av initials="LC" bg="--sky" /><span className="slot__tag">Video</span></div>
                    <div className="slot rise"><time>14:00</time><span className="slot__b"><span className="pc__nm">Team fit</span><span className="pc__mt">with Ana Silva</span></span><Av initials="AS" bg="--peri" /><span className="slot__tag">On-site</span></div>
                    <div className="slot rise"><time>16:15</time><span className="slot__b"><span className="pc__nm">Final panel</span><span className="pc__mt">with Rupinder Kaur</span></span><Av initials="RK" bg="--lav" /><span className="slot__tag">Video</span></div>
                  </div>
                </div>
              </article>

              <article className="rot__card" data-screen="offers" ref={bindCard(4)} onClick={() => go("offers")}>
                <Bar path="careerflix.app / offers" />
                <div className="rot__body">
                  <Head title="Offers" chip="3 in flight" />
                  <div className="olist">
                    <div className="orow rise"><Av initials="EV" bg="--peach" /><span className="ctrow__id"><span className="pc__nm">Elena Vargas</span><span className="pc__mt">Sr. Product Designer</span></span><span className="orow__pay">£78,000<small>Starts 1 Sep</small></span><span className="pc__tag pc__tag--ok">Signed</span></div>
                    <div className="orow rise"><Av initials="LC" bg="--sky" /><span className="ctrow__id"><span className="pc__nm">Lian Chen</span><span className="pc__mt">Sr. Product Designer</span></span><span className="orow__pay">£74,500<small>Awaiting reply</small></span><span className="pc__tag">Sent</span></div>
                    <div className="orow rise"><Av initials="MH" bg="--cream" /><span className="ctrow__id"><span className="pc__nm">Maya Haddad</span><span className="pc__mt">Design Systems Lead</span></span><span className="orow__pay">£81,000<small>Needs approval</small></span><span className="pc__tag">Draft</span></div>
                  </div>
                </div>
              </article>

              <article className="rot__card" data-screen="people" ref={bindCard(5)} onClick={() => go("people")}>
                <Bar path="careerflix.app / people" />
                <div className="rot__body">
                  <Head title="People directory" chip="86 employees" />
                  <div className="olist">
                    <div className="orow rise"><Av initials="EV" bg="--peach" /><span className="ctrow__id"><span className="pc__nm">Elena Vargas</span><span className="pc__mt">Design</span></span><span className="orow__bar"><span className="bar"><i style={{ width: "75%" }} /></span><small>75% complete</small></span><span className="pc__tag">Onboarding</span></div>
                    <div className="orow rise"><Av initials="TM" bg="--sky" /><span className="ctrow__id"><span className="pc__nm">Théo Moreau</span><span className="pc__mt">Design</span></span><span className="orow__bar"><span className="bar"><i style={{ width: "100%" }} /></span><small>100% complete</small></span><span className="pc__tag pc__tag--ok">Active</span></div>
                    <div className="orow rise"><Av initials="MH" bg="--cream" /><span className="ctrow__id"><span className="pc__nm">Maya Haddad</span><span className="pc__mt">Design</span></span><span className="orow__bar"><span className="bar"><i style={{ width: "100%" }} /></span><small>100% complete</small></span><span className="pc__tag pc__tag--ok">Active</span></div>
                    <div className="orow rise"><Av initials="DN" bg="--lav" /><span className="ctrow__id"><span className="pc__nm">Dami Nwosu</span><span className="pc__mt">Product</span></span><span className="orow__bar"><span className="bar"><i style={{ width: "40%" }} /></span><small>40% complete</small></span><span className="pc__tag">Onboarding</span></div>
                  </div>
                </div>
              </article>

              <article className="rot__card" data-screen="reports" ref={bindCard(6)} onClick={() => go("reports")}>
                <Bar path="careerflix.app / reports / hiring" />
                <div className="rot__body">
                  <Head title="Hiring performance" chip="Last 6 months" />
                  <div className="tiles">
                    <div className="tile rise"><b>18</b><span>Days to hire</span></div>
                    <div className="tile rise"><b>62%</b><span>Faster than last year</span></div>
                    <div className="tile rise"><b>4.9</b><span>Candidate rating</span></div>
                  </div>
                  <div className="rsplit">
                    <div className="chart rise">
                      <span className="chart__t">Hires per month</span>
                      <div className="chart__plot">
                        <span className="chart__bar" style={{ ["--h" as string]: "46%" }}><b>Apr</b></span>
                        <span className="chart__bar" style={{ ["--h" as string]: "58%" }}><b>May</b></span>
                        <span className="chart__bar" style={{ ["--h" as string]: "51%" }}><b>Jun</b></span>
                        <span className="chart__bar" style={{ ["--h" as string]: "72%" }}><b>Jul</b></span>
                        <span className="chart__bar" style={{ ["--h" as string]: "64%" }}><b>Aug</b></span>
                        <span className="chart__bar" style={{ ["--h" as string]: "88%" }}><b>Sep</b></span>
                      </div>
                    </div>
                    <div className="srcs rise">
                      <span className="chart__t">Where hires come from</span>
                      <div className="src rise"><span>Careers page</span><span className="bar"><i style={{ width: "42%" }} /></span><b>42%</b></div>
                      <div className="src rise"><span>Referrals</span><span className="bar"><i style={{ width: "27%" }} /></span><b>27%</b></div>
                      <div className="src rise"><span>Job boards</span><span className="bar"><i style={{ width: "19%" }} /></span><b>19%</b></div>
                      <div className="src rise"><span>Sourced</span><span className="bar"><i style={{ width: "12%" }} /></span><b>12%</b></div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="rot__dots" role="tablist" aria-label="Dashboard sections">
              {TOUR_VIEWS.map((view, i) => (
                <button key={view} className={`rot__dot${active === i ? " is-on" : ""}`} data-view={view} type="button" onClick={() => go(view)}>
                  {view[0].toUpperCase() + view.slice(1)}
                  {active === i && <i className="rot__dot-prog" />}
                </button>
              ))}
            </div>
            <p className="rot__hint">{paused ? "Paused — move away to keep flipping" : "Screens flip automatically"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
