"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Pie } from 'react-chartjs-2';
import { priorityChartConfig } from '@/lib/charts/config/priority-chart';
import { usePriorityData } from '@/lib/charts/data/use-priority-data';
import "@/lib/chart-registry";

interface PriorityDistributionProps {
  goals: Goal[];
}

export function PriorityDistribution({ goals }: PriorityDistributionProps) {
  const data = usePriorityData(goals);

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Goals by Priority</h3>
        <p className="text-sm text-muted-foreground">
          Distribution of goals across priority levels
        </p>
      </div>
      <div className="h-[300px]">
        <Pie data={data} options={priorityChartConfig} />
      </div>
    </Card>
  );
}