"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import { useTimelineData } from '@/lib/charts/data/use-timeline-data';
import { timelineChartConfig } from '@/lib/charts/config/timeline-chart';
import "@/lib/chart-registry";

interface ProgressChartProps {
  goals: Goal[];
}

export function ProgressChart({ goals }: ProgressChartProps) {
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
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Goal Completion Trend</h3>
        <p className="text-sm text-muted-foreground">
          Cumulative number of goals over time
        </p>
      </div>
      <div className="h-[400px]">
        <Line data={data} options={timelineChartConfig} />
      </div>
    </Card>
  );
}