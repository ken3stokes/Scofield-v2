"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

interface ProgressOverviewProps {
  goals: Goal[];
}

export function ProgressOverview({ goals }: ProgressOverviewProps) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.progress === 100).length;
  const inProgressGoals = goals.filter(goal => goal.progress > 0 && goal.progress < 100).length;
  const averageProgress = goals.reduce((acc, goal) => acc + goal.progress, 0) / totalGoals || 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Goals"
          value={totalGoals}
          icon={<Target className="h-5 w-5" />}
        />
        <MetricCard
          title="Completed"
          value={completedGoals}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <MetricCard
          title="In Progress"
          value={inProgressGoals}
          icon={<Clock className="h-5 w-5" />}
        />
        <MetricCard
          title="Average Progress"
          value={`${Math.round(averageProgress)}%`}
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </Card>
  );
}