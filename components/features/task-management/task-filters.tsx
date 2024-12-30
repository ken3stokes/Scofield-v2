"use client";

import { Goal } from '@/lib/db';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskFiltersProps {
  goals: Goal[];
  selectedGoal: string;
  selectedPriority: string;
  onGoalChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export function TaskFilters({
  goals,
  selectedGoal,
  selectedPriority,
  onGoalChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-64">
        <Select value={selectedGoal} onValueChange={onGoalChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Goals</SelectItem>
            {goals.map((goal) => (
              <SelectItem key={goal.id} value={goal.id}>
                {goal.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-64">
        <Select value={selectedPriority} onValueChange={onPriorityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}