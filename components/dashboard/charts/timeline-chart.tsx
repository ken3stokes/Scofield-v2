"use client";

import { Bar } from "react-chartjs-2";
import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { useTimelineData } from "@/hooks/dashboard/use-timeline";
import { chartOptions } from "@/lib/chart-config";
import "@/lib/chart-registry";

interface TimelineChartProps {
  goals: Goal[];
}

export function TimelineChart({ goals }: TimelineChartProps) {
  const data = useTimelineData(goals);
  return (
    <Card className="p-6">
      <Bar options={chartOptions.timeline} data={data} />
    </Card>
  );
}