"use client";

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTA() {
  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-950 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
      <div className="max-w-4xl mx-auto text-center px-4 relative">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Ready to Achieve Your Goals?
        </h2>
        <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
          Start your journey to strategic goal achievement today.
        </p>
        <Link href="/goals">
          <Button 
            size="lg" 
            variant="secondary"
            className="group bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-100 dark:text-blue-950 dark:hover:bg-blue-200"
          >
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}