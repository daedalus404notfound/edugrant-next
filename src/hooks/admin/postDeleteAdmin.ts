import StyledToast from "@/components/ui/toast-styled";
import axios from "axios";
import { useState } from "react";

type DeleteTypes = {
  adminId?: (string | number)[];
};

export default function useDeleteAdmin({ adminId }: DeleteTypes) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ADMINISTRATOR_URL}/deleteAdmin`,
        {
          adminId: JSON.stringify({
            data: adminId,
          }),
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        StyledToast({
          status: "success",
          title: "Admin Deleted",
          description:
            "The admin has been successfully removed from the system.",
        });
        setIsSuccess(true);

        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      StyledToast({
        status: "error",
        title: "Deletion Failed",
        description:
          "The application could not be removed. Please try again later.",
      });
      setIsSuccess(false);
      setLoading(false);
    }
  };

  return { onSubmit, isSuccess, loading };
}
