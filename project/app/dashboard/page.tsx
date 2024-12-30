"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Charts } from "@/components/shared/charts";
import { DashboardSummary } from "@/components/shared/summary";

export default function DashboardPage() {
  const goals = useLiveQuery(() => db.goals.toArray());

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress and analyze your goals
        </p>
      </div>
      
      {goals ? (
        <div className="space-y-6">
          <DashboardSummary goals={goals} />
          <Charts goals={goals} />
        </div>
      ) : (
        <div className="text-center p-12">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      )}
    </div>
  );
}