import { z } from 'zod';

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Tag = z.infer<typeof TagSchema>;

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

export const WorkerSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
});
export type Worker = z.infer<typeof WorkerSchema>;

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  due_date: z.string().datetime().optional().nullable(),
  completed: z.boolean().default(false),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  categories: z.array(CategorySchema).optional(),
  tags: z.array(TagSchema).optional(),
  worker: WorkerSchema.optional().nullable(),
});
export type Task = z.infer<typeof TaskSchema>;

// Schema for creating/updating tasks (omits id, and makes relations optional IDs)
export const TaskFormSchema = TaskSchema.omit({ id: true }).extend({
  categories: z.array(z.number()).optional(),
  tags: z.array(z.number()).optional(),
  worker: z.number().optional().nullable(),
});
export type TaskFormData = z.infer<typeof TaskFormSchema>; 