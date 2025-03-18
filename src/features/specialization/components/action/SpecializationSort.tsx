import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SpecializationSortParams = "name" | "createdAt";
export type SpecializationOrderParams = "asc" | "desc";

type SpecializationSortProps = {
  currentSort?: string;
  currentOrder?: string;
  onSortChange: (sort: SpecializationSortParams) => void;
  onOrderChange: (order: SpecializationOrderParams) => void;
};

export const SpecializationSort = ({
  currentSort = "createdAt",
  currentOrder = "desc",
  onSortChange,
  onOrderChange,
}: SpecializationSortProps) => {
  return (
    <div className="flex gap-2">
      <Select value={currentSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="createdAt">Created At</SelectItem>
        </SelectContent>
      </Select>

      <Select value={currentOrder} onValueChange={onOrderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort Order" />
        </SelectTrigger>
        {currentSort === "name" && <SelectSortText />}
        {currentSort === "createdAt" && <SelectSortDate />}
      </Select>
    </div>
  );
};

export const SelectSortText = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(A - Z)</SelectItem>
      <SelectItem value="desc">(Z - A)</SelectItem>
    </SelectContent>
  );
};

export const SelectSortNumber = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(0 - 9)</SelectItem>
      <SelectItem value="desc">(9 - 0)</SelectItem>
    </SelectContent>
  );
};

export const SelectSortDate = () => {
  return (
    <SelectContent>
      <SelectItem value="asc">(Old - New)</SelectItem>
      <SelectItem value="desc">(New - Old)</SelectItem>
    </SelectContent>
  );
};
