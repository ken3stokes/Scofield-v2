"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { db, Goal } from '@/lib/db';
import { goalSchema, type GoalFormData } from './schema';
import { FormFields } from './form-fields';
import { Button } from '@/components/ui/button';

interface EditGoalDialogProps {
  goal: Goal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditGoalDialog({ goal, open, onOpenChange }: EditGoalDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<GoalFormData>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      title: '',
      specific: '',
      measurable: '',
      achievable: '',
      relevant: '',
      priority: 'medium',
      category: 'career',
      timebound: new Date(),
    }
  });

  useEffect(() => {
    if (goal && open) {
      form.reset({
        title: goal.title,
        specific: goal.specific,
        measurable: goal.measurable,
        achievable: goal.achievable,
        relevant: goal.relevant,
        timebound: new Date(goal.timebound),
        priority: goal.priority,
        category: goal.category,
      });
    }
  }, [form, goal, open]);

  const onSubmit = async (data: GoalFormData) => {
    if (!goal) return;
    
    setIsSubmitting(true);
    try {
      await db.goals.update(goal.id, {
        ...data,
        updatedAt: new Date(),
      });
      onOpenChange(false);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!goal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFields form={form} />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}