"use client";

import { Task } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { TaskCard } from './task-card';

interface TaskColumnProps {
  title: string;
  tasks: (Task & { goalTitle: string; goalId: string; })[];
  status: 'pending' | 'in-progress' | 'completed';
}

export function TaskColumn({ title, tasks = [], status }: TaskColumnProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>
      <div className="space-y-3 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            goalTitle={task.goalTitle}
            goalId={task.goalId}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground">
            No tasks
          </div>
        )}
      </div>
    </Card>
  );
}