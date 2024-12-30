"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Goal } from "@/lib/db";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface GoalSelectorContentProps {
  goals: Goal[];
  selectedGoals: string[];
  onSelect: (goalId: string) => void;
}

export function GoalSelectorContent({
  goals = [],
  selectedGoals = [],
  onSelect,
}: GoalSelectorContentProps) {
  return (
    <Command>
      <CommandInput placeholder="Search goals..." />
      <CommandList>
        <CommandEmpty>No goals found.</CommandEmpty>
        <CommandGroup>
          {goals.map((goal) => (
            <CommandItem
              key={goal.id}
              onSelect={() => onSelect(goal.id)}
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
      </CommandList>
    </Command>
  );
}