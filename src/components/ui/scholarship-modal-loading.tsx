import { Skeleton } from "./skeleton";

export default function ScholarshipModalLoading() {
  return (
    <div className="h-full w-full">
      <Skeleton className="flex-1 lg:aspect-[16/5] aspect-[16/9] w-full" />
      <div className="lg:space-y-15 space-y-10 lg:px-6 px-2 mt-5">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div className="space-y-3 col-span-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="flex-1 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
      <div className="p-4 sticky bottom-0 bg-background border-t ">
        <div className="flex gap-3">
          <Skeleton className="h-9 flex-1" />

          <Skeleton className="h-9 flex-1" />
        </div>
      </div>
    </div>
  );
}
