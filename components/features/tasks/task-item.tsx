"use client";

import { useState } from 'react';
import { Task } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Circle, CheckCircle2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { calculateProgress } from '@/lib/utils';
import { TaskDeleteButton } from './task-delete-button';
import { useToast } from '@/hooks/use-toast';

interface TaskItemProps {
  goalId: string;
  task: Task;
}

export function TaskItem({ goalId, task }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const updateTaskStatus = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      // Update the task status in the tasks table
      await db.transaction('rw', [db.tasks, db.goals], async () => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        
        // Update task status
        await db.tasks.update(task.id, {
          status: newStatus
        });
        
        // The goal progress will be automatically updated via the hook in db.ts
      });

      toast({
        title: "Success",
        description: "Task status updated successfully.",
      });
    } catch (error) {
      console.error('Failed to update task status:', error);
      toast({
        title: "Error",
        description: "Failed to update task status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-lg border",
      task.status === 'completed' && "bg-muted/50"
    )}>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0",
            task.status === 'completed' && "text-primary"
          )}
          onClick={updateTaskStatus}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : task.status === 'completed' ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
          <span className="sr-only">
            {task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          </span>
        </Button>
        <div className="space-y-1">
          <p className={cn(
            "font-medium",
            task.status === 'completed' && "line-through text-muted-foreground"
          )}>
            {task.title}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(task.dueDate), "PPP")}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
        <TaskDeleteButton
          goalId={goalId}
          taskId={task.id}
          taskTitle={task.title}
        />
      </div>
    </div>
  );
}