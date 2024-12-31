"use client";

import { Goal } from "@/lib/db";
import { GoalCard } from "../../goal-card";

interface GridViewProps {
  goals: Goal[];
}

export function GridView({ goals }: GridViewProps) {
  if (goals.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-lg">
        <p className="text-muted-foreground">No goals found. Create your first goal to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}