"use client";

import { GoalForm } from './goal-form';

export function GoalHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Goals Workspace</h1>
        <p className="text-muted-foreground">
          Track and manage your SMART goals
        </p>
      </div>
      <GoalForm />
    </div>
  );
}