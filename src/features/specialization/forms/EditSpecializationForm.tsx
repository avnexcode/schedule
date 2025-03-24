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
import { EditSpecializationFormSkeleton } from "../components/skeleton";
import { updateSpecializationFormSchema } from "../schemas";
import type { UpdateSpecializationFormSchema } from "../types";
import { EditSpecializationFormInner } from "./EditSpecializationFormInner";

type EditSpecializationFormProps = {
  specializationId: string;
};

export const EditSpecializationForm = ({
  specializationId,
}: EditSpecializationFormProps) => {
  const router = useRouter();

  const form = useForm<UpdateSpecializationFormSchema>({
    defaultValues: {
      name: "",
      alias: "",
      majorId: "",
    },
    resolver: zodResolver(updateSpecializationFormSchema),
  });

  const { data: specialization, isLoading: isSpecializationLoading } =
    api.specialization.getById.useQuery(
      { id: specializationId },
      { enabled: !!specializationId },
    );

  useEffect(() => {
    if (specialization) {
      form.reset({
        ...specialization,
        majorId: specialization.major.id,
      });
    }
  }, [form, specialization]);

  const {
    mutate: updateSpecialization,
    isPending: isUpdateSpecializationPending,
  } = api.specialization.update.useMutation({
    onSuccess: () => {
      toast.success("Update specialization successfully");
      void router.replace("/dashboard/specialization");
    },
    onError: (error) => {
      toast.error(error.message ?? "Update specialization failed");
    },
  });

  const onSubmit = (values: UpdateSpecializationFormSchema) =>
    updateSpecialization({ id: specializationId, request: values });

  if (isSpecializationLoading) {
    return <EditSpecializationFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <EditSpecializationFormInner
            formId="update-specialization-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-5 place-content-end space-x-5">
        <Button onClick={() => router.back()} className="w-[100px]">
          Cancel
        </Button>
        <Button
          form="update-specialization-form"
          disabled={isUpdateSpecializationPending || !form.formState.isDirty}
          className="w-[150px]"
        >
          {!isUpdateSpecializationPending ? (
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
