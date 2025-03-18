import { db } from "@/server/db/prisma";
import type { CreateMajorRequest, UpdateMajorRequest } from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export const majorRepository = {
  findAll: async (params: QueryParams) => {
    const { page, limit, search, sort, order } = params;

    const skip = (page - 1) * limit;

    const totalCount = await db.major.count({
      ...(search && {
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { alias: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
    });

    const majors = await db.major.findMany({
      take: limit,
      skip,
      ...(search && {
        where: {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { alias: { contains: search, mode: "insensitive" } },
          ],
        },
      }),
      orderBy: {
        [sort]: order,
      },
      select: {
        id: true,
        name: true,
        alias: true,
      },
    });

    const lastPage = Math.ceil(totalCount / limit);

    return {
      data: majors,
      meta: {
        total: totalCount,
        limit,
        page,
        last_page: lastPage,
      },
    };
  },

  findUniqueId: async (id: string) => {
    const major = await db.major.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        alias: true,
      },
    });

    return major;
  },

  findUniqueName: async (name: string) => {
    const major = await db.major.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        alias: true,
      },
    });

    return major;
  },

  findUniqueAlias: async (alias: string) => {
    const major = await db.major.findUnique({
      where: { alias },
      select: {
        id: true,
        name: true,
        alias: true,
      },
    });

    return major;
  },

  countUniqueId: async (id: string) => {
    const majorsLength = await db.major.count({ where: { id } });

    return majorsLength;
  },

  countUniqueName: async (name: string) => {
    const majorsLength = await db.major.count({ where: { name } });

    return majorsLength;
  },

  countUniqueAlias: async (alias: string) => {
    const majorsLength = await db.major.count({ where: { alias } });

    return majorsLength;
  },

  insert: async (request: CreateMajorRequest) => {
    const major = await db.major.create({
      data: request,
      select: {
        id: true,
        name: true,
        alias: true,
        createdAt: true,
      },
    });

    return major;
  },

  update: async (id: string, request: UpdateMajorRequest) => {
    const major = await db.major.update({
      where: { id },
      data: request,
      select: {
        id: true,
        name: true,
        alias: true,
        updatedAt: true,
      },
    });

    return major;
  },

  delete: async (id: string) => {
    const major = await db.major.delete({
      where: { id },
      select: {
        id: true,
      },
    });

    return major;
  },
};
