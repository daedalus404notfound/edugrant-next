import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  GraduationCap,
  LayoutTemplate,
  Map,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/edugrant-logo.png";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
export default function WelcomeCard({
  loading,
  pending,
  application,
}: {
  loading: boolean;
  pending: number;
  application: number;
}) {
  return (
    <div className="dark:border relative overflow-hidden flex flex-col justify-between gap-4 h-70  bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 p-6 rounded-lg">
      <img
        className="absolute object-contain shadow lg:-right-8 -right-20 lg:h-full h-3/4 lg:-bottom-15 -bottom-0 opacity-20"
        src={logo.src || "/placeholder.svg"}
        alt=""
      />

      {loading ? (
        <>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>

            <Skeleton className="h-8 w-3/4 mb-2" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-44" />
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary jakarta">
                Welcome back
              </span>
            </div>

            <h2 className="text-xl md:text-3xl font-bold text-foreground mb-2 text-balance jakarta">
              Ready to find a scholarship?
            </h2>

            <p className="text-muted-foreground text-balance text-sm lg:text-base">
              You currently have <strong>{application}</strong> applications in
              progress and <strong>{pending}</strong> pending applications
              awaiting review.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 z-10">
            <Link href={`/user/home/scholarships`} className="flex-1 md:flex-0">
              <Button className="w-full">
                Browse Scholarships
                <ArrowRight />
              </Button>
            </Link>
            <Link href={`/user/home/applications`} className="flex-1 md:flex-0">
              <Button className="w-full" variant="secondary">
                Track Applications <Map />
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
