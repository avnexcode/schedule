import { Gender } from "@prisma/client";
import { z } from "zod";

const gender = Object.values(Gender) as [Gender, ...Gender[]];

export const createLectureFormSchema = z.object({
  name: z.string().trim().min(1).max(150),
  gender: z.enum(gender),
  majorId: z.string().min(1),
});

export const updateLectureFormSchema = createLectureFormSchema;
