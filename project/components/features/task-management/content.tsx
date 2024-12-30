"use client";

import { Goal } from '@/lib/db';
import { TaskBoard } from './task-board';
import { TaskFilters } from './task-filters';
import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

interface TaskManagementContentProps {
  goals: Goal[];
}

export function TaskManagementContent({ goals }: TaskManagementContentProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<string | 'all'>('all');

  const filteredGoals = goals.filter(goal => {
    if (selectedGoal !== 'all' && goal.id !== selectedGoal) return false;
    return true;
  });

  // We'll let the TaskBoard component handle task filtering since it has direct access to tasks

  return (
    <div className="space-y-6">
      <TaskFilters
        goals={goals}
        selectedGoal={selectedGoal}
        selectedPriority={selectedPriority}
        onGoalChange={setSelectedGoal}
        onPriorityChange={setSelectedPriority}
      />
      <TaskBoard goals={filteredGoals} />
    </div>
  );
}