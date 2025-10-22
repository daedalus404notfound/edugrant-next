// "use client";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import useMarkAllAsRead from "@/hooks/admin/postMarkAllAsRead";
// import usefetchNotifications from "@/hooks/user/getNotfications";
// import { useNotificationStore } from "@/store/userNotificationStore";
// import { formatDistanceToNow } from "date-fns";
// import { Bell, Check, Clock, X, MessageSquare, CheckCheck } from "lucide-react";
// import useMarkAsReadNotification from "@/hooks/admin/patchReadNotification";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { useApplicationStore } from "@/store/applicationUsetStore";

// export default function Notification() {
//   //STORE
//   const { unreadNotifications } = useNotificationStore();
//   const { setStatus, status } = useApplicationStore();

//   //API
//   const { data, isLoading, meta, isFetchingMore } = usefetchNotifications({
//     page: 1,
//     pageSize: 5,
//   });
//   const { onSubmit, markAllAsReadLoading } = useMarkAllAsRead();
//   const { markReadLoading, markReadSubmit } = useMarkAsReadNotification();

//   const hasUnread = data.some((notif) => !notif.read);

//   console.log(status);
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           className="rounded-full relative"
//           variant="secondary"
//           size="icon"
//         >
//           <Bell className="w-5 h-5" />
//           {(unreadNotifications ?? 0) > 0 && (
//             <span className="absolute flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg animate-pulse">
//               {(unreadNotifications ?? 0) > 99 ? "99+" : unreadNotifications}
//             </span>
//           )}
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent
//         className="lg:w-lg w-xs p-0 overflow-hidden lg:mr-6 mr-2"
//         align="center"
//         sideOffset={8}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-2 bg-muted/30 border-b">
//           <div className="flex-1 flex justify-start items-center">
//             <Button variant="ghost">
//               <Bell />
//             </Button>
//           </div>
//           <div className="flex-1 flex items-center justify-center gap-2">
//             <h2 className="text-base font-semibold">Notifications</h2>
//             {(unreadNotifications ?? 0) > 0 && (
//               <Badge variant="secondary" className="rounded-full px-2 py-0">
//                 {unreadNotifications}
//               </Badge>
//             )}
//           </div>
//           <div className="flex-1 flex justify-end items-center">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="gap-2 h-8 text-xs"
//               onClick={onSubmit}
//               disabled={markAllAsReadLoading || !hasUnread}
//             >
//               <Check className="w-3.5 h-3.5" />
//               Mark all read
//             </Button>
//           </div>
//         </div>

//         {/* Notifications List */}
//         <div className="lg:h-115 h-80 overflow-auto">
//           {data.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
//               <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-3">
//                 <Bell className="w-8 h-8 text-muted-foreground/50" />
//               </div>
//               <p className="text-sm font-medium text-foreground mb-1">
//                 No notifications yet
//               </p>
//               <p className="text-xs text-muted-foreground">
//                 We'll notify you when something new arrives
//               </p>
//             </div>
//           ) : (
//             <div className="divide-y">
//               {data.map((notification, index) => (
//                 <Link
//                   href={`/user/home/applications`}
//                   key={notification.notificationId}
//                   className={cn(
//                     "flex gap-3 p-4 transition-colors relative group",
//                     "hover:bg-muted/50 active:bg-muted",
//                     !notification.read && "bg-primary/5 dark:bg-primary/10"
//                   )}
//                   onClick={() => {
//                     setStatus(notification.title);
//                     if (!notification.read) {
//                       markReadSubmit(notification.notificationId);

//                       // setData((prev) =>
//                       //   prev.map((notif) =>
//                       //     notif.notificationId === notification.notificationId
//                       //       ? { ...notif, read: true }
//                       //       : notif
//                       //   )
//                       // );
//                     }
//                   }}
//                 >
//                   {/* Unread indicator */}
//                   {!notification.read && (
//                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-primary-second rounded-r-full" />
//                   )}

//                   {/* Icon */}
//                   <div className="flex-shrink-0 pt-1">
//                     <div
//                       className={cn(
//                         "w-10 h-10 rounded-full flex items-center justify-center",
//                         !notification.read ? "bg-primary/10" : "bg-muted"
//                       )}
//                     >
//                       {notification.title === "APPROVED" ? (
//                         <CheckCheck className="text-green-600" />
//                       ) : notification.title === "DECLINED" ? (
//                         <X className="text-red-600" />
//                       ) : (
//                         <MessageSquare className="text-blue-600" />
//                       )}
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between gap-2 mb-1">
//                       <h4
//                         className={cn(
//                           "text-sm font-semibold line-clamp-1",
//                           !notification.read && "text-foreground"
//                         )}
//                       >
//                         {notification.title}
//                       </h4>
//                       {!notification.read && (
//                         <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
//                       )}
//                     </div>

//                     <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-2">
//                       {notification.description}
//                     </p>

//                     <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                       <Clock className="w-3 h-3" />
//                       <span>
//                         {formatDistanceToNow(
//                           new Date(notification.dateCreated),
//                           {
//                             addSuffix: true,
//                           }
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {data.length > 0 && (
//           <>
//             <Separator />
//             <Link href="/user/administrator/notifications">
//               <div className="p-3 flex justify-center items-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
//                 <Label className="text-sm font-medium text-primary cursor-pointer">
//                   View all notifications
//                 </Label>
//               </div>
//             </Link>
//           </>
//         )}
//       </PopoverContent>
//     </Popover>
//   );
// }
"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import useMarkAllAsRead from "@/hooks/admin/postMarkAllAsRead";
import useFetchNotifications from "@/hooks/user/getNotfications";
import { useNotificationStore } from "@/store/userNotificationStore";
import { formatDistanceToNow } from "date-fns";
import { Bell, Check, Clock, X, MessageSquare, CheckCheck } from "lucide-react";
import useMarkAsReadNotification from "@/hooks/admin/patchReadNotification";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useApplicationStore } from "@/store/applicationUsetStore";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Notification() {
  // STORE
  const { unreadNotifications } = useNotificationStore();
  const { setStatus } = useApplicationStore();

  // API
  const { data, isLoading, ref, hasNextPage, isFetchingNextPage } =
    useFetchNotifications({
      pageSize: 10,
    });
  const { onSubmit, markAllAsReadLoading } = useMarkAllAsRead();
  const { markReadSubmit } = useMarkAsReadNotification();

  const hasUnread = data.some((notif) => !notif.read);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full relative"
          variant="secondary"
          size="icon"
        >
          <Bell className="w-5 h-5" />
          {(unreadNotifications ?? 0) > 0 && (
            <span className="absolute flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg animate-pulse">
              {(unreadNotifications ?? 0) > 99 ? "99+" : unreadNotifications}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className=" w-md mr-8 p-0"
        align="center"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 bg-muted/30 border-b">
          <div className="flex-1 flex justify-start items-center">
            <Button variant="ghost" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <h2 className="text-base font-semibold">Notifications</h2>
            {(unreadNotifications ?? 0) > 0 && (
              <Badge variant="secondary" className="rounded-full px-2 py-0">
                {unreadNotifications}
              </Badge>
            )}
          </div>
          <div className="flex-1 flex justify-end items-center">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 h-8 text-xs"
              onClick={onSubmit}
              disabled={markAllAsReadLoading || !hasUnread}
            >
              <Check className="w-3.5 h-3.5" />
              Mark all read
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[70dvh] overflow-auto">
          {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">
              Loading notifications...
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                <Bell className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                No notifications yet
              </p>
              <p className="text-xs text-muted-foreground">
                We'll notify you when something new arrives
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {data.map((notification) => (
                <DropdownMenuItem
                  key={notification.notificationId}
                  className={cn(
                    "flex gap-3 p-4 transition-colors relative group cursor-pointer focus:bg-muted/50",
                    !notification.read && "bg-primary/5 dark:bg-primary/10"
                  )}
                  onSelect={() => {
                    setStatus(notification.status);
                    if (!notification.read) {
                      markReadSubmit(notification.notificationId);
                    }
                  }}
                  asChild
                >
                  <Link href={`/user/home/applications`}>
                    {!notification.read && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-primary-second rounded-r-full" />
                    )}

                    <div className="flex-shrink-0 pt-1">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          !notification.read ? "bg-primary/10" : "bg-muted"
                        )}
                      >
                        {notification.title === "APPROVED" ? (
                          <CheckCheck className="text-green-600" />
                        ) : notification.title === "DECLINED" ? (
                          <X className="text-red-600" />
                        ) : (
                          <MessageSquare className="text-blue-600" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4
                          className={cn(
                            "text-sm font-semibold line-clamp-1",
                            !notification.read && "text-foreground"
                          )}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                        {notification.description}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>
                          {formatDistanceToNow(
                            new Date(notification.dateCreated),
                            {
                              addSuffix: true,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}

              {/* Infinite Scroll Trigger */}
              <div
                ref={ref}
                className="text-center py-3 text-xs text-muted-foreground px-4"
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Scroll to load more"
                  : "No more notifications"}
              </div>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
