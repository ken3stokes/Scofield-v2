"use client";

import { HeroSection } from "@/components/tribute/hero-section";
import { BrilliantMindSection } from "@/components/tribute/brilliant-mind-section";
import { PrinciplesSection } from "@/components/tribute/principles-section";
import { LegacySection } from "@/components/tribute/legacy-section";

export default function TributePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BrilliantMindSection />
      <PrinciplesSection />
      <LegacySection />
    </div>
  );
}