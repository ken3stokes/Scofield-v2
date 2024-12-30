"use client";

import { Task } from '@/lib/db';
import { TaskItem } from './task-item';
import { Badge } from '@/components/ui/badge';

interface TaskListProps {
  goalId: string;
  tasks: Task[];
}

type TaskStatus = 'pending' | 'in-progress' | 'completed';

const statusConfig: Record<TaskStatus, { label: string; variant: 'default' | 'secondary' | 'success' }> = {
  'pending': { label: 'To Do', variant: 'default' },
  'in-progress': { label: 'In Progress', variant: 'secondary' },
  'completed': { label: 'Completed', variant: 'success' },
};

export function TaskList({ goalId, tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-4 bg-muted/10 rounded-lg">
        <p className="text-sm text-muted-foreground">No tasks yet</p>
      </div>
    );
  }

  // Group tasks by status
  const tasksByStatus = tasks.reduce((acc, task) => {
    const status = task.status as TaskStatus;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  // Calculate statistics
  const totalTasks = tasks.length;
  const stats = Object.entries(tasksByStatus).map(([status, statusTasks]) => ({
    status,
    count: statusTasks.length,
    percentage: Math.round((statusTasks.length / totalTasks) * 100),
  }));

  return (
    <div className="space-y-6">
      {/* Task Statistics */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ status, count, percentage }) => (
          <div
            key={status}
            className="flex flex-col items-center justify-center p-3 bg-card rounded-lg border"
          >
            <Badge variant={statusConfig[status as TaskStatus].variant}>
              {statusConfig[status as TaskStatus].label}
            </Badge>
            <p className="mt-2 text-2xl font-semibold">{count}</p>
            <p className="text-sm text-muted-foreground">{percentage}%</p>
          </div>
        ))}
      </div>

      {/* Task Groups */}
      <div className="space-y-6">
        {(Object.keys(statusConfig) as TaskStatus[]).map((status) => {
          const statusTasks = tasksByStatus[status] || [];
          if (statusTasks.length === 0) return null;

          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{statusConfig[status].label}</h3>
                <Badge variant="outline">{statusTasks.length}</Badge>
              </div>
              <div className="space-y-2">
                {statusTasks.map((task) => (
                  <TaskItem key={task.id} goalId={goalId} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}