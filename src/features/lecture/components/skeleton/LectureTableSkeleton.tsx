import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderElements } from "@/utils/render-elements";

export const LectureTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const LectureTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <LectureTableCellSkeleton />
          </TableHead>
          <TableHead>
            <LectureTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[150px]">
            <LectureTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <LectureTableBodySkeleton />
    </Table>
  );
};

export const LectureTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => (
          <TableRow>
            <TableCell>
              <LectureTableCellSkeleton />
            </TableCell>
            <TableCell>
              <LectureTableCellSkeleton />
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <Skeleton className="h-8 w-[40px]" />
              <Skeleton className="h-8 w-[40px]" />
            </TableCell>
          </TableRow>
        ),
      })}
    </TableBody>
  );
};
