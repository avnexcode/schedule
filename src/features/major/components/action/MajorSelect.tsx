import { SelectPagination } from "@/components/elements/SelectPagination";
import { SelectSearch } from "@/components/elements/SelectSearch";
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
import { useSelectParams } from "@/hooks";
import { api } from "@/utils/api";
import { renderElements } from "@/utils/render-elements";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type MajorSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
};

export const MajorSelect = <T extends FieldValues>({
  name,
  label,
  required = false,
}: MajorSelectProps<T>) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);
  const [selectedMajorLoaded, setSelectedMajorLoaded] =
    useState<boolean>(false);

  const ITEMS_PER_PAGE = 15;

  const {
    page,
    totalPages,
    searchTerm,
    debouncedSearchTerm,
    handlePageChange,
    handleSearchChange,
    handleSearchInputClick,
  } = useSelectParams({
    totalData: totalData,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const form = useFormContext<T>();
  const selectedMajorId = form.watch(name);

  const { data: selectedMajor, isLoading: isSelectedMajorLoading } =
    api.major.getById.useQuery(
      { id: selectedMajorId },
      {
        enabled: !!selectedMajorId,
        staleTime: Infinity,
      },
    );

  useEffect(() => {
    if (selectedMajor && !isSelectedMajorLoading) {
      setSelectedMajorLoaded(true);
    }
  }, [selectedMajor, isSelectedMajorLoading]);

  const { data: majors, isLoading: isMajorsLoading } =
    api.major.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: "name",
        order: "asc",
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    if (form.control && majors && !isMajorsLoading) {
      setIsReady(true);
      setTotalData(majors.meta.total);
    }
  }, [
    form.control,
    majors,
    isMajorsLoading,
    selectedMajorId,
    selectedMajorLoaded,
  ]);

  const allMajors = majors?.data ?? [];
  const combinedMajors = [...allMajors];

  if (
    selectedMajor &&
    !allMajors.some((major) => major.id === selectedMajor.id)
  ) {
    combinedMajors.unshift(selectedMajor);
  }

  if (!isReady || !selectedMajorLoaded) {
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
            onOpenChange={setIsOpen}
            open={isOpen}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`}>
                  {selectedMajor?.name ?? `Select ${label.toLowerCase()}`}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectSearch
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClick={handleSearchInputClick}
              />

              {isMajorsLoading || isSelectedMajorLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <>
                  {renderElements({
                    of: combinedMajors,
                    keyExtractor: (major) => major.id,
                    render: (major) => (
                      <SelectItem
                        key={major.id}
                        value={major.id}
                        className="capitalize"
                      >
                        {major.name}
                      </SelectItem>
                    ),
                    fallback: (
                      <SelectItem value="none" disabled>
                        There is no majors data
                      </SelectItem>
                    ),
                  })}

                  <SelectPagination
                    currentPage={page}
                    totalPages={totalPages}
                    isLoading={isMajorsLoading}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
