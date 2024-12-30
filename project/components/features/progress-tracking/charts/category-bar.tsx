"use client";

import { Goal } from '@/lib/db';
import { Bar } from 'react-chartjs-2';
import { CHART_CATEGORIES } from '@/lib/charts/constants';

interface CategoryBarProps {
  goals: Goal[];
  isDark: boolean;
  options: any;
}

export function CategoryBar({ goals, isDark, options }: CategoryBarProps) {
  const data = {
    labels: CHART_CATEGORIES,
    datasets: [{
      label: "Goals by Category",
      data: CHART_CATEGORIES.map(category => 
        goals.filter(goal => 
          goal.category === category.toLowerCase()
        ).length
      ),
      backgroundColor: [
        'rgb(99, 155, 255)',    // Career (blue)
        'rgb(240, 240, 240)',   // Education (light gray)
        'rgb(240, 240, 240)',   // Health (light gray)
        'rgb(240, 240, 240)',   // Financial (light gray)
        'rgb(240, 240, 240)',   // Business (light gray)
        'rgb(240, 240, 240)',   // Hobbies (light gray)
        'rgb(240, 240, 240)',   // Security (light gray)
      ],
      borderRadius: 0,          // Remove border radius
      maxBarThickness: 30,      // Control bar thickness
    }]
  };

  const chartOptions = {
    ...options,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'start' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'rect',
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
        grid: {
          display: true,
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          padding: 5,
        }
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    barThickness: 25,
  };

  return <Bar data={data} options={chartOptions} />;
}