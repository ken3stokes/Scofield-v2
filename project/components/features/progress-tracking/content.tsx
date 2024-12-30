"use client";

import { Goal } from '@/lib/db';
import { RecentActivity } from './recent-activity';
import { ProgressCharts } from './progress-charts';

interface ProgressTrackingContentProps {
  goals: Goal[];
}

export function ProgressTrackingContent({ goals }: ProgressTrackingContentProps) {
  return (
    <div className="space-y-8">
      <ProgressCharts goals={goals} />
      <RecentActivity goals={goals} />
    </div>
  );
}