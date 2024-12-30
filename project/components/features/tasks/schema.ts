"use client";

import * as z from 'zod';
import { validateTaskDueDate } from '@/lib/validators';

export const createTaskSchema = (goalDueDate: Date) => z.object({
  title: z.string().min(1, 'Title is required'),
  status: z.enum(['pending', 'in-progress', 'completed'], {
    required_error: "Status is required",
  }).default('pending'),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: "Priority is required",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  }).refine(
    (date) => validateTaskDueDate(date, goalDueDate),
    "Task due date cannot be later than the goal due date"
  ),
});

export type TaskFormData = z.infer<ReturnType<typeof createTaskSchema>>;