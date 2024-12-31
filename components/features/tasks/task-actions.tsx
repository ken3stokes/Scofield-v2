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
import { db, Task } from '@/lib/db';
import { EditTaskDialog } from './edit-task-dialog';
import { calculateProgress } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface TaskActionsProps {
  goalId: string;
  task: Task;
}

export function TaskActions({ goalId, task }: TaskActionsProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      const goal = await db.goals.get(goalId);
      if (!goal) throw new Error('Goal not found');

      const updatedTasks = goal.tasks.filter(t => t.id !== task.id);
      await db.goals.update(goalId, {
        tasks: updatedTasks,
        progress: calculateProgress(updatedTasks)
      });

      toast({
        title: "Task deleted",
        description: "The task has been successfully deleted.",
      });
    } catch (error) {
      console.error('Failed to delete task:', error);
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
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
          <DropdownMenuItem 
            className="text-destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash className="mr-2 h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTaskDialog
        goalId={goalId}
        task={task}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}