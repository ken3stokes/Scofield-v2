"use client";

import { useDatabase } from '@/hooks/use-database';
import { ProgressTrackingHeader } from '@/components/features/progress-tracking/header';
import { ProgressTrackingContent } from '@/components/features/progress-tracking/content';
import type { Goal } from '@/lib/db';

export const runtime = 'nodejs';

export default function ProgressTrackingPage() {
  const { data: goals = [], isLoading, error } = useDatabase<Goal>('goals');

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <p className="text-destructive">Error loading data: {error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <p className="text-muted-foreground">Loading progress data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <ProgressTrackingHeader />
      <ProgressTrackingContent goals={goals} />
    </div>
  );
}