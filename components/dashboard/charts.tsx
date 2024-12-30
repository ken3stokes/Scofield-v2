"use client";

import { Goal } from "@/lib/db";
import { GoalProgressChart } from "./charts/goal-progress-chart";
import { CompletionRateChart } from "./charts/completion-rate-chart";
import { TimelineChart } from "./charts/timeline-chart";

interface DashboardChartsProps {
  goals: Goal[];
}

export function DashboardCharts({ goals }: DashboardChartsProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <GoalProgressChart goals={goals} />
        <CompletionRateChart goals={goals} />
      </div>
      <TimelineChart goals={goals} />
    </div>
  );
}