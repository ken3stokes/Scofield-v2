"use client";

import { Goal } from '@/lib/db';
import { GoalsList } from './goals-list';
import { FrameworkGuide } from './framework-guide';

interface GoalFrameworkContentProps {
  goals: Goal[];
}

export function GoalFrameworkContent({ goals }: GoalFrameworkContentProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <GoalsList goals={goals} />
      </div>
      <div className="lg:col-span-1">
        <FrameworkGuide />
      </div>
    </div>
  );
}