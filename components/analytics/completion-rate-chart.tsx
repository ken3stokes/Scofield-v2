"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CompletionRateChartProps {
  goals: Goal[];
}

export function CompletionRateChart({ goals }: CompletionRateChartProps) {
  const completed = goals.filter(goal => goal.progress === 100).length;
  const inProgress = goals.filter(goal => goal.progress > 0 && goal.progress < 100).length;
  const notStarted = goals.filter(goal => goal.progress === 0).length;

  const data = {
    labels: ["Completed", "In Progress", "Not Started"],
    datasets: [
      {
        data: [completed, inProgress, notStarted],
        backgroundColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(156, 163, 175)",
        ],
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
        text: "Goal Completion Rate",
      },
    },
  };

  return (
    <Card className="p-6">
      <Doughnut options={options} data={data} />
    </Card>
  );
}