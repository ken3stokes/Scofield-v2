"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { db, Task } from '@/lib/db';
import { createTaskSchema, type TaskFormData } from './schema';
import { FormFields } from './form-fields';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { calculateProgress } from '@/lib/utils';

interface EditTaskDialogProps {
  goalId: string;
  task: Task;
  goalDueDate: Date;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskDialog({ goalId, task, goalDueDate, open, onOpenChange }: EditTaskDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<TaskFormData>({
    resolver: zodResolver(createTaskSchema(goalDueDate)),
  });

  useEffect(() => {
    if (task && open) {
      form.reset({
        title: task.title,
        status: task.status,
        priority: task.priority,
        dueDate: new Date(task.dueDate),
      });
    }
  }, [form, task, open]);

  const onSubmit = async (data: TaskFormData) => {
    if (!task) return;
    
    setIsSubmitting(true);
    try {
      const goal = await db.goals.get(goalId);
      if (!goal) throw new Error('Goal not found');

      const updatedTasks = goal.tasks.map((t) =>
        t.id === task.id ? { ...t, ...data } : t
      );

      await db.goals.update(goalId, { 
        tasks: updatedTasks,
        progress: calculateProgress(updatedTasks)
      });

      onOpenChange(false);
      form.reset();
      
      toast({
        title: "Success",
        description: "Task updated successfully.",
      });
    } catch (error) {
      console.error('Failed to update task:', error);
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFields form={form} maxDueDate={goalDueDate} />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}