import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MajorSelect } from "@/features/major/components/action";
import { useFormContext } from "react-hook-form";
import type { CreateSpecializationFormSchema } from "../types";

type CreateSpecializationFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateSpecializationFormSchema) => void;
};

export const CreateSpecializationFormInner = ({
  formId,
  onSubmit,
}: CreateSpecializationFormInnerProps) => {
  const form = useFormContext<CreateSpecializationFormSchema>();

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
              <Input placeholder="Input specialization name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="alias"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Alias <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Input specialization alias" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <MajorSelect<CreateSpecializationFormSchema>
        name="majorId"
        label="Major"
        required
      />
    </form>
  );
};
