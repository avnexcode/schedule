import { type z } from "zod";
import type {
  createSpecializationFormSchema,
  updateSpecializationFormSchema,
} from "../schemas";
import { type Prisma } from "@prisma/client";

export type CreateSpecializationFormSchema = z.infer<
  typeof createSpecializationFormSchema
>;
export type UpdateSpecializationFormSchema = z.infer<
  typeof updateSpecializationFormSchema
>;

export type SpecializationData = Prisma.SpecializationGetPayload<{
  select: {
    id: true;
    name: true;
    major: {
      select: {
        name: true;
      };
    };
  };
}>;
