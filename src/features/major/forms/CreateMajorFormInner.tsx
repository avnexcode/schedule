import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { CreateMajorFormSchema } from "../types";

type CreateMajorFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateMajorFormSchema) => void;
};

export const CreateMajorFormInner = ({
  formId,
  onSubmit,
}: CreateMajorFormInnerProps) => {
  const form = useFormContext<CreateMajorFormSchema>();

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Input major name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
