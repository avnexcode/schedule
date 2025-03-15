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

export const MajorTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const MajorTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <MajorTableCellSkeleton />
          </TableHead>
          <TableHead>
            <MajorTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[150px]">
            <MajorTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <MajorTableBodySkeleton />
    </Table>
  );
};

export const MajorTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => (
          <TableRow>
            <TableCell>
              <MajorTableCellSkeleton />
            </TableCell>
            <TableCell>
              <MajorTableCellSkeleton />
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
