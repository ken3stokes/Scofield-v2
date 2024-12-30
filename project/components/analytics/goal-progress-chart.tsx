"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GoalProgressChartProps {
  goals: Goal[];
}

export function GoalProgressChart({ goals }: GoalProgressChartProps) {
  const data = {
    labels: goals.map(goal => goal.title),
    datasets: [
      {
        label: "Progress",
        data: goals.map(goal => goal.progress),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Goal Progress Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <Card className="p-6">
      <Line options={options} data={data} />
    </Card>
  );
}