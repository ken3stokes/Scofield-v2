"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-2",
          view === "grid" && "bg-background shadow-sm"
        )}
        onClick={() => onViewChange("grid")}
      >
        <LayoutGrid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-2",
          view === "list" && "bg-background shadow-sm"
        )}
        onClick={() => onViewChange("list")}
      >
        <List className="h-4 w-4 mr-2" />
        List
      </Button>
    </div>
  );
}