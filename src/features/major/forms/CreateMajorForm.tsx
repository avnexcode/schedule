import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createMajorFormSchema } from "../schemas";
import type { CreateMajorFormSchema } from "../types";
import { CreateMajorFormInner } from "./CreateMajorFormInner";

export const CreateMajorForm = () => {
  const router = useRouter();

  const form = useForm<CreateMajorFormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createMajorFormSchema),
  });

  const { mutate: createMajor, isPending: isCreateMajorPending } =
    api.major.create.useMutation({
      onSuccess: () => {
        toast.success("Create major successfully");
        void router.replace("/dashboard/major");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const onSubmit = (values: CreateMajorFormSchema) => {
    return createMajor({ request: values });
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateMajorFormInner
            formId="create-major-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="place-content-end pt-5">
        <Button
          form="create-major-form"
          disabled={isCreateMajorPending}
          className="w-[150px]"
        >
          {!isCreateMajorPending ? (
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
