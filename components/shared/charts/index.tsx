"use client";

import { Goal } from "@/lib/db";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "@/lib/chart-registry";

interface ChartsProps {
  goals: Goal[];
}

export function Charts({ goals }: ChartsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textColor = isDark ? "rgb(241, 245, 249)" : "rgb(15, 23, 42)";
  const gridColor = isDark ? "rgba(241, 245, 249, 0.1)" : "rgba(15, 23, 42, 0.1)";

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
      title: {
        color: textColor,
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
        },
      },
    },
  };

  const progressData = {
    labels: goals.map(goal => goal.title),
    datasets: [{
      label: "Progress",
      data: goals.map(goal => goal.progress),
      borderColor: isDark ? "rgb(96, 165, 250)" : "rgb(59, 130, 246)",
      backgroundColor: isDark ? "rgba(96, 165, 250, 0.1)" : "rgba(59, 130, 246, 0.1)",
      fill: true,
    }],
  };

  const categoryData = {
    labels: ["Career", "Education", "Health", "Financial", "Business", "Hobbies", "Security"],
    datasets: [{
      data: ["career", "education", "health", "financial", "business", "hobbies", "security"].map(
        category => goals.filter(goal => goal.category === category).length
      ),
      backgroundColor: isDark ? [
        "rgba(96, 165, 250, 0.8)",
        "rgba(52, 211, 153, 0.8)",
        "rgba(251, 191, 36, 0.8)",
        "rgba(129, 140, 248, 0.8)",
        "rgba(244, 114, 182, 0.8)",
        "rgba(167, 139, 250, 0.8)",
        "rgba(156, 163, 175, 0.8)",
      ] : [
        "rgba(59, 130, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(99, 102, 241, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(139, 92, 246, 0.8)",
        "rgba(107, 114, 128, 0.8)",
      ],
    }],
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="h-[400px]">
            <Line data={progressData} options={commonOptions} />
          </div>
        </Card>
        <Card className="p-6 dark:bg-card/50 dark:backdrop-blur-sm">
          <div className="h-[400px]">
            <Bar data={categoryData} options={commonOptions} />
          </div>
        </Card>
      </div>
    </div>
  );
}