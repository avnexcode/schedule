import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SpecializationLimitProps {
  currentLimit: number;
  onLimitChange: (limit: number) => void;
}

export const SpecializationLimit = ({
  currentLimit,
  onLimitChange,
}: SpecializationLimitProps) => {
  return (
    <Select
      value={currentLimit.toString()}
      onValueChange={(value) => onLimitChange(Number(value))}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Specializations per page" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="15">Limit 15</SelectItem>
        <SelectItem value="30">Limit 30</SelectItem>
        <SelectItem value="50">Limit 50</SelectItem>
      </SelectContent>
    </Select>
  );
};
