import { TRPCError } from "@trpc/server";
import { majorRepository } from "./major.repository";
import type { CreateMajorRequest, UpdateMajorRequest } from "@/server/models";
import type { QueryParams } from "@/server/types/api";

export const majorService = {
  getAll: async (params: QueryParams) => {
    const majors = await majorRepository.findAll(params);

    return majors;
  },

  getById: async (id: string) => {
    const major = await majorRepository.findUniqueId(id);

    if (!major) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Major with ID : ${id} not found`,
      });
    }

    return major;
  },

  create: async (request: CreateMajorRequest) => {
    const majorExistsByName = await majorRepository.countUniqueName(
      request.name,
    );

    if (majorExistsByName !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: `Major already exists`,
      });
    }

    const majorExistsByAlias = await majorRepository.countUniqueAlias(
      request.alias,
    );

    if (majorExistsByAlias !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: `Major alias already used`,
      });
    }

    const major = await majorRepository.insert(request);

    return major;
  },

  update: async (id: string, request: UpdateMajorRequest) => {
    const majorExists = await majorRepository.countUniqueId(id);

    if (majorExists === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Major with ID : ${id} not found`,
      });
    }

    const currentMajorByName = await majorRepository.findUniqueName(
      request.name!,
    );

    if (currentMajorByName && currentMajorByName.id !== id) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Major already exists",
      });
    }

    const currentMajorByAlias = await majorRepository.findUniqueAlias(
      request.alias!,
    );

    if (currentMajorByAlias && currentMajorByAlias.id !== id) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Major alias already used",
      });
    }

    const major = await majorRepository.update(id, request);

    return major;
  },

  delete: async (id: string) => {
    const majorExists = await majorRepository.countUniqueId(id);

    if (majorExists === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Major with ID : ${id} not found`,
      });
    }

    const major = await majorRepository.delete(id);

    return major;
  },
};
