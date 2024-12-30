"use client";

export const timelineChartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      callbacks: {
        title: (context: any[]) => context[0].label,
        label: (context: any) => `Goals: ${context.raw.y}`,
      },
    },
  },
  scales: {
    x: {
      type: 'category' as const,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        maxRotation: 45,
        minRotation: 45,
      }
    },
    y: {
      type: 'linear' as const,
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
      },
      ticks: {
        stepSize: 1,
        precision: 0,
      },
      title: {
        display: true,
        text: 'Cumulative Goals'
      }
    }
  }
};