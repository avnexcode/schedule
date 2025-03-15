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

export const SpecializationTableCellSkeleton = () => {
  return <Skeleton className="h-3 w-full" />;
};

export const SpecializationTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <SpecializationTableCellSkeleton />
          </TableHead>
          <TableHead>
            <SpecializationTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[300px]">
            <SpecializationTableCellSkeleton />
          </TableHead>
          <TableHead className="w-[150px]">
            <SpecializationTableCellSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <SpecializationTableBodySkeleton />
    </Table>
  );
};

export const SpecializationTableBodySkeleton = () => {
  return (
    <TableBody>
      {renderElements({
        of: [...new Array<undefined>(10)],
        keyExtractor: (_, index) => index,
        render: () => (
          <TableRow>
            <TableCell>
              <SpecializationTableCellSkeleton />
            </TableCell>
            <TableCell>
              <SpecializationTableCellSkeleton />
            </TableCell>
            <TableCell>
              <SpecializationTableCellSkeleton />
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
