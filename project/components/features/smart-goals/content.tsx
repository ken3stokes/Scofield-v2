"use client";

import { Goal } from '@/lib/db';
import { SmartGoalsList } from './smart-goals-list';
import { SmartGoalsGuide } from './smart-goals-guide';

interface SmartGoalsContentProps {
  goals: Goal[];
}

export function SmartGoalsContent({ goals }: SmartGoalsContentProps) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <SmartGoalsList goals={goals} />
      </div>
      <div className="lg:col-span-1">
        <SmartGoalsGuide />
      </div>
    </div>
  );
}