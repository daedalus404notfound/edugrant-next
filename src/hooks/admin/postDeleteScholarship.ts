import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useRouter } from "next/navigation";

type DeleteTypes = {
  setDeleteLoading?: (deleteLoading: boolean) => void;
  setOpenAlert?: (openAlert: boolean) => void;
  setOpen?: (open: boolean) => void;
  scholarshipId?: string;
  back?: boolean;
};

export default function useDeleteScholarship({
  setDeleteLoading,
  setOpenAlert,
  setOpen,
  scholarshipId,
  back = false,
}: DeleteTypes) {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setDeleteLoading?.(true);

      console.log("Deleting scholarship:", scholarshipId);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteScholarship`,
        { scholarshipId },
        { withCredentials: true }
      );

      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Scholarship Deleted",
          description:
            "The scholarship has been successfully removed from the system.",
        });

        setDeleteLoading?.(false);
        setOpenAlert?.(false);
        setOpen?.(false);

        if (back) router.back();
      }
    } catch (error) {
      console.error(error);
      StyledToast({
        status: "error",
        title: "Deletion Failed",
        description:
          "The scholarship could not be removed. Please try again later.",
      });

      setDeleteLoading?.(false);
      setOpenAlert?.(false);
      setOpen?.(false);

      if (back) router.back();
    }
  };

  return { onSubmit };
}
