"use client";

import { Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Turn Complex Goals into
              <span className="block mt-2 text-blue-600">Clear Action Plans</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A privacy-focused goal tracking platform that helps you break down complex goals into achievable steps.
            </p>
            <Link href="/goals">
              <Button size="lg" className="group">
                Start Planning
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="aspect-video bg-blue-50 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}