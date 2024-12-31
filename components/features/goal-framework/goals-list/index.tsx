"use client";

import { Goal } from '@/lib/db';
import { GoalCard } from './goal-card';
import { EmptyState } from '@/components/ui/empty-state';
import { Target } from 'lucide-react';

interface GoalsListProps {
  goals: Goal[];
}

export function GoalsList({ goals }: GoalsListProps) {
  if (goals.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="No goals yet"
        description="Create your first goal to start applying the SMART framework."
      />
    );
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}