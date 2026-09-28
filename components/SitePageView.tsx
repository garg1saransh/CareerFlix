import Link from "next/link";
import { DemoForm } from "@/components/DemoForm";
import { Chapter } from "@/components/landing/Chapter";
import { CTA, Pricing } from "@/components/landing/Sections";
import { DeskStudio } from "@/components/landing/DeskStudio";
import { FeatureLane } from "@/components/landing/FeatureLane";
import { FlowStudio } from "@/components/landing/FlowStudio";
import { ModuleStudio } from "@/components/landing/ModuleStudio";
import { NavStage, NextStrip } from "@/components/landing/NavStage";
import { DeskNav } from "@/components/DeskNav";
import { IconArrow, IconTick } from "@/lib/icons";
import type { SitePage } from "@/lib/sitePages";

type Props = {
  page: SitePage;
};

export function SitePageView({ page }: Props) {
  if (page.slug === "how-it-works") {
    return (
      <main className="navpage navpage--how-it-works">
        <NavStage slug="how-it-works" />
        <div className="navpage__studio">
          <FlowStudio />
        </div>
        <NextStrip slug="how-it-works" />
        <CTA />
      </main>
    );
  }

  if (page.slug === "modules") {
    return (
      <main className="navpage navpage--modules">
        <NavStage slug="modules" />
        <div className="navpage__studio">
          <ModuleStudio />
        </div>
        <NextStrip slug="modules" />
        <CTA />
      </main>
    );
  }

  if (page.slug === "desk") {
    return (
      <main className="navpage navpage--desk">
        <NavStage slug="desk" />
        <div className="navpage__studio">
          <DeskStudio />
        </div>
        <NextStrip slug="desk" />
        <CTA />
      </main>
    );
  }

  if (page.slug === "features") {
    return (
      <main className="navpage navpage--features">
        <NavStage slug="features" />
        <div className="navpage__studio">
          <FeatureLane />
        </div>
        <NextStrip slug="features" />
        <CTA />
      </main>
    );
  }

  if (page.slug === "pricing") {
    return (
      <main className="navpage navpage--pricing">
        <NavStage slug="pricing" />
        <div className="navpage__studio">
          <Chapter
            id="pricing"
            n="05"
            kicker="Plans"
            title="Try the whole platform free for 14 days"
            lead="Pick a plan, create your account, and every feature on it unlocks immediately — interviews, assessments, job forms, resume tools, talent pool, scheduling and employee management. No card, no charge, nothing to cancel."
          >
            <Pricing framed={false} />
          </Chapter>
        </div>
        <NextStrip slug="pricing" />
        <CTA />
      </main>
    );
  }

  return (
    <main className="leaf">
      <div className="wrap leaf__grid">
        {(page.kind === "tool" || page.kind === "tour") && (
          <DeskNav current={page.slug} />
        )}
        <article className="leaf__main">
          <span className="eyebrow">{page.kicker}</span>
          <h1 className="sec-title">{page.heading}</h1>
          <p className="sec-lead">{page.body}</p>

          {page.kind === "form" && <DemoForm />}

          {page.kind === "section" && page.links && (
            <ul className="leaf__cards">
              {page.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="leaf__card">
                    <b>{item.title}</b>
                    <span>{item.body}</span>
                    <em>Open page <IconArrow /></em>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {(page.kind === "tool" || page.kind === "tour") && (
            <>
              {page.stat && (
                <div className="kit__stat">
                  <b>{page.stat}</b>
                  <small>{page.statLabel}</small>
                </div>
              )}
              {page.rows && (
                <div className="desk__rows">
                  {page.rows.map((row) => (
                    <div className="desk__row" key={row.name}>
                      <span className="pc__av">{row.av}</span>
                      <span className="pc__nm">{row.name}</span>
                      <span className="pc__tag pc__tag--ok">{row.tag}</span>
                    </div>
                  ))}
                </div>
              )}
              {page.items.length > 0 && (
                <ul className="leaf__items">
                  {page.items.map((item) => (
                    <li key={item}>
                      <span className="mod__tick"><IconTick /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <div className="leaf__cta">
                <Link href="/signup" className="btn btn--primary">Start free trial</Link>
                <Link href="/demo" className="link-arrow">Book a demo <IconArrow /></Link>
              </div>
            </>
          )}
        </article>
      </div>
    </main>
  );
}
