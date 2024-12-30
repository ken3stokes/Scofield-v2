"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { projectSchema, type ProjectFormData } from './schema';
import { FormFields } from './form-fields';
import { PlusCircle } from 'lucide-react';
import { useDatabase } from '@/hooks/use-database';

export function ProjectForm() {
  const [open, setOpen] = useState(false);
  const { data: goals = [] } = useDatabase('goals');
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'active',
      goals: [],
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    await db.projects.add({
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFields form={form} goals={goals} />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}