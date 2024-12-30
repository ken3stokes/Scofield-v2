import * as z from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['active', 'completed'], {
    required_error: "Status is required",
  }),
  dueDate: z.date({
    required_error: "Due date is required",
  }),
  goals: z.array(z.string()).default([]),
});

export type ProjectFormData = z.infer<typeof projectSchema>;