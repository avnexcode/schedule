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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalData, setTotalData] = useState<number>(0);
  const [selectedLectureLoaded, setSelectedLectureLoaded] =
    useState<boolean>(false);

  const ITEMS_PER_PAGE = 15;

  const form = useFormContext<T>();
  const selectedLectureId = form.watch(name);

  const { data: selectedLecture, isLoading: isSelectedLectureLoading } =
    api.lecture.getById.useQuery(
      { id: selectedLectureId },
      {
        enabled: !!selectedLectureId,
        staleTime: Infinity,
      },
    );

  useEffect(() => {
    if (selectedLecture && !isSelectedLectureLoading) {
      setSelectedLectureLoaded(true);
    }
  }, [selectedLecture, isSelectedLectureLoading]);

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

  const { data: lectures, isLoading: isLecturesLoading } =
    api.lecture.getAll.useQuery({
      params: {
        limit: ITEMS_PER_PAGE,
        sort: "name",
        order: "asc",
        page,
        search: debouncedSearchTerm || undefined,
      },
    });

  useEffect(() => {
    if (form.control && lectures && !isLecturesLoading) {
      setIsReady(true);
      setTotalData(lectures.meta.total);
    }
  }, [
    form.control,
    lectures,
    isLecturesLoading,
    selectedLectureId,
    selectedLectureLoaded,
  ]);

  const allLectures = lectures?.data ?? [];
  const combinedLectures = [...allLectures];

  if (
    selectedLecture &&
    !allLectures.some((lecture) => lecture.id === selectedLecture.id)
  ) {
    combinedLectures.unshift(selectedLecture);
  }

  if (!isReady || !selectedLectureLoaded) {
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
                  {selectedLecture?.name ?? `Select ${label.toLowerCase()}`}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectSearch
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClick={handleSearchInputClick}
              />

              {isLecturesLoading || isSelectedLectureLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                <>
                  {renderElements({
                    of: combinedLectures,
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
                      <SelectItem value="none" disabled>
                        There is no lectures data
                      </SelectItem>
                    ),
                  })}

                  <SelectPagination
                    currentPage={page}
                    totalPages={totalPages}
                    isLoading={isLecturesLoading}
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
