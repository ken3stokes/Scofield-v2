"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTaskSchema, type TaskFormData } from './schema';
import { FormFields } from './form-fields';
import { useTasks } from '@/hooks/use-tasks';
import { getMaxTaskDueDate } from '@/lib/validators';

interface TaskFormProps {
  goalId: string;
  goalDueDate: Date;
}

export function TaskForm({ goalId, goalDueDate }: TaskFormProps) {
  const [open, setOpen] = useState(false);
  const { createTask, isLoading } = useTasks(goalId);
  
  const form = useForm<TaskFormData>({
    resolver: zodResolver(createTaskSchema(goalDueDate)),
    defaultValues: {
      title: '',
      status: 'pending',
      priority: 'medium',
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    await createTask(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFields 
              form={form} 
              maxDueDate={getMaxTaskDueDate(goalDueDate) || new Date(goalDueDate)}
            />
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Task"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}