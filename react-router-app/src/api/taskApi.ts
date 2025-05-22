/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from "../lib/axiosInstance";
import type { Task } from "../types/types";
import { TaskSchema } from "../types/types";
import { z } from "zod";

const TasksResponseSchema = z.object({
  data: z.array(TaskSchema.extend({ documentId: z.string() })),
});

const TaskResponseSchema = z.object({
  data: TaskSchema.extend({ documentId: z.string() }),
});

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axiosInstance.get("/tasks?populate=*");
    const parsed = TasksResponseSchema.parse(response.data);
    return parsed.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error.errors);
    }
    throw new Error("Failed to fetch tasks");
  }
};

export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await axiosInstance.get(`/tasks/${id}?populate=*`);
    const parsed = TaskResponseSchema.parse(response.data);
    return parsed.data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error.errors);
    }
    throw new Error("Failed to fetch task");
  }
};

export const createTask = async (data: Partial<Task>): Promise<Task> => {
  const response = await axiosInstance.post("/tasks", { data });
  const parsed = TaskResponseSchema.parse(response.data);
  return parsed.data;
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, { data });
    const parsed = TaskResponseSchema.parse(response.data);
    return parsed.data;
  } catch (error) {
    throw new Error("Failed to update task");
  }
};

export const assignTaskToWorker = async (
  id: string,
  workerId: number
): Promise<Task> => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, {
      data: {
        worker: {
          connect: [{ id: workerId }],
        },
      },
    });
    const parsed = TaskResponseSchema.parse(response.data);
    return parsed.data;
  } catch (error) {
    console.error("Failed to assign task to worker:", error);
    throw new Error("Failed to assign task to worker");
  }
};

export const unassignTaskFromWorker = async (
  id: string,
  workerId: number
): Promise<Task> => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, {
      data: { worker: { disconnect: [{ id: workerId }] } },
    });
    const parsed = TaskResponseSchema.parse(response.data);
    return parsed.data;
  } catch (error) {
    throw new Error("Failed to unassign task from worker");
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/tasks/${id}`);
    return true;
  } catch (error) {
    throw new Error("Failed to delete task");
  }
};
