"use client";

import { useDatabase } from '@/hooks/use-database';
import { MetricsGrid } from '@/components/shared/analytics/metrics-grid';
import { ProgressChart } from '@/components/shared/analytics/progress-chart';
import { CategoryDistribution } from '@/components/shared/analytics/category-distribution';
import { PriorityDistribution } from '@/components/shared/analytics/priority-distribution';
import type { Goal } from '@/lib/db';

export const runtime = 'nodejs';

export default function AnalyticsPage() {
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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Analytics</h1>
        <p className="text-muted-foreground">
          Track your progress and analyze your goals
        </p>
      </div>
      
      {isLoading ? (
        <div className="text-center p-12">
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <MetricsGrid goals={goals} />
          
          <div className="grid gap-6 lg:grid-cols-2">
            <ProgressChart goals={goals} />
            <PriorityDistribution goals={goals} />
          </div>

          <CategoryDistribution goals={goals} />
        </div>
      )}
    </div>
  );
}