"use client";

import { Goal } from "@/lib/db";
import { GoalProgressChart } from "./charts/goal-progress-chart";
import { CompletionRateChart } from "./charts/completion-rate-chart";
import { TimelineChart } from "./charts/timeline-chart";
import { AnalyticsSummary } from "./analytics-summary";

interface AnalyticsDashboardProps {
  goals: Goal[];
}

export function AnalyticsDashboard({ goals }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      <AnalyticsSummary goals={goals} />
      <div className="grid md:grid-cols-2 gap-6">
        <GoalProgressChart goals={goals} />
        <CompletionRateChart goals={goals} />
      </div>
      <TimelineChart goals={goals} />
    </div>
  );
}