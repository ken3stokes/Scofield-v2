"use client";

import { useState } from "react";
import { Goal } from "@/lib/db";
import { GoalSelectorTrigger } from "./goal-selector-trigger";
import { GoalSelectorContent } from "./goal-selector-content";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface GoalSelectorProps {
  goals: Goal[];
  selectedGoals: string[];
  onSelect: (goalIds: string[]) => void;
}

export function GoalSelector({ 
  goals = [], 
  selectedGoals = [], 
  onSelect 
}: GoalSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (goalId: string) => {
    const newSelection = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    onSelect(newSelection);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <GoalSelectorTrigger 
          selectedCount={selectedGoals.length} 
          open={open}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <GoalSelectorContent
          goals={goals}
          selectedGoals={selectedGoals}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}