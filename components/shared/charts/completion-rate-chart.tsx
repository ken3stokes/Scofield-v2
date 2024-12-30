"use client";

import { Doughnut } from "react-chartjs-2";
import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { useCompletionRateData } from "@/hooks/analytics/use-completion-rate";
import { chartOptions } from "@/lib/chart-config";
import "@/lib/chart-registry";

interface CompletionRateChartProps {
  goals: Goal[];
}

export function CompletionRateChart({ goals }: CompletionRateChartProps) {
  const data = useCompletionRateData(goals);
  return (
    <Card className="p-6">
      <Doughnut options={chartOptions.completionRate} data={data} />
    </Card>
  );
}