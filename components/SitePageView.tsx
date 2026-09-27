import Link from "next/link";
import { DemoForm } from "@/components/DemoForm";
import { Pricing } from "@/components/landing/Sections";
import { DeskNav } from "@/components/DeskNav";
import { IconArrow, IconTick } from "@/lib/icons";
import type { SitePage } from "@/lib/sitePages";

type Props = {
  page: SitePage;
};

export function SitePageView({ page }: Props) {
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

          {page.kind === "pricing" && <Pricing framed={false} />}

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
