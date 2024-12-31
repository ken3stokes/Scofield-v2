"use client";

import { useTheme } from 'next-themes';

export function useChartOptions(isDark: boolean) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "rgb(241, 245, 249)" : "rgb(15, 23, 42)",
        },
      },
      title: {
        color: isDark ? "rgb(241, 245, 249)" : "rgb(15, 23, 42)",
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? "rgba(241, 245, 249, 0.1)" : "rgba(15, 23, 42, 0.1)",
        },
        ticks: {
          color: isDark ? "rgb(241, 245, 249)" : "rgb(15, 23, 42)",
        },
      },
      y: {
        grid: {
          color: isDark ? "rgba(241, 245, 249, 0.1)" : "rgba(15, 23, 42, 0.1)",
        },
        ticks: {
          color: isDark ? "rgb(241, 245, 249)" : "rgb(15, 23, 42)",
        },
        beginAtZero: true,
      },
    },
  };
}