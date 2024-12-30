"use client";

import { Goal } from "@/lib/db";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GoalActions } from "../goal-actions";
import { useState } from "react";
import { GoalDetailsDialog } from "../goal-details-dialog";

interface ListViewProps {
  goals: Goal[];
}

export function ListView({ goals }: ListViewProps) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  if (goals.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-lg">
        <p className="text-muted-foreground">No goals found. Create your first goal to get started!</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {goals.map((goal) => {
          const taskCount = goal.tasks?.length || 0;
          const completedTasks = goal.tasks?.filter(task => task.status === 'completed').length || 0;

          return (
            <div
              key={goal.id}
              className="flex items-center justify-between p-4 bg-card rounded-lg border cursor-pointer hover:shadow-md transition-shadow dark:hover:shadow-lg dark:hover:shadow-primary/5"
              onClick={() => setSelectedGoal(goal)}
            >
              <div className="flex-1 min-w-0 mr-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium truncate">{goal.title}</h3>
                  <Badge variant={goal.priority === 'urgent' ? 'destructive' : 'secondary'}>
                    {goal.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Progress value={goal.progress} className="w-32" />
                    <span className="text-sm text-muted-foreground">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Tasks: {completedTasks}/{taskCount}</span>
                    <span>Due {format(new Date(goal.timebound), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <GoalActions goal={goal} />
              </div>
            </div>
          );
        })}
      </div>

      {selectedGoal && (
        <GoalDetailsDialog
          goal={selectedGoal}
          open={true}
          onOpenChange={(open) => !open && setSelectedGoal(null)}
        />
      )}
    </>
  );
}