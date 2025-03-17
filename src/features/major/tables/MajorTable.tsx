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
import { DeleteMajorDialog } from "../components/action";
import { MajorTableBodySkeleton } from "../components/skeleton";
import type { MajorData } from "../types";

type MajorTableProps = {
  majors?: MajorData[];
  isMajorsLoading: boolean;
};

export const MajorTable = ({ majors, isMajorsLoading }: MajorTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[150px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      {isMajorsLoading && <MajorTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: majors,
          keyExtractor: (major) => major.id,
          render: (major, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">
                {major.name}{" "}
                <span className="font-bold uppercase">({major.alias})</span>
              </TableCell>
              <TableCell className="space-x-2">
                <Link href={`/dashboard/major/${major.id}/edit`}>
                  <Button size={"sm"} variant={"outline"}>
                    <SquarePen />
                  </Button>
                </Link>
                <DeleteMajorDialog majorId={major.id} />
              </TableCell>
            </TableRow>
          ),
          isLoading: isMajorsLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                There is no majors data
              </TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
