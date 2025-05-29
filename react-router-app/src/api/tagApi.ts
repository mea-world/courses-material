import axiosInstance from "../lib/axiosInstance";
import { z } from "zod";

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Tag = z.infer<typeof TagSchema> & { documentId: string };

const TagListSchema = z.object({
  data: z.array(TagSchema.extend({ documentId: z.string() })),
});
const TagResponseSchema = z.object({
  data: TagSchema.extend({ documentId: z.string() }),
});

export const getTags = async (): Promise<Tag[]> => {
  const response = await axiosInstance.get("/tags");
  const parsed = TagListSchema.parse(response.data);
  return parsed.data;
};

export const createTag = async (data: Partial<Tag>): Promise<Tag> => {
  const response = await axiosInstance.post("/tags", { data });
  const parsed = TagResponseSchema.parse(response.data);
  return parsed.data;
};
