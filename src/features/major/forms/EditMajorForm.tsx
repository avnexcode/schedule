import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateMajorFormSchema } from "../schemas";
import type { UpdateMajorFormSchema } from "../types";
import { EditMajorFormInner } from "./EditMajorFormInner";
import { EditMajorFormSkeleton } from "../components/skeleton";

type EditMajorFormProps = {
  majorId: string;
};

export const EditMajorForm = ({ majorId }: EditMajorFormProps) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(updateMajorFormSchema),
  });

  const { data: major, isLoading: isMajorLoading } = api.major.getById.useQuery(
    { id: majorId },
  );

  useEffect(() => {
    if (major) {
      form.reset({ name: major.name });
    }
  }, [form, major]);

  const { mutate: updateMajor, isPending: isUpdateMajorPending } =
    api.major.update.useMutation({
      onSuccess: () => {
        toast.success("Update major successfully");
        void router.replace("/dashboard/major");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmit = (values: UpdateMajorFormSchema) => {
    return updateMajor({ id: majorId, request: values });
  };

  if (isMajorLoading) {
    return <EditMajorFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <EditMajorFormInner formId="update-major-form" onSubmit={onSubmit} />
        </Form>
      </CardContent>
      <CardFooter className="mt-5 place-content-end space-x-5">
        <Button onClick={() => router.back()} className="w-[100px]">
          Cancel
        </Button>
        <Button
          form="update-major-form"
          disabled={isUpdateMajorPending || !form.formState.isDirty}
          className="w-[150px]"
        >
          {!isUpdateMajorPending ? (
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
