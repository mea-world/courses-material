import axiosInstance from "../lib/axiosInstance";
import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Category = z.infer<typeof CategorySchema> & { documentId: string };

const CategoryListSchema = z.object({
  data: z.array(CategorySchema.extend({ documentId: z.string() })),
});
const CategoryResponseSchema = z.object({
  data: CategorySchema.extend({ documentId: z.string() }),
});

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get("/categories");
  const parsed = CategoryListSchema.parse(response.data);
  return parsed.data;
};

export const createCategory = async (
  data: Partial<Category>
): Promise<Category> => {
  const response = await axiosInstance.post("/categories", { data });
  const parsed = CategoryResponseSchema.parse(response.data);
  return parsed.data;
};
