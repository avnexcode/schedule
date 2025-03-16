import { Gender } from "@prisma/client";
import { z } from "zod";

const gender = Object.values(Gender) as [Gender, ...Gender[]];

export const createLectureRequest = z.object({
  name: z.string().trim().min(1).max(150),
  gender: z.enum(gender),
  major_id: z.string().min(1),
});

export const updateLectureRequest = createLectureRequest.partial();
