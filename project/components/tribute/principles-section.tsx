"use client";

import { Lightbulb, Blocks, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function PrinciplesSection() {
  return (
    <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16">Core Principles</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <PrincipleCard 
            icon={<Lightbulb />}
            title="Meticulous Planning"
            description="Every detail matters. Every step is calculated."
          />
          <PrincipleCard 
            icon={<Blocks />}
            title="Structural Thinking"
            description="Breaking down complex problems into manageable components."
          />
          <PrincipleCard 
            icon={<Compass />}
            title="Adaptive Strategy"
            description="Multiple contingencies for every scenario."
          />
        </div>
      </div>
    </section>
  );
}