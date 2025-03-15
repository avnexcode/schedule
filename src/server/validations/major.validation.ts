import { z } from "zod";

export const createMajorRequest = z.object({
  name: z.string().trim().min(1).max(50).toLowerCase(),
});

export const updateMajorRequest = createMajorRequest.partial();
