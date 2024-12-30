"use client";

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Achieve Your Goals?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Start your journey to strategic goal achievement today.
        </p>
        <Link href="/goals">
          <Button size="lg" variant="secondary" className="group">
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}