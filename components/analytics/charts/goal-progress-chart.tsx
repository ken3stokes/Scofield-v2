"use client";

import { Line } from "react-chartjs-2";
import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { useGoalProgressData } from "@/hooks/analytics/use-goal-progress";
import { chartOptions } from "@/lib/chart-config";
import "@/lib/chart-registry";

interface GoalProgressChartProps {
  goals: Goal[];
}

export function GoalProgressChart({ goals }: GoalProgressChartProps) {
  const data = useGoalProgressData(goals);
  return (
    <Card className="p-6">
      <Line options={chartOptions.goalProgress} data={data} />
    </Card>
  );
}