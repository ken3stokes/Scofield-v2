"use client";

export const priorityChartConfig = {
  plugins: {
    legend: {
      position: 'right' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 12
        }
      },
    },
    datalabels: {
      display: true,
      color: '#fff',
      font: {
        weight: 'bold',
        size: 16
      },
      formatter: (value: number) => value || '',
      anchor: 'center',
      align: 'center',
      offset: 0
    }
  },
  radius: '70%'
};

export const priorityChartColors = {
  urgent: 'rgb(239, 68, 68)',   // Red
  high: 'rgb(249, 115, 22)',    // Orange
  medium: 'rgb(234, 179, 8)',   // Yellow
  low: 'rgb(34, 197, 94)',      // Green
};