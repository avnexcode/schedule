import { z } from "zod";

export const createSpecializationRequest = z.object({
  name: z.string().trim().min(1).max(50).toLowerCase(),
  alias: z.string().trim().min(1).max(10).toLowerCase(),
  major_id: z.string().min(1),
});

export const updateSpecializationRequest =
  createSpecializationRequest.partial();
