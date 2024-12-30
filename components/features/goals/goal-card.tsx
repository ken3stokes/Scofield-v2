"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { GoalDetailsDialog } from './goal-details-dialog';

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const taskCount = goal.tasks?.length || 0;
  const completedTasks = goal.tasks?.filter(task => task.status === 'completed').length || 0;

  return (
    <>
      <Card
        className="p-4 cursor-pointer hover:shadow-md transition-shadow dark:hover:shadow-lg dark:hover:shadow-primary/5 dark:border-border/50"
        onClick={() => setShowDetails(true)}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">{goal.title}</h3>
            <Badge variant={goal.priority === 'urgent' ? 'destructive' : 'secondary'}>
              {goal.priority}
            </Badge>
          </div>

          <Progress value={goal.progress} className="dark:bg-muted" />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Tasks: {completedTasks}/{taskCount}</span>
            <span>{goal.progress}% Complete</span>
          </div>
        </div>
      </Card>

      <GoalDetailsDialog
        goal={goal}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}