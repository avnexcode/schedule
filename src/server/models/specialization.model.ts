import { type z } from "zod";
import type {
  createSpecializationRequest,
  updateSpecializationRequest,
} from "../validations";

export type CreateSpecializationRequest = z.infer<
  typeof createSpecializationRequest
>;
export type UpdateSpecializationRequest = z.infer<
  typeof updateSpecializationRequest
>;
