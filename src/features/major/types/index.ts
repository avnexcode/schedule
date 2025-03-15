import type { z } from "zod";
import type { createMajorFormSchema, updateMajorFormSchema } from "../schemas";
import { type Prisma } from "@prisma/client";

export type CreateMajorFormSchema = z.infer<typeof createMajorFormSchema>;
export type UpdateMajorFormSchema = z.infer<typeof updateMajorFormSchema>;

export type MajorData = Prisma.MajorGetPayload<{
  select: {
    id: true;
    name: true;
    alias: true;
  };
}>;
