"use client";

import { Goal } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Target, CheckCircle2, Clock, TrendingUp } from "lucide-react";

interface DashboardSummaryProps {
  goals: Goal[];
}

export function DashboardSummary({ goals }: DashboardSummaryProps) {
  // Goals metrics
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.progress === 100).length;
  const averageProgress = goals.reduce((acc, goal) => acc + goal.progress, 0) / totalGoals || 0;
  const upcomingGoals = goals.filter(goal => 
    new Date(goal.timebound).getTime() > new Date().getTime()
  ).length;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Goals Overview</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Goals"
          value={totalGoals}
          icon={<Target className="h-4 w-4" />}
        />
        <SummaryCard
          title="Completed"
          value={completedGoals}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <SummaryCard
          title="Average Progress"
          value={`${Math.round(averageProgress)}%`}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <SummaryCard
          title="Upcoming"
          value={upcomingGoals}
          icon={<Clock className="h-4 w-4" />}
        />
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <Card className="p-6 dark:bg-card/50 dark:backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="text-primary dark:text-primary/80">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
    </Card>
  );
}