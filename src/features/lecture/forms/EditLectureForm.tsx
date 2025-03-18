import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Gender } from "@prisma/client";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateLectureFormSchema } from "../schemas";
import type { UpdateLectureFormSchema } from "../types";
import { EditLectureFormInner } from "./EditLectureFormInner";
import { useEffect } from "react";
import { EditLectureFormSkeleton } from "../components/skeleton";

type EditLectureFormProps = {
  lectureId: string;
};

export const EditLectureForm = ({ lectureId }: EditLectureFormProps) => {
  const router = useRouter();
  const form = useForm<UpdateLectureFormSchema>({
    defaultValues: {
      name: "",
      gender: "" as Gender,
      majorId: "",
    },
    resolver: zodResolver(updateLectureFormSchema),
  });

  const { data: lecture, isLoading: isLectureLoading } =
    api.lecture.getById.useQuery({ id: lectureId });

  useEffect(() => {
    if (lecture) {
      form.reset({
        name: lecture.name,
        gender: lecture.gender,
        majorId: lecture.major.id,
      });
    }
  }, [form, lecture]);

  const { mutate: updateLecture, isPending: isUpdateLecturePending } =
    api.lecture.update.useMutation({
      onSettled: () => {
        toast.success("Update lecture successfully");
        void router.replace("/dashboard/lecture");
      },
      onError: (error) => {
        toast.error(error.message ?? "Update lecture failed");
      },
    });

  const onSubmit = (values: UpdateLectureFormSchema) =>
    updateLecture({ id: lectureId, request: values });

  if (isLectureLoading) {
    return <EditLectureFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <EditLectureFormInner
            formId="update-lecture-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-5 place-content-end space-x-5">
        <Button onClick={() => router.back()} className="w-[100px]">
          Cancel
        </Button>
        <Button
          form="update-lecture-form"
          disabled={isUpdateLecturePending || !form.formState.isDirty}
          className="w-[150px]"
        >
          {!isUpdateLecturePending ? (
            <>
              <Save />
              Update
            </>
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Updating...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
