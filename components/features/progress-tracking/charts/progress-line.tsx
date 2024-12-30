"use client";

import { Goal } from '@/lib/db';
import { Line } from 'react-chartjs-2';
import { getChartColors } from '@/lib/charts/theme';

interface ProgressLineProps {
  goals: Goal[];
  isDark: boolean;
  options: any;
}

export function ProgressLine({ goals, isDark, options }: ProgressLineProps) {
  const colors = getChartColors(isDark);

  const data = {
    labels: goals.map(goal => goal.title),
    datasets: [{
      label: "Progress",
      data: goals.map(goal => goal.progress),
      borderColor: colors.primary,
      backgroundColor: colors.primaryAlpha,
      fill: true,
      tension: 0.4,
    }]
  };

  return <Line data={data} options={options} />;
}