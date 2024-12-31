"use client";

import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { CTA } from '@/components/sections/cta';
import { Footer } from '@/components/layout/footer';
import { HomeHeader } from '@/components/layout/home-header';

export const runtime = 'nodejs';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HomeHeader />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}