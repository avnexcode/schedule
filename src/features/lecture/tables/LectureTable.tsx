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
import { DeleteLectureDialog } from "../components/action";
import { LectureTableBodySkeleton } from "../components/skeleton";
import type { LectureData } from "../types";

type LectureTableProps = {
  lectures?: LectureData[];
  isLecturesLoading: boolean;
};

export const LectureTable = ({
  lectures,
  isLecturesLoading,
}: LectureTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[150px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      {isLecturesLoading && <LectureTableBodySkeleton />}
      <TableBody>
        {renderElements({
          of: lectures,
          keyExtractor: (lecture) => lecture.id,
          render: (lecture, index) => (
            <TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="capitalize">{lecture.name}</TableCell>
              <TableCell className="space-x-2">
                <Link href={`/dashboard/lecture/${lecture.id}/edit`}>
                  <Button size={"sm"} variant={"outline"}>
                    <SquarePen />
                  </Button>
                </Link>
                <DeleteLectureDialog lectureId={lecture.id} />
              </TableCell>
            </TableRow>
          ),
          isLoading: isLecturesLoading,
          fallback: (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                There is no lectures data
              </TableCell>
            </TableRow>
          ),
        })}
      </TableBody>
    </Table>
  );
};
