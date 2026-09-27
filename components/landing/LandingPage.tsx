"use client";

import { Chapter } from "@/components/landing/Chapter";
import { FeatureLane } from "@/components/landing/FeatureLane";
import { FilmStrip } from "@/components/landing/FilmStrip";
import { FlowStudio } from "@/components/landing/FlowStudio";
import { Hero } from "@/components/landing/Hero";
import { PlatformStudio } from "@/components/landing/PlatformStudio";
import { ScoreDeck } from "@/components/landing/ScoreDeck";
import { ModuleStudio } from "@/components/landing/ModuleStudio";
import { DeskStudio } from "@/components/landing/DeskStudio";
import { CTA, Pricing } from "@/components/landing/Sections";
import { MotionLayer } from "@/components/landing/MotionLayer";
import { SiteChrome } from "@/components/landing/SiteChrome";

export function LandingPage() {
  return (
    <SiteChrome>
      <MotionLayer />
      <main>
        <Hero />
        <ScoreDeck />
        <FilmStrip />
        <FlowStudio />
        <ModuleStudio />
        <DeskStudio />
        <FeatureLane />
        <PlatformStudio />
        <Chapter
          id="pricing"
          n="06"
          kicker="Pricing"
          title="Try the whole platform free for 14 days"
          lead="Pick a plan, create your account, and every feature on it unlocks immediately — interviews, assessments, job forms, resume tools, talent pool, scheduling and employee management. No card, no charge, nothing to cancel."
        >
          <Pricing framed={false} />
        </Chapter>
        <CTA />
      </main>
    </SiteChrome>
  );
}
