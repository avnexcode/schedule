import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createSpecializationFormSchema } from "../schemas";
import type { CreateSpecializationFormSchema } from "../types";
import { api } from "@/utils";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { CreateSpecializationFormInner } from "./CreateSpecializationFormInner";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/router";

export const CreateSpecializationForm = () => {
  const router = useRouter();

  const form = useForm<CreateSpecializationFormSchema>({
    defaultValues: {
      name: "",
      alias: "",
      major_id: "",
    },
    resolver: zodResolver(createSpecializationFormSchema),
  });

  const {
    mutate: createSpecialization,
    isPending: isCreateSpecializationPending,
  } = api.specialization.create.useMutation({
    onSuccess: () => {
      toast.success("Create specialization successfully");
      void router.replace("/dashboard/specialization");
    },
    onError: (error) => {
      toast.error(error.message ?? "Create specialization failed");
    },
  });

  const onSubmit = (values: CreateSpecializationFormSchema) =>
    createSpecialization({ request: values });

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateSpecializationFormInner
            formId="create-specialization-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end pt-5">
        <Button
          form="create-specialization-form"
          disabled={isCreateSpecializationPending}
          className="w-[150px]"
        >
          {!isCreateSpecializationPending ? (
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
