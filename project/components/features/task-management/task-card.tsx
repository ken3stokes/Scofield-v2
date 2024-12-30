"use client";

import { Task } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target } from 'lucide-react';
import { format } from 'date-fns';
import { TaskStatusSelect } from './task-status-select';

interface TaskCardProps {
  task: Task;
  goalTitle: string;
  goalId: string;
}

export function TaskCard({ task, goalTitle, goalId }: TaskCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-medium">{task.title}</h4>
          <Badge variant={getPriorityVariant(task.priority)}>
            {task.priority}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Target className="h-4 w-4" />
          <span>{goalTitle}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
        </div>

        <TaskStatusSelect
          taskId={task.id}
          goalId={goalId}
          currentStatus={task.status}
        />
      </div>
    </Card>
  );
}

function getPriorityVariant(priority: Task['priority']) {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'default';
    case 'low':
      return 'secondary';
    default:
      return 'default';
  }
}