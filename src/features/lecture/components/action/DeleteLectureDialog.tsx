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

type DeleteLectureDialogProps = {
  lectureId: string;
};

export const DeleteLectureDialog = ({
  lectureId,
}: DeleteLectureDialogProps) => {
  const apiUtils = api.useUtils().lecture;

  const { mutate: deleteLecture, isPending: isDeleteLecturePending } =
    api.lecture.delete.useMutation({
      onSuccess: () => {
        toast.success("Delete lecture successfully");
        void apiUtils.invalidate();
      },
    });

  const handleDelete = () => {
    return deleteLecture({ id: lectureId });
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
            lecture and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleteLecturePending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
