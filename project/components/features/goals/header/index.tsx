"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ViewToggle } from "./view-toggle";
import { SortOptions } from "./sort-options";
import { GoalForm } from "../goal-form";
import { useState } from "react";

interface GoalsHeaderProps {
  view: "grid" | "list";
  sort: string;
  onViewChange: (view: "grid" | "list") => void;
  onSortChange: (sort: string) => void;
}

export function GoalsHeader({ 
  view, 
  sort, 
  onViewChange, 
  onSortChange 
}: GoalsHeaderProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Goals</h1>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Goal
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <ViewToggle view={view} onViewChange={onViewChange} />
        <SortOptions selectedSort={sort} onSortChange={onSortChange} />
      </div>

      <GoalForm
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
      />
    </div>
  );
}