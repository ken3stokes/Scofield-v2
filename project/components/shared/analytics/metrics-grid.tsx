"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { 
  Target, 
  CheckCircle2, 
  Clock, 
  TrendingUp
} from 'lucide-react';
import { differenceInDays, isPast } from 'date-fns';

interface MetricsGridProps {
  goals: Goal[];
}

export function MetricsGrid({ goals }: MetricsGridProps) {
  // Core metrics
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.progress === 100).length;
  const inProgressGoals = goals.filter(goal => goal.progress > 0 && goal.progress < 100).length;
  const notStartedGoals = goals.filter(goal => goal.progress === 0).length;
  
  // Progress metrics
  const averageProgress = Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / totalGoals || 0);
  const highPriorityProgress = Math.round(goals
    .filter(goal => goal.priority === 'high' || goal.priority === 'urgent')
    .reduce((acc, goal) => acc + goal.progress, 0) / goals.filter(goal => goal.priority === 'high' || goal.priority === 'urgent').length || 0);

  // Time-based metrics
  const today = new Date();
  const upcomingDeadlines = goals.filter(goal => {
    const daysUntilDue = differenceInDays(new Date(goal.timebound), today);
    return daysUntilDue >= 0 && daysUntilDue <= 7 && goal.progress < 100;
  }).length;

  const overdue = goals.filter(goal => 
    isPast(new Date(goal.timebound)) && goal.progress < 100
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Goals"
        value={totalGoals}
        icon={Target}
        description={`${inProgressGoals} in progress, ${notStartedGoals} not started`}
      />
      <MetricCard
        title="Completion Rate"
        value={`${Math.round((completedGoals / totalGoals) * 100)}%`}
        icon={CheckCircle2}
        description={`${completedGoals} of ${totalGoals} goals completed`}
      />
      <MetricCard
        title="Average Progress"
        value={`${averageProgress}%`}
        icon={TrendingUp}
        description={`${highPriorityProgress}% for high priority goals`}
      />
      <MetricCard
        title="Time Management"
        value={upcomingDeadlines}
        icon={Clock}
        description={`${overdue} overdue goals`}
        alert={overdue > 0}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  alert?: boolean;
}

function MetricCard({ title, value, icon: Icon, description, alert }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <div className={alert ? "text-destructive" : "text-primary"}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}