"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { SmartCriteria } from './smart-criteria';
import { useState } from 'react';

interface SmartGoalCardProps {
  goal: Goal;
}

export function SmartGoalCard({ goal }: SmartGoalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{goal.title}</h3>
          <Badge variant={goal.priority === 'urgent' ? 'destructive' : 'secondary'}>
            {goal.priority}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(goal.progress)}%</span>
          </div>
          <Progress value={Math.round(goal.progress)} />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Due {format(new Date(goal.timebound), 'MMM d, yyyy')}
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:underline"
          >
            {isExpanded ? 'Show less' : 'Show SMART criteria'}
          </button>
        </div>

        {isExpanded && (
          <SmartCriteria
            specific={goal.specific}
            measurable={goal.measurable}
            achievable={goal.achievable}
            relevant={goal.relevant}
            timebound={goal.timebound}
          />
        )}
      </div>
    </Card>
  );
}