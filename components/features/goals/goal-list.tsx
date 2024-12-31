"use client";

import { Goal } from '@/lib/db';
import { GoalCard } from './goal-card';

interface GoalListProps {
  goals: Goal[];
}

export function GoalList({ goals }: GoalListProps) {
  if (goals.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-lg">
        <p className="text-muted-foreground">No goals yet. Create your first goal to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}