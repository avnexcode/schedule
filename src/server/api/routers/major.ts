import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { errorFilter } from "@/server/filters";
import { majorService } from "@/server/features/major";
import {
  createMajorRequest,
  queryParams,
  updateMajorRequest,
} from "@/server/validations";

export const majorRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const majors = await majorService.getAll(params);
        return majors;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const major = await majorService.getById(id);
        return major;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: publicProcedure
    .input(z.object({ request: createMajorRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        const major = await majorService.create(request);
        return major;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: publicProcedure
    .input(z.object({ id: z.string(), request: updateMajorRequest }))
    .mutation(async ({ input }) => {
      const { id, request } = input;
      try {
        const major = await majorService.update(id, request);
        return major;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const major = await majorService.delete(id);
        return major;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
