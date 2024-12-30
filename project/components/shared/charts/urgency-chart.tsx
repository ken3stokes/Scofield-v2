"use client";

import { Bar } from "react-chartjs-2";
import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { useGoalsByUrgencyData } from "@/hooks/analytics/use-goals-by-urgency";
import "@/lib/chart-registry";

interface UrgencyChartProps {
  goals: Goal[];
}

export function UrgencyChart({ goals }: UrgencyChartProps) {
  const data = useGoalsByUrgencyData(goals);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Goals by Urgency',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  return (
    <Card className="p-6">
      <div className="h-[400px]">
        <Bar options={options} data={data} />
      </div>
    </Card>
  );
}