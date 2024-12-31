"use client";

import { useDatabase } from '@/hooks/use-database';
import { GoalFrameworkHeader } from '@/components/features/goal-framework/header';
import { GoalFrameworkContent } from '@/components/features/goal-framework/content';
import type { Goal } from '@/lib/db';

export const runtime = 'nodejs';

export default function GoalFrameworkPage() {
  const { data: goals = [], isLoading } = useDatabase<Goal>('goals');

  return (
    <div className="container mx-auto p-6">
      <GoalFrameworkHeader />
      {isLoading ? (
        <div className="text-center p-12">
          <p className="text-muted-foreground">Loading goals...</p>
        </div>
      ) : (
        <GoalFrameworkContent goals={goals} />
      )}
    </div>
  );
}