"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { db, Goal } from '@/lib/db';
import { EditGoalDialog } from './edit-goal-dialog';

interface GoalActionsProps {
  goal: Goal;
}

export function GoalActions({ goal }: GoalActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleDelete = async () => {
    await db.goals.delete(goal.id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditGoalDialog 
        goal={goal}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}