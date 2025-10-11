import { ArrowRightIcon, Lock } from "lucide-react";
import Link from "next/link";

export default function CompleteChecker() {
  return (
    <div className=" text-foreground px-4 py-3 rounded-md dark:bg-red-950 bg-red-200 lg:dark mb-8">
      <div className="flex flex-col justify-between gap-2 md:flex-row ">
        <div className="flex grow gap-3">
          <Lock
            className="mt-0.5 shrink-0 opacity-60 h-4 w-4"
            aria-hidden="true"
          />
          <div className="flex grow flex-col justify-between gap-2 md:flex-row md:items-center">
            <p className="text-sm font-medium">
              Complete profile details first to access apply scholarship feature
            </p>
            <Link
              className="group text-sm font-medium whitespace-nowrap"
              href={"/user/home/profile"}
            >
              View Profile
              <ArrowRightIcon
                className="ms-1 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
