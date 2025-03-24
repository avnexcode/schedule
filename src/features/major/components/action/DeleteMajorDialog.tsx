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

type DeleteMajorDialogProps = {
  majorId: string;
};

export const DeleteMajorDialog = ({ majorId }: DeleteMajorDialogProps) => {
  const apiUtils = api.useUtils().major;

  const { mutate: deleteMajor, isPending: isDeleteMajorPending } =
    api.major.delete.useMutation({
      onSuccess: () => {
        toast.success("Delete major successfully");
        void apiUtils.invalidate();
      },
    });

  const handleDelete = () => {
    return deleteMajor({ id: majorId });
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
            major and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary text-primary-foreground hover:bg-primary/90">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleteMajorPending}
            className="bg-red-500 text-zinc-200"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
