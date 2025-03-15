import { z } from "zod";

export const createMajorFormSchema = z.object({
  name: z.string().trim().min(1).max(50).toLowerCase(),
});

export const updateMajorFormSchema = createMajorFormSchema;
