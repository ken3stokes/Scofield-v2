"use client";

import { Line } from "react-chartjs-2";
import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { useTimelineData } from "@/hooks/analytics/use-timeline";
import { chartOptions } from "@/lib/chart-config";
import "@/lib/chart-registry";

interface TimelineChartProps {
  goals: Goal[];
}

export function TimelineChart({ goals }: TimelineChartProps) {
  const data = useTimelineData(goals);
  
  if (!data) {
    return (
      <Card className="p-6">
        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
          No goals data available
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="h-[400px]">
        <Line options={chartOptions.timeline} data={data} />
      </div>
    </Card>
  );
}