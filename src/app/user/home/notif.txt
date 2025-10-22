// "use client";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import useMarkAllAsRead from "@/hooks/admin/postMarkAllAsRead";
// import usefetchNotifications from "@/hooks/user/getNotfications";
// import { useNotificationStore } from "@/store/userNotificationStore";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { format, formatDistanceToNow } from "date-fns";
// import {
//   Bell,
//   Check,
//   Clock,
//   DollarSign,
//   Home,
//   ThumbsUp,
//   X,
// } from "lucide-react";
// import { useState } from "react";
// import useMarkAsReadNotification from "@/hooks/admin/patchReadNotification";
// import Link from "next/link";

// export default function Notification() {
//   const {
//     data,
//     loading: loadingNotif,
//     meta,
//     setData,
//     isFetchingMore,
//   } = usefetchNotifications({
//     page: 1,
//     pageSize: 5,
//     accountId: 5,
//   });
//   const { unreadNotifications } = useNotificationStore.getState();
//   const [openDialog, setOpenDialog] = useState(false);
//   const { onSubmit, markLoading } = useMarkAllAsRead({ accountId: 5 });
//   const { onSubmitPatch, patchMarkLoading } = useMarkAsReadNotification({
//     accountId: 5,
//   });
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <div className="relative">
//           <Button className="rounded-full" variant="secondary">
//             <Bell />
//           </Button>
//           <span className="absolute bg-red-700 text-gray-200 flex justify-center items-center size-4.5 rounded-full text-xs font-medium -top-1 -right-1">
//             {unreadNotifications}
//           </span>
//         </div>
//       </PopoverTrigger>
//       <PopoverContent className="w-md p-0 overflow-hidden mr-8">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 bg-background/60 border-b">
//           <h2 className="text-base font-semibold">Notifications</h2>
//           <Button
//             className="!p-0 !bg-transparent text-primary"
//             onClick={onSubmit}
//             disabled={markLoading || data.every((notif) => notif.read)}
//           >
//             <Check size={18} />
//             Mark all as read
//           </Button>
//         </div>

//         {/* Notifications List */}

//         {data.length >= 0 ? (
//           <div className="p-8 text-center text-sm text-muted-foreground">
//             No notification found.
//           </div>
//         ) : (
//           data.map((notification, index) => (
//             <Link
//               href={`/user/administrator/walaPangId`}
//               key={notification.notificationId}
//               className={`flex gap-3 p-4 hover:dark:bg-background/30 hover:bg-card cursor-pointer ${
//                 notification.read ? "" : "dark:bg-background/70 bg-card"
//               }`}
//               onClick={() => {
//                 if (!notification.read) {
//                   onSubmitPatch(notification.notificationId);
//                   setData((prev) =>
//                     prev.map((notif) =>
//                       notif.notificationId === notification.notificationId
//                         ? { ...notif, read: true } // update the clicked one
//                         : notif
//                     )
//                   );
//                 }
//               }}
//             >
//               {/* Content */}
//               <div className="flex-1">
//                 <div className="flex items-start justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     <h4 className=" font-medium">{notification.title}</h4>
//                   </div>
//                   <span className="text-muted-foreground text-sm ml-4">
//                     {formatDistanceToNow(new Date(notification.dateCreated), {
//                       addSuffix: true,
//                     })}
//                   </span>
//                 </div>
//                 <p className="text-muted-foreground text-sm leading-relaxed">
//                   {notification.description}
//                 </p>
//               </div>
//             </Link>
//           ))
//         )}

//         {/* Footer */}
//         <div className="p-4 border-t flex justify-center items-center bg-background/60">
//           <Label className="font-medium hover:underline">
//             View all notifications
//           </Label>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }

//   <Drawer direction="right" open={openNotif} onOpenChange={setOpenNotif}>
//     <DrawerContent className="p-4 space-y-4">
//       <DrawerHeader className="sr-only">
//         <DrawerTitle>Are you absolutely sure?</DrawerTitle>
//         <DrawerDescription>This action cannot be undone.</DrawerDescription>
//       </DrawerHeader>

//       <TitleReusable title="Notification" description="" />

//       <div className="flex flex-col  flex-1 overflow-auto ">
//         {loadingNotif ? (
//           <>loading</>
//         ) : (
//           <Timeline className="space-y-3">
//             {data.map((item, index) => (
//               <Dialog key={item.notificationId}>
//                 <DialogTrigger
//                   asChild
//                   onClick={() => {
//                     // Run API only if unread
//                     if (!item.read) {
//                       onSubmitPatch(item.notificationId);
//                       setData((prev) =>
//                         prev.map((notif) =>
//                           notif.notificationId === item.notificationId
//                             ? { ...notif, read: true } // update the clicked one
//                             : notif
//                         )
//                       );
//                     }
//                   }}
//                 >
//                   <div
//                     className={`p-4 rounded-lg transition-all border hover:bg-accent hover:shadow-sm cursor-pointer ${
//                       item.read ? "bg-card" : "bg-accent/30 border-accent"
//                     }`}
//                   >
//                     <div className="space-y-1">
//                       <div className="flex justify-between items-center">
//                         <TimelineTitle className="font-medium text-sm sm:text-base">
//                           {item.title}
//                         </TimelineTitle>
//                         {!item.read && (
//                           <span className="size-2.5 rounded-full bg-primary" />
//                         )}
//                       </div>
//                       <TimelineContent className="text-sm text-muted-foreground line-clamp-2">
//                         {item.description}
//                       </TimelineContent>
//                     </div>

//                     <TimelineDate className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
//                       <CalendarIcon size={13} />
//                       {format(item.dateCreated, "PPP p")}
//                     </TimelineDate>
//                   </div>
//                 </DialogTrigger>

//                 <DialogContent className="max-w-lg p-6 rounded-xl">
//                   <DialogHeader>
//                     <DialogTitle>{item.title}</DialogTitle>
//                     <DialogDescription>
//                       {format(item.dateCreated, "PPP p")}
//                     </DialogDescription>
//                   </DialogHeader>
//                   <p className="text-sm mt-4 leading-relaxed text-foreground">
//                     {item.description}
//                   </p>
//                 </DialogContent>
//               </Dialog>
//             ))}
//           </Timeline>
//         )}
//         {isFetchingMore && (
//           <div className="space-y-4">
//             {[...Array(2)].map((_, i) => (
//               <div
//                 key={i}
//                 className="group relative overflow-hidden py-8 transition-all"
//               >
//                 <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
//                   <div className="flex flex-col gap-1 lg:w-32 shrink-0">
//                     <Skeleton className="h-6 w-20" />
//                     <Skeleton className="h-4 w-16" />
//                   </div>
//                   <div className="flex-1 space-y-4">
//                     <Skeleton className="h-8 w-3/4" />
//                     <div className="space-y-2">
//                       <Skeleton className="h-4 w-full" />

//                       <Skeleton className="h-4 w-2/3" />
//                     </div>
//                     <div className="flex gap-2">
//                       <Skeleton className="h-6 w-20 rounded-full" />
//                       <Skeleton className="h-6 w-24 rounded-full" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {meta?.totalPage > 1 && (
//           <div className="mt-12 flex justify-center">
//             <Button
//               variant="outline"
//               size="lg"
//               onClick={handleLoadMore}
//               disabled={
//                 loadingNotif || page >= meta.totalPage || isFetchingMore
//               }
//             >
//               {loadingNotif || isFetchingMore ? (
//                 <>
//                   <Loader className="mr-2 h-4 w-4 animate-spin" />
//                   Loading...
//                 </>
//               ) : page < meta.totalPage ? (
//                 <>
//                   Load More
//                   <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                 </>
//               ) : (
//                 "You're all caught up!"
//               )}
//             </Button>
//           </div>
//         )}
//       </div>
//       <DrawerFooter>
//         <Button
//           onClick={onSubmit}
//           disabled={markLoading || data.every((notif) => notif.read)}
//         >
//           Mark all as read
//         </Button>
//         <DrawerClose asChild className="!bg-transparent">
//           <Button variant="outline">Close</Button>
//         </DrawerClose>
//       </DrawerFooter>
//     </DrawerContent>
//   </Drawer>;
"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMarkAllAsRead from "@/hooks/admin/postMarkAllAsRead";
import usefetchNotifications, {
  NotificationTypes,
} from "@/hooks/user/getNotfications";
import { useNotificationStore } from "@/store/userNotificationStore";
import { format, formatDistanceToNow } from "date-fns";
import {
  Bell,
  Check,
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Sparkles,
  X,
  MessageSquare,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";
import useMarkAsReadNotification from "@/hooks/admin/patchReadNotification";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Notification() {
  const { data, loading, meta, setData, isFetchingMore } =
    usefetchNotifications({
      page: 1,
      pageSize: 5,
      accountId: 5,
    });
  const { unreadNotifications } = useNotificationStore.getState();
  const [openDialog, setOpenDialog] = useState(false);
  const { onSubmit, markLoading } = useMarkAllAsRead({ accountId: 5 });
  const { onSubmitPatch, patchMarkLoading } = useMarkAsReadNotification({
    accountId: 5,
  });

  const hasUnread = data.some((notif) => !notif.read);

  return (
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>

      <PopoverContent
        className="lg:w-lg w-xs p-0 overflow-hidden lg:mr-6 mr-2"
        align="center"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 bg-muted/30 border-b">
          <div className="flex-1 flex justify-start items-center">
            <Button variant="ghost">
              <Bell />
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
              disabled={markLoading || !hasUnread}
            >
              <Check className="w-3.5 h-3.5" />
              Mark all read
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="lg:h-115 h-80 overflow-auto">
          {data.length === 0 ? (
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
              {data.map((notification, index) => (
                <Link
                  href={`/user/home/applications${`?status=${notification.title}`}`}
                  key={notification.notificationId}
                  className={cn(
                    "flex gap-3 p-4 transition-colors relative group",
                    "hover:bg-muted/50 active:bg-muted",
                    !notification.read && "bg-primary/5 dark:bg-primary/10"
                  )}
                  onClick={() => {
                    if (!notification.read) {
                      onSubmitPatch(notification.notificationId);
                      setData((prev) =>
                        prev.map((notif) =>
                          notif.notificationId === notification.notificationId
                            ? { ...notif, read: true }
                            : notif
                        )
                      );
                    }
                  }}
                >
                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-primary-second rounded-r-full" />
                  )}

                  {/* Icon */}
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

                  {/* Content */}
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
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {data.length > 0 && (
          <>
            <Separator />
            <Link href="/user/administrator/notifications">
              <div className="p-3 flex justify-center items-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <Label className="text-sm font-medium text-primary cursor-pointer">
                  View all notifications
                </Label>
              </div>
            </Link>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
