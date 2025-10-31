"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AnnouncementSkeleton() {
  // Random width between 50 to 90% for more natural-looking skeletons
  const randomWidth = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  const randomWidth2 = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div className="w-full">
      {/* Header Info Grid Skeleton */}
      <div className="grid grid-cols-4 gap-4 md:gap-8 py-4 md:py-6 px-4 md:px-6 bg-card/50">
        {/* Title and Tags Section */}
        <div className="col-span-2 space-y-3">
          <Skeleton className="h-7 w-3/4 rounded-md" />

          <div className="flex gap-2 flex-wrap">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>

        {/* Published Date Section */}
        <div className="space-y-1.5 pl-4 border-l border-border">
          <div className="flex items-center gap-2">
            <Skeleton className="w-3.5 h-3.5 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>

        {/* Published Time Section */}
        <div className="space-y-1.5 pl-4 border-l border-border">
          <div className="flex items-center gap-2">
            <Skeleton className="w-3.5 h-3.5 rounded-md" />
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>

      {/* Content Area Skeleton */}
      <div className="space-y-4 p-4 md:p-6 bg-background rounded-t-md">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton
          className="h-4 rounded-md"
          style={
            {
              "--skeleton-width": randomWidth,
            } as React.CSSProperties
          }
        />

        <div className="mt-6 space-y-4">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton
            className="h-4 rounded-md"
            style={
              {
                "--skeleton-width": randomWidth2,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      {/* Bottom Action Buttons Skeleton */}
      <div className="flex gap-3 p-4 sticky bottom-0 bg-card rounded-t-md border-t border-border">
        <Skeleton className="flex-1 h-10 rounded-md" />
        <Skeleton className="flex-1 h-10 rounded-md" />
      </div>
    </div>
  );
}
