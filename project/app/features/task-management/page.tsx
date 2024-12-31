"use client";

import { useDatabase } from '@/hooks/use-database';
import { TaskManagementHeader } from '@/components/features/task-management/header';
import { TaskManagementContent } from '@/components/features/task-management/content';
import type { Goal } from '@/lib/db';

export const runtime = 'nodejs';

export default function TaskManagementPage() {
  const { data: goals = [], isLoading } = useDatabase<Goal>('goals');

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <TaskManagementHeader />
      <TaskManagementContent goals={goals} />
    </div>
  );
}