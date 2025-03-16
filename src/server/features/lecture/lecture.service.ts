import type {
  CreateLectureRequest,
  UpdateLectureRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";
import { TRPCError } from "@trpc/server";
import { lectureRepository } from "./lecture.repository";

export const lectureService = {
  getAll: async (params: QueryParams) => {
    const lectures = await lectureRepository.findAll(params);

    return lectures;
  },

  getById: async (id: string) => {
    const lecture = await lectureRepository.findUniqueId(id);

    if (!lecture) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Lecture with ID : ${id} not found`,
      });
    }

    return lecture;
  },

  create: async (request: CreateLectureRequest) => {
    const lecture = await lectureRepository.insert(request);

    return lecture;
  },

  update: async (id: string, request: UpdateLectureRequest) => {
    const lectureExists = await lectureRepository.countUniqueId(id);

    if (lectureExists === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Lecture with ID : ${id} not found`,
      });
    }

    const lecture = await lectureRepository.update(id, request);

    return lecture;
  },

  delete: async (id: string) => {
    const lectureExists = await lectureRepository.countUniqueId(id);

    if (lectureExists === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Lecture with ID : ${id} not found`,
      });
    }

    const lecture = await lectureRepository.delete(id);

    return lecture;
  },
};
