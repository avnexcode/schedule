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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);
  const [selectedSpecializationLoaded, setSelectedSpecializationLoaded] =
    useState<boolean>(false);

  const ITEMS_PER_PAGE = 15;

  const form = useFormContext<T>();
  const selectedSpecializationId = form.watch(name);

  const {
    data: selectedSpecialization,
    isLoading: isSelectedSpecializationLoading,
  } = api.specialization.getById.useQuery(
    { id: selectedSpecializationId },
    {
      enabled: !!selectedSpecializationId,
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (selectedSpecialization && !isSelectedSpecializationLoading) {
      setSelectedSpecializationLoaded(true);
    }
  }, [selectedSpecialization, isSelectedSpecializationLoading]);

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

  const { data: specializations, isLoading: isSpecializationsLoading } =
    api.specialization.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: "name",
        order: "asc",
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    const isSelectedIdReady = selectedSpecializationId
      ? selectedSpecializationLoaded
      : true;
    if (
      form.control &&
      specializations &&
      !isSpecializationsLoading &&
      isSelectedIdReady
    ) {
      setIsReady(true);
      setTotalData(specializations.meta.total);
    }
  }, [
    form.control,
    specializations,
    isSpecializationsLoading,
    selectedSpecializationId,
    selectedSpecializationLoaded,
  ]);

  const allSpecializations = specializations?.data ?? [];
  const combinedSpecializations = [...allSpecializations];

  if (
    selectedSpecialization &&
    !allSpecializations.some(
      (specialization) => specialization.id === selectedSpecialization.id,
    )
  ) {
    combinedSpecializations.unshift(selectedSpecialization);
  }

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
            onOpenChange={setIsOpen}
            open={isOpen}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`}>
                  {selectedSpecialization?.name ??
                    `Select ${label.toLowerCase()}`}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectSearch
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClick={handleSearchInputClick}
              />

              {isSpecializationsLoading || isSelectedSpecializationLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <>
                  {renderElements({
                    of: combinedSpecializations,
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
                      <SelectItem value="none" disabled>
                        There is no specializations data
                      </SelectItem>
                    ),
                  })}

                  <SelectPagination
                    currentPage={page}
                    totalPages={totalPages}
                    isLoading={isSpecializationsLoading}
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
