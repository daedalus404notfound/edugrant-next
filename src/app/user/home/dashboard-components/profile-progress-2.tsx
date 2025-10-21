import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
import { useUserStore } from "@/store/useUserStore";

export function ProfileCompletion({ loading }: { loading: boolean }) {
  const { user } = useUserStore();

  const { percentage, completed } = getFamilyBackgroundProgress(user?.Student);
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

  const completionPercentage = 75;
  const tasks = [
    { label: "Basic Information", completed: true },
    { label: "Academic Details", completed: true },
    { label: "Family Composition", completed: completed },
  ];

  return loading ? (
    <div className="p-6 flex flex-col  bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-lg">
      <div className="mb-4">
        <Skeleton className="h-6 w-40 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      <div className="space-y-3 mb-4 flex-1">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  ) : (
    <div className="p-6 flex flex-col   bg-gradient-to-br dark:to-card/90 to-card/70 dark:from-card/50 from-card/30 rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Profile Completion
        </h3>
        <p className="text-sm text-muted-foreground">
          Complete your profile to unlock scholarship application.
        </p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-foreground">
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

      <div className="space-y-3 mb-4 flex-1">
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
      </div>

      <Button variant="outline" className="w-full bg-transparent">
        Complete Profile <ArrowRight />
      </Button>
    </div>
  );
}
