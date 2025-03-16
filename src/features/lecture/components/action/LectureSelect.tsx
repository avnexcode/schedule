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

type LectureSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
};

export const LectureSelect = <T extends FieldValues>({
  name,
  label,
  required = false,
}: LectureSelectProps<T>) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const form = useFormContext<T>();

  const { data: lectures, isLoading: isLecturesLoading } =
    api.lecture.getAll.useQuery({ params: {} });

  useEffect(() => {
    if (form.control && lectures && !isLecturesLoading) {
      setIsReady(true);
    }
  }, [form.control, lectures, isLecturesLoading]);

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
                of: lectures?.data,
                keyExtractor: (lecture) => lecture.id,
                render: (lecture) => (
                  <SelectItem
                    key={lecture.id}
                    value={lecture.id}
                    className="capitalize"
                  >
                    {lecture.name}
                  </SelectItem>
                ),
                fallback: (
                  <SelectItem value={"none"}>
                    There is no lecture data
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
