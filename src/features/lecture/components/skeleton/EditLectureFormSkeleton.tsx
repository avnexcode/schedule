import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const EditLectureFormSkeleton = () => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-5">
        <EditLectureFormInnerSkeleton />
      </CardContent>
      <CardFooter className="mt-5 place-content-end gap-5">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[150px]" />
      </CardFooter>
    </Card>
  );
};

export const EditLectureFormInnerSkeleton = () => {
  return [...new Array<undefined>(3)].map((_, index) => (
    <div className="space-y-4" key={index}>
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-9 w-full" />
    </div>
  ));
};
