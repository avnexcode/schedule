import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api";
import { renderElements } from "@/utils/render-elements";
import { useEffect, useState } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type SpecializationSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
};

export const SpecializationSelect = <T extends FieldValues>({
  name,
  label,
  required = false,
}: SpecializationSelectProps<T>) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const form = useFormContext<T>();

  const { data: specializations, isLoading: isSpecializationsLoading } =
    api.specialization.getAll.useQuery({ params: {} });

  useEffect(() => {
    if (form.control && specializations && !isSpecializationsLoading) {
      setIsReady(true);
    }
  }, [form.control, specializations, isSpecializationsLoading]);

  if (!isReady) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormLabel className="capitalize">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select
            onValueChange={onChange}
            value={value ?? ""}
            defaultValue={value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {renderElements({
                of: specializations?.data,
                keyExtractor: (specialization) => specialization.id,
                render: (specialization) => (
                  <SelectItem
                    key={specialization.id}
                    value={specialization.id}
                    className="capitalize"
                  >
                    {specialization.name}
                  </SelectItem>
                ),
                fallback: (
                  <SelectItem value={"none"}>
                    There is no specialization data
                  </SelectItem>
                ),
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
