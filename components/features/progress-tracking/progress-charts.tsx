"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { createChartOptions } from '@/lib/charts/options';
import { ProgressLine } from './charts/progress-line';
import "@/lib/chart-registry";

interface ProgressChartsProps {
  goals: Goal[];
}

export function ProgressCharts({ goals }: ProgressChartsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const chartOptions = createChartOptions(isDark);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Progress Analysis</h2>
      <Card className="p-6">
        <div className="h-[400px]">
          <ProgressLine 
            goals={goals} 
            isDark={isDark} 
            options={chartOptions} 
          />
        </div>
      </Card>
    </div>
  );
}