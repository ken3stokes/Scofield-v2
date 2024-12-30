"use client";

import { Goal } from "@/lib/db";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GoalActions } from "../../goal-actions";

interface ListViewProps {
  goals: Goal[];
}

export function ListView({ goals }: ListViewProps) {
  if (goals.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-lg">
        <p className="text-muted-foreground">No goals found. Create your first goal to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="flex items-center justify-between p-4 bg-card rounded-lg border"
        >
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium truncate">{goal.title}</h3>
              <Badge variant={goal.priority === 'urgent' ? 'destructive' : 'secondary'}>
                {goal.priority}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={goal.progress} className="w-32" />
              <span className="text-sm text-muted-foreground">
                Due {format(new Date(goal.timebound), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
          <GoalActions goal={goal} />
        </div>
      ))}
    </div>
  );
}