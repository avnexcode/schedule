import { lectureService } from "@/server/features/lecture";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  createLectureRequest,
  queryParams,
  updateLectureRequest,
} from "@/server/validations";
import { errorFilter } from "@/server/filters";

export const lectureRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        params: queryParams,
      }),
    )
    .query(async ({ input }) => {
      const { params } = input;
      try {
        const lectures = await lectureService.getAll(params);
        return lectures;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const lecture = await lectureService.getById(id);
        return lecture;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  create: publicProcedure
    .input(z.object({ request: createLectureRequest }))
    .mutation(async ({ input }) => {
      const { request } = input;
      try {
        const lecture = await lectureService.create(request);
        return lecture;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  update: publicProcedure
    .input(z.object({ id: z.string(), request: updateLectureRequest }))
    .mutation(async ({ input }) => {
      const { id, request } = input;
      try {
        const lecture = await lectureService.update(id, request);
        return lecture;
      } catch (error) {
        return errorFilter(error);
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input;
      try {
        const lecture = await lectureService.delete(id);
        return lecture;
      } catch (error) {
        return errorFilter(error);
      }
    }),
});
