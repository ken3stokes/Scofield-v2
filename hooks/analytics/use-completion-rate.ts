"use client";

import { Goal } from "@/lib/db";

export function useCompletionRateData(goals: Goal[]) {
  const completed = goals.filter(goal => goal.progress === 100).length;
  const inProgress = goals.filter(goal => goal.progress > 0 && goal.progress < 100).length;
  const notStarted = goals.filter(goal => goal.progress === 0).length;

  return {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [completed, inProgress, notStarted],
        backgroundColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(156, 163, 175)",
        ],
      },
    ],
  };
}