"use client";

import { Brain, ArrowRight, ChevronRight, Lightbulb, Puzzle, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/10 to-background dark:from-blue-950/20 dark:to-background" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              <span className="text-blue-600 dark:text-blue-400">Brilliant Minds,</span>
              <span className="block mt-2 text-blue-600 dark:text-blue-400">Strategic Victories</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your strategic thinking into masterful execution. Where brilliant minds converge with tactical precision.
            </p>
            <Link href="/goals">
              <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 text-white">
                Start Strategizing
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="bg-card rounded-lg shadow-xl p-6 dark:bg-card/50 dark:backdrop-blur-sm">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src="/brilliant-mind.jpg"
                  alt="Brilliant mind visualization - a profile with an illuminated brain radiating creative energy"
                  fill
                  className="object-cover object-center"
                  priority
                  unoptimized
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}