"use client";

import { Goal } from '@/lib/db';
import { SmartGoalCard } from './smart-goal-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Target } from 'lucide-react';

interface SmartGoalsListProps {
  goals: Goal[];
}

export function SmartGoalsList({ goals }: SmartGoalsListProps) {
  if (goals.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="No SMART goals yet"
        description="Create your first SMART goal to get started on your journey."
      />
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <SmartGoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}