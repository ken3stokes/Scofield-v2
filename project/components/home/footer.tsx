"use client";

import { Brain } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-blue-400" />
            <span className="ml-2 text-lg font-bold text-white">Scofield</span>
          </div>
          <p className="text-sm">
            Strategic goal planning with privacy in mind.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Features</h3>
          <ul className="space-y-2 text-sm">
            <li>SMART Goals</li>
            <li>Task Management</li>
            <li>Progress Tracking</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4">Contact</h3>
          <a href="mailto:github@kenestokes.me" 
             className="text-blue-400 hover:text-blue-300 text-sm">
            github@kenestokes.me
          </a>
        </div>
      </div>
    </footer>
  );
}