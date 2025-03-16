import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import type { UpdateSpecializationFormSchema } from "../types";
import { MajorSelect } from "@/features/major/components/action";
import { Input } from "@/components/ui/input";

type EditSpecializationFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateSpecializationFormSchema) => void;
};

export const EditSpecializationFormInner = ({
  formId,
  onSubmit,
}: EditSpecializationFormInnerProps) => {
  const form = useFormContext<UpdateSpecializationFormSchema>();
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
      <MajorSelect<UpdateSpecializationFormSchema>
        name="major_id"
        label="Major"
        required
      />
    </form>
  );
};
