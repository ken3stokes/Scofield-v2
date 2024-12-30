"use client";

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from '@/lib/db';
import { calculateProgress } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface TaskStatusSelectProps {
  taskId: string;
  goalId: string;
  currentStatus: 'pending' | 'in-progress' | 'completed';
}

export function TaskStatusSelect({
  taskId,
  goalId,
  currentStatus,
}: TaskStatusSelectProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const { toast } = useToast();

  const updateStatus = async (newStatus: string) => {
    if (newStatus === status) return;
    
    setIsUpdating(true);
    try {
      // Ensure database is open
      if (!db.isOpen()) {
        await db.open();
      }

      // Start transaction
      await db.transaction('rw', [db.tasks, db.goals], async () => {
        // Update task in tasks table
        await db.tasks.update(taskId, {
          status: newStatus as typeof currentStatus
        });

        // Update goal progress
        const goal = await db.goals.get(goalId);
        if (goal) {
          const tasks = await db.tasks.where('goalId').equals(goalId).toArray();
          const progress = calculateProgress(tasks);
          await db.goals.update(goalId, {
            progress,
            status: progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started',
            updatedAt: new Date()
          });
        }
      });

      setStatus(newStatus as typeof currentStatus);
      toast({
        title: "Status Updated",
        description: "Task status has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating task status:', error);
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={updateStatus}
      disabled={isUpdating}
    >
      <SelectTrigger className="w-full">
        <SelectValue>
          {isUpdating ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Updating...</span>
            </div>
          ) : (
            status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="in-progress">In Progress</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  );
}