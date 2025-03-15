import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/utils";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteSpecializationDialogProps = {
  specializationId: string;
};

export const DeleteSpecializationDialog = ({
  specializationId,
}: DeleteSpecializationDialogProps) => {
  const apiUtils = api.useUtils().specialization;

  const {
    mutate: deleteSpecialization,
    isPending: isDeleteSpecializationPending,
  } = api.specialization.delete.useMutation({
    onSuccess: () => {
      toast.success("Delete specialization successfully");
      void apiUtils.invalidate();
    },
  });

  const handleDelete = () => {
    return deleteSpecialization({ id: specializationId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            specialization and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleteSpecializationPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
