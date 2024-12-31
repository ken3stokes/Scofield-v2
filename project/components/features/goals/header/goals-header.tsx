"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ViewToggle } from "./view-toggle";
import { SortOptions } from "./sort-options";
import { GoalForm } from "../goal-form";

export function GoalsHeader() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("dueDate-asc");
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="flex flex-col gap-6 mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Goals Workspace</h1>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Goal
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <ViewToggle view={view} onViewChange={setView} />
        <SortOptions selectedSort={sort} onSortChange={setSort} />
      </div>

      <GoalForm
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
      />
    </div>
  );
}