import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { UpdateMajorFormSchema } from "../types";

type EditMajorFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateMajorFormSchema) => void;
};

export const EditMajorFormInner = ({
  formId,
  onSubmit,
}: EditMajorFormInnerProps) => {
  const form = useFormContext<UpdateMajorFormSchema>();

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
      <FormField
        control={form.control}
        name="alias"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Alias <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Input major alias" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
