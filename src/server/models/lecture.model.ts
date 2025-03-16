import { type z } from "zod";
import type {
  createLectureRequest,
  updateLectureRequest,
} from "../validations";

export type CreateLectureRequest = z.infer<typeof createLectureRequest>;
export type UpdateLectureRequest = z.infer<typeof updateLectureRequest>;
