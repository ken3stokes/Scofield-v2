import { format } from "date-fns";

export const chartOptions = {
  // ... other chart options ...

  timeline: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (items: any[]) => items[0].label,
          label: (context: any) => `Goals: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 2,
          precision: 0,
        },
        title: {
          display: true,
          text: 'Cumulative Goals',
        },
      },
    },
  },
};