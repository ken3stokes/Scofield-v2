"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TimelineChartProps {
  goals: Goal[];
}

export function TimelineChart({ goals }: TimelineChartProps) {
  const sortedGoals = [...goals].sort((a, b) => 
    new Date(a.timebound).getTime() - new Date(b.timebound).getTime()
  );

  const data = {
    labels: sortedGoals.map(goal => goal.title),
    datasets: [
      {
        label: "Due Date",
        data: sortedGoals.map(goal => ({
          x: goal.title,
          y: new Date(goal.timebound).getTime(),
        })),
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
        text: "Goal Timeline",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return format(context.raw.y, "PPP");
          },
        },
      },
    },
    scales: {
      y: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  return (
    <Card className="p-6">
      <Bar options={options} data={data} />
    </Card>
  );
}