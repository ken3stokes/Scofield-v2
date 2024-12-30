"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { goalSchema, type GoalFormData } from './schema';
import { FormFields } from './form-fields';
import { addMonths } from 'date-fns';

interface GoalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GoalForm({ open, onOpenChange }: GoalFormProps) {
  const defaultDate = addMonths(new Date(), 1);
  
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
      timebound: defaultDate,
    },
  });

  const onSubmit = async (data: GoalFormData) => {
    try {
      await db.goals.add({
        id: uuidv4(),
        ...data,
        status: 'not-started',
        progress: 0,
        tasks: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      onOpenChange(false);
      form.reset({
        title: '',
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        priority: 'medium',
        category: 'career',
        timebound: defaultDate,
      });
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
        aria-describedby="goal-form-description"
      >
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
          <DialogDescription id="goal-form-description">
            Create a new SMART goal. Fill out all the required fields below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFields form={form} />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Goal</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}