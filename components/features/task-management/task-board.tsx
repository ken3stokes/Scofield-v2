"use client";

import { Goal, Task } from '@/lib/db';
import { TaskColumn } from './task-column';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

interface TaskBoardProps {
  goals: Goal[];
}

export function TaskBoard({ goals = [] }: TaskBoardProps) {
  // Query tasks directly from the tasks table
  const tasks = useLiveQuery(async () => {
    const goalIds = goals.map(g => g.id);
    return await db.tasks.where('goalId').anyOf(goalIds).toArray();
  }, [goals]);

  if (!tasks) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        Loading tasks...
      </div>
    );
  }

  // Add goal context to tasks
  const tasksWithContext = tasks.map(task => {
    const goal = goals.find(g => g.id === task.goalId);
    return {
      ...task,
      goalTitle: goal?.title || 'Unknown Goal'
    };
  });

  // Group tasks by status
  const pendingTasks = tasksWithContext.filter(task => task.status === 'pending');
  const inProgressTasks = tasksWithContext.filter(task => task.status === 'in-progress');
  const completedTasks = tasksWithContext.filter(task => task.status === 'completed');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TaskColumn
        title="To Do"
        tasks={pendingTasks}
        status="pending"
      />
      <TaskColumn
        title="In Progress"
        tasks={inProgressTasks}
        status="in-progress"
      />
      <TaskColumn
        title="Completed"
        tasks={completedTasks}
        status="completed"
      />
    </div>
  );
}