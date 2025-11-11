"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import useMarkAllAsRead from "@/hooks/student-notification/postMarkAll";
import useGetNotifications from "@/hooks/student-notification/getNotfications";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  Check,
  Clock,
  X,
  MessageSquare,
  CheckCheck,
  Calendar,
  ArrowRight,
  Ban,
  MessageCircle,
} from "lucide-react";
import useMarkAsRead from "@/hooks/student-notification/postMark";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataFound from "@/components/ui/nodata";
import { useQueryClient } from "@tanstack/react-query";
import { paginationDefault06, sortDefault } from "@/lib/socket-constants";

export default function Notification() {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "dateCreated",
      desc: true,
    },
  ]);

  const existing = queryClient.getQueryData([
    "notifications",
    paginationDefault06,
    sortDefault,
    [],
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const markMutation = useMarkAsRead();
  console.log("existing", existing);
  const markAllMutation = useMarkAllAsRead();
  const { query, meta } = useGetNotifications({
    pagination,
    sorting,
    columnFilters,
  });
  const data = query.data?.notification;
  console.log("data", data);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full relative"
          variant="secondary"
          size="icon"
        >
          <Bell className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="lg:w-md w-xs lg:mr-13 mr-3  lg:mt-3 p-0 bg-background/90 backdrop-blur-2xl"
        align="center"
      >
        <h2 className="text-base font-semibold p-4">Notifications</h2>
        {/* Notifications List */}
        <ScrollArea className="px-4 max-h-122">
          <div className="grid gap-2">
            {query.isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : query.data?.notification.length === 0 ? (
              <NoDataFound />
            ) : (
              data?.map((notification) => {
                const approved = notification.status === "APPROVED";

                const declined = notification.status === "DECLINED";
                const interview = notification.status === "INTERVIEW";
                const blocked = notification.status === "BLOCKED";
                return (
                  <DropdownMenuItem
                    key={notification.notificationId}
                    className={`border  ${notification.read ? "" : "bg-card"}`}
                    asChild
                    onClick={() =>
                      markMutation.mutate(notification.notificationId)
                    }
                  >
                    <Link href={`/user/home/applications`}>
                      <div className="p-2 flex items-start gap-4">
                        <span
                          className={`rounded-md ${
                            approved
                              ? "bg-green-200 dark:bg-green-800/50 p-2"
                              : declined
                              ? "bg-red-200 dark:bg-red-800/50 p-2"
                              : interview
                              ? "bg-blue-200 dark:bg-blue-800/50 p-2"
                              : blocked
                              ? "bg-gray-200 dark:bg-gray-800/50 p-2"
                              : ""
                          }`}
                        >
                          {approved ? (
                            <CheckCheck />
                          ) : declined ? (
                            <X />
                          ) : interview ? (
                            <MessageCircle />
                          ) : blocked ? (
                            <Ban />
                          ) : (
                            ""
                          )}
                        </span>
                        <div>
                          <div className="flex justify-between items-center">
                            <h1 className="font-medium leading-4">
                              {notification.title}
                            </h1>
                            <span className="flex items-center gap-1">
                              <Calendar />
                              <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(
                                  new Date(notification.dateCreated),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </p>
                            </span>
                          </div>
                          <p className="text-muted-foreground mt-2 line-clamp-3 leading-5">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })
            )}
          </div>
          {/* {meta.totalRows > 4 && (
            <span className="flex items-center justify-end gap-2 py-3 hover:underline cursor-pointer">
              <p className=" text-sm text-muted-foreground">See more</p>
              <ArrowRight className="size-4 text-muted-foreground" />
            </span>
          )} */}
        </ScrollArea>{" "}
        <h2
          onClick={() => markAllMutation.mutate()}
          className={`text-sm text-center p-2 hover:underline cursor-pointer border-t bg-card ${
            markAllMutation.isPending ||
            markAllMutation.isSuccess ||
            (query.data?.notification.length ?? 0) === 0
              ? "pointer-events-none text-muted-foreground"
              : ""
          }`}
        >
          {markAllMutation.isPending
            ? "Marking..."
            : markAllMutation.isSuccess
            ? "Marked"
            : "Mark all as read"}
        </h2>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
