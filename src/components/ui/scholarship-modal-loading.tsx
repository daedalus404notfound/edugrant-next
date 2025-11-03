import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function ScholarshipModalLoading() {
  return (
    <ScrollArea className="lg:h-[80dvh] h-[70dvh]  bg-background rounded-t-lg">
      {/* Cover Image Skeleton */}
      <div className="relative flex justify-center items-center">
        <Skeleton className="w-full lg:aspect-[16/4] aspect-[16/7] rounded-t-lg" />
      </div>

      {/* Header Section Skeleton */}
      <div className="bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-b-lg">
        <div className="relative flex lg:items-end items-center lg:py-8 py-4 lg:px-4 px-2">
          {/* Avatar Skeleton */}
          <div className="flex items-end justify-center">
            <Skeleton className="lg:size-25 size-20 rounded-full" />
          </div>

          {/* Title and Badge Section */}
          <div className="flex-1 px-4 py-2 z-10 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-48 lg:w-64" />
              <div className="space-x-1.5 lg:flex hidden gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-3 bg-card relative p-4 lg:p-6 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`space-y-2 ${i === 3 ? "hidden lg:block" : ""}`}
            >
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 pt-10 lg:px-6 px-2 space-y-8 pb-10">
        {/* About Section */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Full Scholarship Details Section */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />

          {/* Details Cards Grid */}
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-card p-4 rounded-md flex items-center gap-4 shadow-sm"
              >
                <Skeleton className="size-12 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            ))}
          </div>

          {/* Documents Section */}
          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-6 w-8" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />

            {/* Document List */}
            <div className="divide-y space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center py-4">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-6 w-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Countdown Section */}
          <div className="lg:p-4 p-2 bg-card rounded-md mt-6">
            <Skeleton className="h-5 w-32 mx-auto mb-4" />
            <div className="space-y-2">
              <div className="flex justify-around">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center space-y-2">
                    <Skeleton className="h-8 w-12 mx-auto" />
                    <Skeleton className="h-3 w-8 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ScrollBar orientation="vertical" className="z-30" />
    </ScrollArea>
  );
}
