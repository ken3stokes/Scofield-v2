"use client";

import { useDatabase } from '@/hooks/use-database';
import { SmartGoalsHeader } from '@/components/features/smart-goals/header';
import { SmartGoalsContent } from '@/components/features/smart-goals/content';
import type { Goal } from '@/lib/db';

export const runtime = 'nodejs';

export default function SmartGoalsPage() {
  const { data: goals = [], isLoading } = useDatabase<Goal>('goals');

  return (
    <div className="container mx-auto p-6">
      <SmartGoalsHeader />
      {isLoading ? (
        <div className="text-center p-12">
          <p className="text-muted-foreground">Loading goals...</p>
        </div>
      ) : (
        <SmartGoalsContent goals={goals} />
      )}
    </div>
  );
}