import { db } from "@/server/db/prisma";
import type {
  CreateLectureRequest,
  UpdateLectureRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export const lectureRepository = {
  findAll: async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;

    const skip = (page - 1) * limit;

    const totalCount = await db.lecture.count({
      ...(search && {
        where: {
          OR: [{ name: { contains: search, mode: "insensitive" } }],
        },
      }),
    });

    const lectures = await db.lecture.findMany({
      take: limit,
      skip,
      ...(search && {
        where: {
          OR: [{ name: { contains: search, mode: "insensitive" } }],
        },
      }),
      orderBy: {
        [sort]: order,
      },
      select: {
        id: true,
        name: true,
        gender: true,
        major: {
          select: {
            id: true,
            name: true,
            alias: true,
          },
        },
      },
    });

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: lectures,
      meta: {
        total: totalCount,
        limit,
        page,
        last_page: lastPage,
      },
    };
  },

  findUniqueId: async (id: string) => {
    const lecture = await db.lecture.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        gender: true,
        major: {
          select: {
            id: true,
            name: true,
            alias: true,
          },
        },
      },
    });

    return lecture;
  },

  countUniqueId: async (id: string) => {
    const lecturesLength = await db.lecture.count({ where: { id } });

    return lecturesLength;
  },

  insert: async (request: CreateLectureRequest) => {
    const lecture = await db.lecture.create({
      data: request,
      select: {
        id: true,
        name: true,
        gender: true,
        createdAt: true,
      },
    });

    return lecture;
  },

  update: async (id: string, request: UpdateLectureRequest) => {
    const lecture = await db.lecture.update({
      where: { id },
      data: request,
      select: {
        id: true,
        name: true,
        gender: true,
        updatedAt: true,
      },
    });

    return lecture;
  },

  delete: async (id: string) => {
    const lecture = await db.lecture.delete({
      where: { id },
      select: {
        id: true,
      },
    });

    return lecture;
  },
};
