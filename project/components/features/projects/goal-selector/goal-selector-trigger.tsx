"use client";

import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

interface GoalSelectorTriggerProps {
  selectedCount: number;
  open: boolean;
}

export function GoalSelectorTrigger({ selectedCount, open }: GoalSelectorTriggerProps) {
  return (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-full justify-between"
    >
      <span>
        {selectedCount === 0
          ? "Select goals..."
          : `${selectedCount} goal${selectedCount === 1 ? "" : "s"} selected`}
      </span>
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
}