import type {
  CreateSpecializationRequest,
  UpdateSpecializationRequest,
} from "@/server/models";
import type { QueryParams } from "@/server/types/api";
import { TRPCError } from "@trpc/server";
import { specializationRepository } from "./specialization.repository";

export const specializationService = {
  getAll: async (params: QueryParams) => {
    const specializations = await specializationRepository.findAll(params);

    return specializations;
  },

  getById: async (id: string) => {
    const specialization = await specializationRepository.findUniqueId(id);

    if (!specialization) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Specialization with ID : ${id} not found`,
      });
    }

    return specialization;
  },

  create: async (request: CreateSpecializationRequest) => {
    const specializationExists = await specializationRepository.countUniqueName(
      request.name,
    );

    if (specializationExists !== 0) {
      throw new TRPCError({
        code: "CONFLICT",
        message: `Specialization already exists`,
      });
    }

    const specialization = await specializationRepository.insert(request);

    return specialization;
  },

  update: async (id: string, request: UpdateSpecializationRequest) => {
    const specializationExists =
      await specializationRepository.countUniqueId(id);

    if (specializationExists === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Specialization with ID : ${id} not found`,
      });
    }

    const currentSpecialization = await specializationRepository.findUniqueName(
      request.name!,
    );

    if (currentSpecialization && currentSpecialization.id !== id) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Specialization already exists",
      });
    }

    const specialization = await specializationRepository.update(id, request);

    return specialization;
  },

  delete: async (id: string) => {
    const specializationExists =
      await specializationRepository.countUniqueId(id);

    if (specializationExists === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Specialization with ID : ${id} not found`,
      });
    }

    const specialization = await specializationRepository.delete(id);

    return specialization;
  },
};
