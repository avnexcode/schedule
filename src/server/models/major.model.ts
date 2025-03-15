import type { z } from "zod";
import type {
  createMajorRequest,
  updateMajorRequest,
} from "../validations/major.validation";

export type CreateMajorRequest = z.infer<typeof createMajorRequest>;
export type UpdateMajorRequest = z.infer<typeof updateMajorRequest>;
