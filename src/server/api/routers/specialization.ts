import { specializationService } from "@/server/features/specialization";
import { errorFilter } from "@/server/filters";
import {
  createSpecializationRequest,
  queryParams,
  updateSpecializationRequest,
} from "@/server/validations";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const specializationRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const specializations = await specializationService.getAll(params);
        return specializations;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const specialization = await specializationService.getById(id);
        return specialization;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: publicProcedure
    .input(z.object({ request: createSpecializationRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        const specialization = await specializationService.create(request);
        return specialization;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: publicProcedure
    .input(z.object({ id: z.string(), request: updateSpecializationRequest }))
    .mutation(async ({ input }) => {
      const { id, request } = input;
      try {
        const specialization = await specializationService.update(id, request);
        return specialization;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const specialization = await specializationService.delete(id);
        return specialization;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
