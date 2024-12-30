"use client";

import { getChartColors } from './theme';

export function createChartOptions(isDark: boolean) {
  const colors = getChartColors(isDark);
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: colors.text,
        },
      },
      title: {
        color: colors.text,
      },
    },
    scales: {
      x: {
        grid: {
          color: colors.grid,
        },
        ticks: {
          color: colors.text,
        },
      },
      y: {
        grid: {
          color: colors.grid,
        },
        ticks: {
          color: colors.text,
        },
        beginAtZero: true,
      },
    },
  };
}