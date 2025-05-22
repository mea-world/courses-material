import axiosInstance from '../lib/axiosInstance';
import type { Task } from '../types/types'; 
import { TaskSchema } from '../types/types';
import { z } from 'zod';

const TasksResponseSchema = z.object({
    data: z.array(TaskSchema)
});

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get('/tasks?populate=*'); // Assuming Strapi populates relations with `populate=*`
    const parsedResponse = TasksResponseSchema.parse(response.data);
    
    return parsedResponse.data;

  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    // It's good practice to throw a more specific error or handle it based on application needs
    if (error instanceof z.ZodError) {
        console.error('Zod validation error:', error.errors);
    }
    throw new Error('Failed to fetch tasks');
  }
};

// Add more API functions here (create, update, delete) as needed 