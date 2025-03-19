import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderElements } from "@/utils";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { DeleteSpecializationDialog } from "../components/action";
import { SpecializationTableBodySkeleton } from "../components/skeleton";
import type { SpecializationData } from "../types";

type SpecializationTableProps = {
  specializations?: SpecializationData[];
  isSpecializationsLoading: boolean;
};

export const SpecializationTable = ({
  specializations,
  isSpecializationsLoading,
}: SpecializationTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[300px]">Major</TableHead>
          <TableHead className="w-[150px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      {isSpecializationsLoading && <SpecializationTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: specializations,
          keyExtractor: (specialization) => specialization.id,
          render: (specialization, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">
                {specialization.name}{" "}
                <span className="font-bold uppercase">
                  ({specialization.alias})
                </span>
              </TableCell>
              <TableCell className="capitalize">
                {specialization.major.name}
              </TableCell>
              <TableCell className="space-x-2 text-nowrap">
                <Link
                  href={`/dashboard/specialization/${specialization.id}/edit`}
                >
                  <Button size={"sm"} variant={"outline"}>
                    <SquarePen />
                  </Button>
                </Link>
                <DeleteSpecializationDialog
                  specializationId={specialization.id}
                />
              </TableCell>
            </TableRow>
          ),
          isLoading: isSpecializationsLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                There is no specializations data
              </TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
