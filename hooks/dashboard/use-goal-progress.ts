"use client";

import { Goal } from "@/lib/db";

export function useGoalProgressData(goals: Goal[]) {
  return {
    labels: goals.map(goal => goal.title),
    datasets: [
      {
        label: "Progress",
        data: goals.map(goal => goal.progress),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };
}