import axiosInstance from "../lib/axiosInstance";
import { z } from "zod";

export const WorkerSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
});
export type Worker = z.infer<typeof WorkerSchema> & { documentId: string };

const WorkerListSchema = z.object({
  data: z.array(WorkerSchema.extend({ documentId: z.string() })),
});
const WorkerResponseSchema = z.object({
  data: WorkerSchema.extend({ documentId: z.string() }),
});

export const getWorkers = async (): Promise<Worker[]> => {
  try {
    const response = await axiosInstance.get("/workers");
    const parsed = WorkerListSchema.parse(response.data);
    return parsed.data;
  } catch (error) {
    console.error("Errore durante il recupero dei lavoratori:", error);
    throw error;
  }
};

export const createWorker = async (data: Partial<Worker>): Promise<Worker> => {
  try {
    const response = await axiosInstance.post("/workers", { data });
    const parsed = WorkerResponseSchema.parse(response.data);
    return parsed.data;
  } catch (error) {
    console.error("Errore durante la creazione del lavoratore:", error);
    throw error;
  }
};

export const deleteWorker = async (id: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/workers/${id}`);
    return true;
  } catch (error) {
    console.error("Errore durante l'eliminazione del lavoratore:", error);
    throw error;
  }
};

export const updateWorker = async (
  id: string,
  data: Partial<Worker>
): Promise<Worker> => {
  try {
    const response = await axiosInstance.put(`/workers/${id}`, { data });
    const parsed = WorkerResponseSchema.parse(response.data);
    return parsed.data;
  } catch (error) {
    console.error("Errore durante l'aggiornamento del lavoratore:", error);
    throw error;
  }
};
