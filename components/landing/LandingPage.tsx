"use client";

import { useState } from "react";
import { DemoModal } from "@/components/DemoModal";
import { Hero } from "@/components/landing/Hero";
import { CTA, Features, HowItWorks, Logos, Modules, Platform, Pricing } from "@/components/landing/Sections";
import { MotionLayer } from "@/components/landing/MotionLayer";
import { SiteChrome } from "@/components/landing/SiteChrome";

export function LandingPage() {
  const [demo, setDemo] = useState(false);

  return (
    <SiteChrome onDemo={() => setDemo(true)}>
      <MotionLayer />
      <main>
        <Hero onDemo={() => setDemo(true)} />
        <Logos />
        <HowItWorks />
        <Modules />
        <Features />
        <Platform />
        <Pricing />
        <CTA onDemo={() => setDemo(true)} />
      </main>
      <DemoModal open={demo} onClose={() => setDemo(false)} />
    </SiteChrome>
  );
}
