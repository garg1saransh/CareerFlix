import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/landing/SiteChrome";
import { SitePageView } from "@/components/SitePageView";
import { SITE_PAGES, SITE_SLUGS } from "@/lib/sitePages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SITE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = SITE_PAGES[slug];
  if (!page) return { title: "CareerFlix" };
  return {
    title: `${page.title} — CareerFlix`,
    description: page.body,
  };
}

export default async function SiteSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = SITE_PAGES[slug];
  if (!page) notFound();

  return (
    <SiteChrome>
      <SitePageView page={page} />
    </SiteChrome>
  );
}
