import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import useAuthenticatedUser from "@/hooks/user/getTokenAuthentication";

export function ProfileCompletion({ loading }: { loading: boolean }) {
  const { data } = useAuthenticatedUser();

  const { percentage, completed } = getFamilyBackgroundProgress(
    data?.userData.Student
  );
  const getProgressBarColor = (percentage: number) => {
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-800";
  };

  const getProgressContainerColor = (percentage: number) => {
    if (percentage < 30) return "bg-red-500/20";
    if (percentage < 70) return "bg-yellow-500/20";
    return "bg-green-800/20";
  };

  const getProgressText = (percentage: number) => {
    if (percentage < 30) return "Just getting started!";
    if (percentage < 70) return "You're making great progress!";
    if (percentage < 100) return "Almost there!";
    return "Completed!";
  };

  // const completionPercentage = 75;
  // const tasks = [
  //   { label: "Basic Information", completed: true },
  //   { label: "Academic Details", completed: true },
  //   { label: "Family Composition", completed: completed },
  // ];

  return (
    <div className="p-5 flex flex-col  bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-lg space-y-6">
      <div className="">
        <h3 className="lg:text-lg font-semibold text-foreground ">
          Profile Completion
        </h3>
        <p className="lg:text-sm text-xs text-muted-foreground">
          Complete your profile to unlock scholarship application.
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between ">
          <span className="lg:text-2xl text-xl font-bold text-foreground">
            {percentage}%
          </span>
          <span className="text-xs text-muted-foreground">
            {getProgressText(percentage)}
          </span>
        </div>
        <div
          className={`w-full ${getProgressContainerColor(
            percentage
          )} rounded-full h-2`}
        >
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
              percentage
            )}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      {/* <div className="space-y-3 mb-4 flex-1">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center gap-3">
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
            <span
              className={`text-sm ${
                task.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {task.label}
            </span>
          </div>
        ))}
      </div> */}

      {!completed && (
        <Link href="/user/home/profile" prefetch scroll={false}>
          <Button className="w-full" disabled={loading}>
            Complete Profile <ArrowRight />
          </Button>
        </Link>
      )}
    </div>
  );
}
