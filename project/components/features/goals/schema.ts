import * as z from 'zod';

export const goalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  specific: z.string().min(1, 'Specific goal description is required'),
  measurable: z.string().min(1, 'Measurable criteria are required'),
  achievable: z.string().min(1, 'Achievable steps are required'),
  relevant: z.string().min(1, 'Relevance explanation is required'),
  timebound: z.date({
    required_error: "Due date is required",
  }),
  priority: z.enum(['urgent', 'high', 'medium', 'low'], {
    required_error: "Priority is required",
  }),
  category: z.enum(['career', 'education', 'health', 'financial', 'business', 'hobbies', 'security'], {
    required_error: "Category is required",
  }),
});

export type GoalFormData = z.infer<typeof goalSchema>;