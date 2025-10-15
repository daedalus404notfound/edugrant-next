import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TipTapViewer } from "@/components/ui/tiptap-viewer";
import { AnnouncementFormDataPost } from "@/hooks/zod/announcement";
import { format } from "date-fns";
import { Calendar, Clock, Loader2, Pencil, Trash2 } from "lucide-react";

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
import useDeleteAnnouncement from "@/hooks/admin/postDeleteAnnouncement";
import { useEffect } from "react";
export default function DisplayAnnouncement({
  data,
  setEdit,
  HandleCloseDrawer,
}: {
  data: AnnouncementFormDataPost | null;
  setEdit: (edit: boolean) => void;
  HandleCloseDrawer: (close: boolean) => void;
}) {
  const id = data?.announcementId || 0;
  const { onSubmit, isSuccess, deleteLoading, openDelete, setOpenDelete } =
    useDeleteAnnouncement({ id });

  useEffect(() => {
    if (isSuccess) {
      HandleCloseDrawer(false);
    }
  }, [isSuccess]);
  return (
    <div className="">
      {data?.description && (
        <TipTapViewer content={data?.description} className="p-6" />
      )}

      <div className="sticky bottom-0 z-10 bg-card rounded-md">
        <div className="flex gap-3 px-6 py-4">
          <Button
            disabled={deleteLoading}
            onClick={() => setEdit(true)}
            className="flex-1"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>

          <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={deleteLoading}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-border/40">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this announcement and remove it from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={deleteLoading}
                  className="border-border/40"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
                  disabled={deleteLoading}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleteLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Announcement
                    </>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
