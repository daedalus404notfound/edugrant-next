"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { handleApiError } from "@/lib/handleApiError";
import {
  defaultMeta,
  MetaTypesFormData,
  TanstackTablePropsSchema,
} from "../zod/api";
export type NotificationDataTypes = {
  notificationId: number;
  ownerId: number;
  title: string;
  description: string;
  read: boolean;
  dateCreated: string;
  status: string;
};
export type NotificationTypes = {
  notification: NotificationDataTypes[];
  meta: MetaTypesFormData;
};
export default function useGetNotifications({
  status,
  pagination,
  sorting,
  columnFilters,
}: TanstackTablePropsSchema) {
  const { pageIndex, pageSize } = pagination;
  const [meta, setMeta] = useState<MetaTypesFormData>(defaultMeta);

  const query = useQuery({
    queryKey: ["notifications", pagination, sorting, columnFilters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      params.append("page", (pageIndex + 1).toString());
      params.append("dataPerPage", pageSize.toString());
      if (sorting.length > 0) {
        params.append("sortBy", sorting[0].id);
        params.append("order", sorting[0].desc ? "desc" : "asc");
      }

      if (columnFilters.length > 0) {
        params.append("filters", JSON.stringify(columnFilters));
      }
      const endpoint = `${process.env.NEXT_PUBLIC_USER_URL}/getNotifications`;

      try {
        const res = await axios.get<NotificationTypes>(endpoint, {
          withCredentials: true,
        });

        return res.data;
      } catch (error) {
        handleApiError(error, true);
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.meta) {
      setMeta(query.data.meta);
    }
  }, [query.isSuccess, query.data?.meta, setMeta]);

  return { query, meta };
}
