import { type Prisma } from "@prisma/client";
import { type z } from "zod";
import type {
  createLectureFormSchema,
  updateLectureFormSchema,
} from "../schemas";

export type CreateLectureFormSchema = z.infer<typeof createLectureFormSchema>;
export type UpdateLectureFormSchema = z.infer<typeof updateLectureFormSchema>;

export type LectureData = Prisma.LectureGetPayload<{
  select: {
    id: true;
    name: true;
    gender: true;
    major: {
      select: {
        id: true;
        name: true;
        alias: true;
      };
    };
  };
}>;
