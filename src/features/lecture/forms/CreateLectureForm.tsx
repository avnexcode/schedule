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
import { createLectureFormSchema } from "../schemas";
import type { CreateLectureFormSchema } from "../types";
import { CreateLectureFormInner } from "./CreateLectureFormInner";

export const CreateLectureForm = () => {
  const router = useRouter();
  const form = useForm<CreateLectureFormSchema>({
    defaultValues: {
      name: "",
      gender: "" as Gender,
      major_id: "",
    },
    resolver: zodResolver(createLectureFormSchema),
  });

  const { mutate: createLecture, isPending: isCreateLecturePending } =
    api.lecture.create.useMutation({
      onSettled: () => {
        toast.success("Create lecture successfully");
        void router.replace("/dashboard/lecture");
      },
      onError: (error) => {
        toast.error(error.message ?? "Create lecture failed");
      },
    });

  const onSubmit = (values: CreateLectureFormSchema) =>
    createLecture({ request: values });

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateLectureFormInner
            formId="create-lecture-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end pt-5">
        <Button
          form="create-lecture-form"
          disabled={isCreateLecturePending}
          className="w-[150px]"
        >
          {!isCreateLecturePending ? (
            <>
              <Save />
              Add
            </>
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Adding...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
