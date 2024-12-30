"use client";

import { Task } from '@/lib/db';
import { TaskList } from './task-list';
import { TaskForm } from './task-form';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface TaskManagementProps {
  goalId: string;
  tasks: Task[];
  dueDate: Date;
}

type TaskStatus = 'pending' | 'in-progress' | 'completed';

const statusConfig: Record<TaskStatus, { label: string; variant: 'default' | 'secondary' | 'success' }> = {
  'pending': { label: 'To Do', variant: 'default' },
  'in-progress': { label: 'In Progress', variant: 'secondary' },
  'completed': { label: 'Completed', variant: 'success' },
};

export function TaskManagement({ goalId, tasks, dueDate }: TaskManagementProps) {
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
  const stats = Object.entries(statusConfig).map(([status]) => ({
    status,
    count: (tasksByStatus[status as TaskStatus] || []).length,
    percentage: totalTasks === 0 ? 0 : 
      Math.round(((tasksByStatus[status as TaskStatus] || []).length / totalTasks) * 100),
  }));

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tasks</h3>
        <TaskForm goalId={goalId} goalDueDate={dueDate} />
      </div>

      {/* Task Statistics */}
      {totalTasks > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ status, count, percentage }) => (
            <div
              key={status}
              className="flex flex-col items-center justify-center p-3 bg-card rounded-lg border"
            >
              <Badge variant={statusConfig[status as TaskStatus].variant}>
                {statusConfig[status as TaskStatus].label}
              </Badge>
              <div className="mt-2 text-center">
                <p className="text-2xl font-semibold">{count}</p>
                <Progress value={percentage} className="w-16 h-1 mx-auto mt-1" />
                <p className="text-xs text-muted-foreground mt-1">{percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task List */}
      <TaskList goalId={goalId} tasks={tasks} />
    </div>
  );
}
