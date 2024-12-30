"use client";

import { Goal } from "@/lib/db";

export function useTimelineData(goals: Goal[]) {
  const sortedGoals = [...goals].sort((a, b) => 
    new Date(a.timebound).getTime() - new Date(b.timebound).getTime()
  );

  return {
    labels: sortedGoals.map(goal => goal.title),
    datasets: [
      {
        label: "Due Date",
        data: sortedGoals.map(goal => ({
          x: goal.title,
          y: new Date(goal.timebound).getTime(),
        })),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };
}