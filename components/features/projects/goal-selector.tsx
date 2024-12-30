"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Goal } from "@/lib/db";

interface GoalSelectorProps {
  goals: Goal[];
  selectedGoals: string[];
  onSelect: (goalIds: string[]) => void;
}

export function GoalSelector({ goals = [], selectedGoals = [], onSelect }: GoalSelectorProps) {
  const [open, setOpen] = useState(false);

  const toggleGoal = (goalId: string) => {
    const newSelection = selectedGoals.includes(goalId)
      ? selectedGoals.filter(id => id !== goalId)
      : [...selectedGoals, goalId];
    onSelect(newSelection);
    // Don't close the popover to allow multiple selections
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedGoals.length === 0
            ? "Select goals..."
            : `${selectedGoals.length} goal${selectedGoals.length === 1 ? "" : "s"} selected`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search goals..." />
          <CommandEmpty>No goals found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {goals.map((goal) => (
              <CommandItem
                key={goal.id}
                value={goal.id}
                onSelect={() => toggleGoal(goal.id)}
                className="flex items-center gap-2"
              >
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded border",
                    selectedGoals.includes(goal.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted"
                  )}
                >
                  {selectedGoals.includes(goal.id) && (
                    <Check className="h-3 w-3" />
                  )}
                </div>
                <span>{goal.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}