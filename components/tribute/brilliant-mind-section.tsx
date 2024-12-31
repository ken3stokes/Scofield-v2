"use client";

import { Brain, Compass, SquareStack, Timer } from 'lucide-react';
import { Feature } from './feature';

export function BrilliantMindSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Blueprint Visual */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-blue-950">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                <div className="absolute inset-0 p-8">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-blue-400 rounded-full opacity-30" />
                  <div className="absolute top-1/2 left-1/2 w-40 h-1 bg-blue-400 opacity-30 transform -rotate-45" />
                  <div className="absolute top-1/3 right-1/4 w-24 h-1 bg-blue-400 opacity-30" />
                  <div className="absolute bottom-1/4 right-1/4 text-blue-400 text-xs">286.5°</div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-blue-400 text-xl mb-2">Structural Engineer</div>
                    <div className="text-white text-5xl font-bold">Michael</div>
                    <div className="text-white text-5xl font-bold">Scofield</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold mb-8">The Brilliant Mind</h2>
            <div className="space-y-6">
              <Feature 
                icon={<Brain />}
                title="Photographic Memory"
                description="Ability to recall and visualize complex structural details with perfect accuracy."
              />
              <Feature 
                icon={<Compass />}
                title="Strategic Genius"
                description="Masterful at creating intricate plans with multiple contingencies."
              />
              <Feature 
                icon={<SquareStack />}
                title="Pattern Recognition"
                description="Exceptional ability to identify and utilize patterns in complex systems."
              />
              <Feature 
                icon={<Timer />}
                title="Time Precision"
                description="Methodical timing and synchronization of multiple elements."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}