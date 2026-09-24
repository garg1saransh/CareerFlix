"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MARQUEE_ITEMS, MODULES, PLANS } from "@/lib/data";
import { IconArrow, IconArrowWide, IconBrand, IconData, IconLock, IconTick, MODULE_ICONS } from "@/lib/icons";

gsap.registerPlugin(useGSAP);

export function Logos() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section className="logos">
      <div className="wrap">
        <p className="logos__label">Everything a hiring team needs, in one account</p>
      </div>
      <div className="marquee">
        <div className="marquee__track" id="marquee">
          {items.map((item, i) => (
            <span className="marquee__item" key={`${item}-${i}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="section section--ink" id="how-it-works">
      <div className="wrap split">
        <div className="split__text reveal">
          <span className="eyebrow">How it works</span>
          <h2 className="sec-title">From open role to shortlist, without the back-and-forth.</h2>
          <p className="sec-lead">
            Build a structured interview, assessment or application form, send one link, and let CareerFlix score every response as it comes in. Your team reviews the ranked results and decides — nothing moves without you.
          </p>
          <ul className="split__list">
            <li>
              <span className="tick"><IconTick /></span>
              <span>
                <b>One link, not a calendar</b>
                <span>Candidates record their interview or sit their assessment whenever suits them.</span>
              </span>
            </li>
            <li>
              <span className="tick"><IconTick /></span>
              <span>
                <b>Every response scored automatically</b>
                <span>Interviews, assessments and resumes all get an AI-generated score and summary.</span>
              </span>
            </li>
            <li>
              <span className="tick"><IconTick /></span>
              <span>
                <b>Your team makes the call</b>
                <span>Review the ranking, comment, shortlist and push strong candidates into your talent pool.</span>
              </span>
            </li>
          </ul>
          <div className="split__cta">
            <a href="#modules" className="btn btn--light">See all five modules</a>
          </div>
          <div className="stats">
            <div>
              <div className="stat__n"><span data-count="62">0</span><span>%</span></div>
              <div className="stat__l">Faster time-to-hire</div>
            </div>
            <div>
              <div className="stat__n"><span data-count="5">0</span></div>
              <div className="stat__l">Tools in one account, one login</div>
            </div>
            <div>
              <div className="stat__n"><span data-count="14">0</span><span>-day</span></div>
              <div className="stat__l">Free trial, every module unlocked</div>
            </div>
          </div>
        </div>
        <div className="split__media reveal">
          <div className="panel panel--lav">
            <div className="panel__card">
              <div className="pc__row">
                <span className="pc__av" style={{ background: "var(--sky)" }}>LC</span>
                <span>
                  <span className="pc__nm">Lian Chen</span>
                  <span className="pc__mt">Video interview · Product Designer</span>
                </span>
                <span className="pc__tag pc__tag--ok">AI score 94</span>
              </div>
              <div className="bar"><i style={{ width: "94%" }} /></div>
              <p className="pc__msg">Strong communication and directly relevant experience — recommended to shortlist.</p>
            </div>
            <div className="panel__card">
              <div className="pc__row">
                <span className="pc__av" style={{ background: "var(--peach)" }}>EV</span>
                <span>
                  <span className="pc__nm">Elena Vargas</span>
                  <span className="pc__mt">Skills assessment · Senior Designer</span>
                </span>
                <span className="pc__tag pc__tag--ok">Passed · 96%</span>
              </div>
              <div className="bar"><i style={{ width: "96%" }} /></div>
              <p className="pc__msg">Cleared every section above the pass mark; auto-advanced for team review.</p>
            </div>
            <div className="panel__card">
              <div className="pc__row">
                <span className="pc__av" style={{ background: "var(--peri)" }}>DN</span>
                <span>
                  <span className="pc__nm">Dami Nwosu</span>
                  <span className="pc__mt">Resume analysis · Product Designer</span>
                </span>
                <span className="pc__tag">Shortlisted</span>
              </div>
              <p className="pc__msg">Ranked from a batch of 50 resumes and moved into the talent pool for this role.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Modules() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  function showTool(index: number) {
    setActive(index);
  }

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = root.current;
      if (!wrap) return;

      wrap.querySelectorAll<HTMLElement>(".mod").forEach((panel, i) => {
        if (i === active) return;
        gsap.set(panel, { clearProps: "opacity,visibility,transform" });
        panel.querySelectorAll<HTMLElement>(".mod__list li, .mod__stat, .mod__kicker, .mod__main h3, .mod__main p").forEach((bit) => {
          gsap.set(bit, { clearProps: "opacity,visibility,transform" });
        });
      });

      const panel = wrap.querySelector<HTMLElement>(".mod.is-on");
      if (panel && !reduce) {
        gsap.fromTo(
          panel,
          { autoAlpha: 0.4, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: "expo.out", force3D: true, overwrite: true }
        );
        const bits = panel.querySelectorAll(".mod__list li, .mod__stat, .mod__kicker, .mod__main h3, .mod__main p");
        gsap.fromTo(
          bits,
          { y: 10, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.45, ease: "expo.out", delay: 0.04, force3D: true, overwrite: true }
        );
      }

      const bar = wrap.querySelector<HTMLElement>(".mods__tab.is-on .mods__prog i");
      const obj = { p: 0 };
      if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
      const tween = gsap.to(obj, {
        p: 1,
        duration: reduce ? 0.01 : 7,
        ease: "none",
        onUpdate: () => {
          if (bar) bar.style.transform = `scaleX(${obj.p})`;
        },
        onComplete: () => setActive((v) => (v + 1) % MODULES.length),
      });
      return () => tween.kill();
    },
    { dependencies: [active], scope: root }
  );

  return (
    <section className="section" id="modules">
      <div className="wrap">
        <div className="sec-head--center reveal">
          <span className="eyebrow">Modules</span>
          <h2 className="sec-title">Five tools your hiring team already needs</h2>
          <p className="sec-lead">
            Interviews, assessments, application forms, bulk resume analysis and a full resume editor — one login, one candidate record, one bill.
          </p>
        </div>
        <div className="mods reveal" id="mods" ref={root}>
          <div className="mods__rail" role="tablist" aria-label="Modules">
            {MODULES.map((mod, i) => {
              const Icon = MODULE_ICONS[mod.id];
              return (
                <button
                  key={mod.id}
                  className={`mods__tab${active === i ? " is-on" : ""}`}
                  data-mod={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={`mod-panel-${mod.id}`}
                  id={`mod-tab-${mod.id}`}
                  onClick={() => showTool(i)}
                >
                  <span className="mods__num">{mod.num}</span>
                  <span className="mods__ico"><Icon /></span>
                  <span className="mods__t">
                    <b>{mod.title}</b>
                    <small>{mod.subtitle}</small>
                  </span>
                  {active === i && (
                    <span className="mods__prog">
                      <i />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mods__stage">
            {MODULES.map((mod, i) => (
              <article
                key={mod.id}
                className={`mod${active === i ? " is-on" : ""}`}
                id={`mod-panel-${mod.id}`}
                role="tabpanel"
                data-panel={mod.id}
                aria-labelledby={`mod-tab-${mod.id}`}
                aria-hidden={active !== i}
              >
                <div className="mod__main">
                  <span className="mod__kicker">{mod.kicker}</span>
                  <h3>{mod.heading}</h3>
                  <p>{mod.body}</p>
                  <div className="mod__foot">
                    <span className="mod__stat">
                      <b>{mod.stat}</b>
                      <small>{mod.statLabel}</small>
                    </span>
                    <a href="#pricing" className="link-arrow">
                      Try it free for 14 days <IconArrow />
                    </a>
                  </div>
                </div>
                <aside className="mod__aside">
                  <span className="mod__asideT">What you get</span>
                  <ul className="mod__list">
                    {mod.items.map((item) => (
                      <li key={item}>
                        <span className="mod__tick"><IconTick /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </aside>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="section section--sand" id="features">
      <div className="wrap split split--flip">
        <div className="split__media reveal">
          <div className="panel panel--sky">
            <div className="panel__card">
              <div className="pc__row">
                <span className="pc__av" style={{ background: "var(--cream)" }}>EV</span>
                <span>
                  <span className="pc__nm">Elena Vargas</span>
                  <span className="pc__mt">Assessment · Design</span>
                </span>
                <span className="pc__tag pc__tag--ok">AI score 92</span>
              </div>
              <div className="bar"><i style={{ width: "92%" }} /></div>
              <p className="pc__msg">Scored automatically against your pass mark — no manual grading.</p>
            </div>
            <div className="panel__card">
              <div className="pc__row">
                <span className="pc__av" style={{ background: "var(--lav)" }}>MH</span>
                <span>
                  <span className="pc__nm">Maya Haddad</span>
                  <span className="pc__mt">WhatsApp · Interview reminder</span>
                </span>
                <span className="pc__tag">Delivered</span>
              </div>
              <p className="pc__msg">Sent straight from the candidate&apos;s record — no separate app to open.</p>
            </div>
            <div className="panel__card">
              <div className="pc__row">
                <span className="pc__av" style={{ background: "var(--peach)" }}>TM</span>
                <span>
                  <span className="pc__nm">Théo Moreau</span>
                  <span className="pc__mt">Talent pool · Product</span>
                </span>
                <span className="pc__tag pc__tag--ok">Kept warm</span>
              </div>
              <div className="bar"><i style={{ width: "100%" }} /></div>
            </div>
          </div>
        </div>
        <div className="split__text reveal">
          <span className="eyebrow">Features</span>
          <h2 className="sec-title">The layer underneath every module</h2>
          <p className="sec-lead">
            AI scoring, candidate messaging and team permissions work the same way across interviews, assessments, forms and resumes — learn it once, use it everywhere.
          </p>
          <ul className="split__list">
            <li>
              <span className="tick"><IconTick /></span>
              <span>
                <b>AI-assisted scoring</b>
                <span>Interview answers, assessments and resumes all get a score and a reason, not just a gut feeling.</span>
              </span>
            </li>
            <li>
              <span className="tick"><IconTick /></span>
              <span>
                <b>WhatsApp built in</b>
                <span>Message candidates, run broadcasts and manage conversations without leaving the platform.</span>
              </span>
            </li>
            <li>
              <span className="tick"><IconTick /></span>
              <span>
                <b>Talent pool</b>
                <span>Keep strong candidates warm and pull them back in for the next opening.</span>
              </span>
            </li>
            <li>
              <span className="tick"><IconTick /></span>
              <span>
                <b>Team roles & permissions</b>
                <span>Invite your team and scope exactly which modules each person can touch.</span>
              </span>
            </li>
          </ul>
          <div className="split__cta">
            <a href="#modules" className="btn btn--primary">Explore the modules</a>
            <a href="#pricing" className="link-arrow">
              Compare plans <IconArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Platform() {
  return (
    <section className="section" id="platform">
      <div className="wrap">
        <div className="sec-head--center reveal">
          <span className="eyebrow">Your platform</span>
          <h2 className="sec-title">Your brand, your data, your team</h2>
          <p className="sec-lead">
            Every candidate-facing screen carries your branding, every event can be exported or pushed to your own systems, and you decide who on your team sees what.
          </p>
        </div>
        <div className="bento">
          <article className="bcard bcard--mint bcard--big reveal tilt-card">
            <div className="bcard__body">
              <span className="bcard__ico"><IconBrand /></span>
              <span className="bcard__eyebrow">Branding</span>
              <h3>Your brand, not ours</h3>
              <p>Put your logo, colours and email templates on every screen a candidate sees — from the invite email to the interview itself and the CVs you send out.</p>
              <a href="#pricing" className="bcard__link">See what’s included<IconArrowWide /></a>
            </div>
            <div className="bcard__vis bcard__vis--wide">
              <div className="bvis bvis--panel">
                <div className="bvis__bar">
                  <span /><span /><span />
                  <em>careerflix.app / settings / branding</em>
                </div>
                <div className="bvis__body">
                  <div className="int-grid">
                    <span className="int">Logo</span>
                    <span className="int">Brand colours</span>
                    <span className="int">Email templates</span>
                    <span className="int">Interview intro</span>
                    <span className="int">Interview farewell</span>
                    <span className="int">Branded CVs</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="bcard bcard--sky bcard--row reveal tilt-card">
            <div className="bcard__body">
              <span className="bcard__ico"><IconData /></span>
              <span className="bcard__eyebrow">Analytics, exports & webhooks</span>
              <h3>Your data, out whenever you need it</h3>
              <p>Export interview, assessment and resume data, or get events pushed to your own endpoint the moment they happen.</p>
              <a href="#pricing" className="bcard__link">See what’s included<IconArrowWide /></a>
            </div>
            <div className="bcard__vis">
              <div className="bvis bvis--code">
                <div className="code__hd"><b>POST</b> /v1/webhooks</div>
                <pre className="code__b">{`{
  `}<span className="k">&quot;event&quot;</span>{`: `}<span className="v">&quot;interview.scored&quot;</span>{`,
  `}<span className="k">&quot;candidate&quot;</span>{`: `}<span className="v">&quot;product-designer-42&quot;</span>{`,
  `}<span className="k">&quot;score&quot;</span>{`: `}<span className="v">94</span>{`
}`}</pre>
              </div>
            </div>
          </article>
          <article className="bcard bcard--cream bcard--row reveal tilt-card">
            <div className="bcard__body">
              <span className="bcard__ico"><IconLock /></span>
              <span className="bcard__eyebrow">Team roles & permissions</span>
              <h3>Your team, your rules</h3>
              <p>Invite teammates and scope each one to exactly the modules their role needs — nothing more.</p>
              <a href="#pricing" className="bcard__link">See what’s included<IconArrowWide /></a>
            </div>
            <div className="bcard__vis">
              <div className="bvis bvis--rows">
                <div className="brow">
                  <span className="pc__av" style={{ background: "var(--peach)" }}>EV</span>
                  <span className="pc__nm">Elena Vargas</span>
                  <span className="pc__tag pc__tag--ok">Recruiter</span>
                </div>
                <div className="brow">
                  <span className="pc__av" style={{ background: "var(--sky)" }}>TM</span>
                  <span className="pc__nm">Théo Moreau</span>
                  <span className="pc__tag pc__tag--ok">Hiring Manager</span>
                </div>
                <div className="brow">
                  <span className="pc__av" style={{ background: "var(--lav)" }}>DN</span>
                  <span className="pc__nm">Dami Nwosu</span>
                  <span className="pc__tag">Admin</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <span className="tick">
      <IconTick />
    </span>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="section prices" id="pricing">
      <div className="wrap">
        <div className="prices__head reveal">
          <span className="eyebrow">Pricing</span>
          <h2 className="sec-title">
            Try the whole platform <em>free for 14 days</em>
          </h2>
          <p className="sec-lead">
            Pick a plan, create your account, and every feature on it unlocks immediately — interviews, assessments, job forms, resume analysis and the resume editor. No card, no charge, nothing to cancel.
          </p>
        </div>
        <div className="mx-auto mt-10 flex flex-col items-center gap-3">
          <span className="prices__save">Save up to 99% yearly</span>
          <div className="prices__toggle" role="tablist" aria-label="Billing period">
            <button type="button" className={!yearly ? "is-on" : ""} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button type="button" className={yearly ? "is-on" : ""} onClick={() => setYearly(true)}>
              Yearly
            </button>
          </div>
        </div>
        <div className="price-grid">
          {PLANS.map((plan, i) => (
            <article
              key={`${plan.name}-${i}`}
              className={`price-card tilt-card reveal${plan.featured ? " is-featured" : ""}`}
            >
              {plan.featured && <span className="price-card__pop">Popular</span>}
              <h3>{plan.name}</h3>
              <p className="price-card__blurb">{plan.blurb}</p>
              <div className="price-card__amt">
                <b>{yearly ? plan.yearly : plan.monthly}</b>
                <span>{yearly ? plan.periodYearly : plan.periodMonthly}</span>
              </div>
              {yearly && plan.yearlyBilled && <p className="price-card__meta">{plan.yearlyBilled}</p>}
              {!yearly && plan.monthly !== "Free" && (
                <p className="price-card__meta">Billed monthly · cancel anytime</p>
              )}
              {plan.monthly !== "Free" && <p className="price-card__meta">No credit card required</p>}
              <Link
                href={`/signup?plan=${encodeURIComponent(plan.name)}`}
                className={`btn ${plan.name === "Free" ? "btn--ghost" : "btn--primary"}`}
              >
                {plan.cta}
                <IconArrow />
              </Link>
              <div className="price-card__inc">
                <p>What&apos;s included</p>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f.label}>
                      <Check />
                      <span>
                        {f.value !== undefined && <b>{f.value} </b>}
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="prices__note">
          How the trial works: your 14 days start the first time you log in, not when you sign up. When it ends we simply stop new creations — your interviews, candidates and data stay untouched and come straight back when you subscribe.
        </p>
      </div>
    </section>
  );
}

export function CTA({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="cta">
      <div className="wrap cta__inner reveal">
        <h2>Try it on your next open role</h2>
        <p>Build an interview, an assessment or a job form, invite real candidates, and see the scored results land in one place. If it doesn&apos;t save you time, walk away.</p>
        <div className="cta__btns">
          <Link href="/signup" className="btn btn--primary">Start a free trial</Link>
          <button type="button" className="btn btn--light" onClick={onDemo}>Book a demo</button>
        </div>
        <p className="cta__note">14-day trial · No card needed · Cancel any time</p>
      </div>
    </section>
  );
}
