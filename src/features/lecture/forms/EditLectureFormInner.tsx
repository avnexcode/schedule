import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MajorSelect } from "@/features/major/components/action";
import { Gender } from "@prisma/client";
import { useFormContext } from "react-hook-form";
import type { UpdateLectureFormSchema } from "../types";

type EditLectureFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateLectureFormSchema) => void;
};

export const EditLectureFormInner = ({
  formId,
  onSubmit,
}: EditLectureFormInnerProps) => {
  const form = useFormContext<UpdateLectureFormSchema>();
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
              <Input placeholder="Input lecture name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Gender <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <RadioGroup
                // defaultValue={field.value}
                value={field.value}
                onValueChange={field.onChange}
                disabled={field.disabled}
                name={field.name}
                className="flex gap-x-10 py-2.5"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Gender.MALE} id="gender-male" />
                  <Label htmlFor="gender-male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={Gender.FEMALE} id="gender-female" />
                  <Label htmlFor="gender-female">Female</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <MajorSelect<UpdateLectureFormSchema>
        name="majorId"
        label="Major"
        required
      />
    </form>
  );
};
