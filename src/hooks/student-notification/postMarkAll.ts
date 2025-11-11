"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { handleApiError } from "@/lib/handleApiError";
import { paginationDefault06, sortDefault } from "@/lib/socket-constants";
import { NotificationDataTypes, NotificationTypes } from "./getNotfications";
import { AuthTypes } from "../user/getTokenAuthentication";

export default function useMarkAllAsRead() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USER_URL}/markAllReadNotifications`,
        {},
        { withCredentials: true }
      );
      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["notifications", paginationDefault06, sortDefault, []],
      });
      const previous = queryClient.getQueryData([
        "notifications",
        paginationDefault06,
        sortDefault,
        [],
      ]);

      queryClient.setQueryData(
        ["notifications", paginationDefault06, sortDefault, []],
        (old: NotificationTypes) => {
          return {
            ...old,
            notification: old.notification.map((n: NotificationDataTypes) => ({
              ...n,
              read: true,
            })),
          };
        }
      );
      queryClient.setQueryData(
        ["authenticated-user-student"],
        (old: AuthTypes) => {
          if (!old) return old;
          return {
            ...old,
            unreadNotifications: 0,
          };
        }
      );
      return { previous };
    },
    onError: (error, _, context) => {
      handleApiError(error);
      if (context?.previous) {
        queryClient.setQueryData(
          ["notifications", paginationDefault06, sortDefault, []],
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", paginationDefault06, sortDefault, []],
      });
    },
  });

  return mutation;
}
