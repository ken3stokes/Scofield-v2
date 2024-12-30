"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { CheckCircle2, Clock, AlertTriangle, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecentActivityProps {
  goals: Goal[];
}

export function RecentActivity({ goals }: RecentActivityProps) {
  const sortedGoals = [...goals].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Recent Activity</h2>
      <Card className="p-6">
        <div className="space-y-6">
          {sortedGoals.map((goal) => (
            <ActivityItem key={goal.id} goal={goal} />
          ))}
          {goals.length === 0 && (
            <div className="text-center py-8">
              <Target className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No recent activity to display</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

interface ActivityItemProps {
  goal: Goal;
}

function ActivityItem({ goal }: ActivityItemProps) {
  const getStatusIcon = () => {
    if (goal.progress === 100) {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
    if (goal.progress > 0) {
      return <Clock className="h-5 w-5 text-blue-500" />;
    }
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  };

  const getStatusText = () => {
    if (goal.progress === 100) return 'Completed';
    if (goal.progress > 0) return 'In Progress';
    return 'Not Started';
  };

  return (
    <div className="flex items-start gap-4">
      <div className="mt-1">{getStatusIcon()}</div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{goal.title}</h3>
          <Badge variant="outline">{goal.category}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <span>{getStatusText()} • </span>
          <span>{goal.progress}% complete • </span>
          <span>Due {format(new Date(goal.timebound), 'MMM d, yyyy')}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated {format(new Date(goal.updatedAt), 'PPP')}
        </div>
      </div>
    </div>
  );
}