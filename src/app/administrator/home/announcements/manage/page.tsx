"use client";

import { Megaphone, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/vercel-tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAnnouncementFetch from "@/hooks/admin/getAnnouncement";
import { format } from "date-fns";
import { DeleteDialog } from "@/components/ui/delete-dialog";
import useDeleteAnnouncement from "@/hooks/admin/postDeleteAnnoucement";
import { Skeleton } from "@/components/ui/skeleton";
import AnnouncementDescription from "./description";
import TitleReusable from "@/components/ui/title";
const tabs = [
  { id: "ACTIVE", label: "Active", indicator: null },
  { id: "EXPIRED", label: "Expired", indicator: null },
];
export default function ScholarshipAnnouncements() {
  const [page] = useState(1);
  const [pageSize] = useState(50);
  const [sortBy] = useState("");
  const [order] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const { data, loading } = useAnnouncementFetch({
    page,
    pageSize,
    sortBy,
    order,
    status,
  });

  const { onSubmit, loadingDelete } = useDeleteAnnouncement({
    announcementId: selectedId,
  });

  console.log("data", data);
  return (
    <div className=" min-h-screen px-4">
      <div className="mx-auto max-w-5xl w-full py-10">
        <TitleReusable
          title="Manage Announcements"
          description="Browse the list of active announcement."
          Icon={Megaphone}
        />
        <div className="mt-8 flex justify-between">
          <Tabs tabs={tabs} onTabChange={(tabId) => setStatus(tabId)} />

          <Button variant="outline">
            <Plus /> Add announcement
          </Button>
        </div>
        <div className="py-7 space-y-3">
          {loading ? (
            <div className="grid grid-cols-1 gap-3">
              <Skeleton className="h-30 w-full" />
              <Skeleton className="h-30 w-full" />
              <Skeleton className="h-30 w-full" />
            </div>
          ) : data.length === 0 ? (
            <div className="h-50 flex justify-center items-center">
              <p className="text-sm text-muted-foreground">
                {" "}
                No announcement found.
              </p>
            </div>
          ) : (
            data.map((announcement) => (
              <div
                key={announcement.announcementId}
                className="p-1 bg-card rounded-md"
              >
                {/* Date Column */}
                <div className="flex">
                  <div className="flex flex-col items-center p-8">
                    <div className=" font-medium text-emerald-600  uppercase tracking-widest">
                      {format(new Date(announcement.startDate), "MMM d")}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 font-mono">
                      {format(new Date(announcement.startDate), "h:mm a")}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="space-y-3 flex-1 ">
                    <div className="space-y-3  p-4 rounded-md">
                      <div className="flex justify-between items-center">
                        <h1>{announcement.title}</h1>
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed mt-2 whitespace-pre-line">
                        <AnnouncementDescription
                          description={announcement.description}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1.5">
                          <p className="text-sm text-muted-foreground font-medium">
                            Tags
                          </p>
                          {announcement.tags.data.map((meow) => (
                            <Badge key={meow} variant="secondary">
                              {meow}
                            </Badge>
                          ))}
                        </div>
                        <div>
                          <DeleteDialog
                            open={openAlert}
                            onOpenChange={setOpenAlert}
                            onConfirm={onSubmit}
                            loading={loadingDelete}
                            title="Delete announcement?"
                            description="This will permanently delete announcement and cannot be undone."
                            confirmText="Delete All"
                            cancelText="Keep Items"
                            trigger={
                              <Button
                                size="sm"
                                variant="outline"
                                className="justify-start"
                                onClick={() =>
                                  setSelectedId([
                                    announcement.announcementId.toString(),
                                  ])
                                }
                              >
                                <Trash2 /> Delete
                              </Button>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
