import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileCompletion({ loading }: { loading: boolean }) {
  const completionPercentage = 75;
  const tasks = [
    { label: "Basic Information", completed: true },
    { label: "Academic Records", completed: true },
    { label: "Family Composition", completed: false },
  ];

  return loading ? (
    <div className="p-6 flex flex-col bg-gradient-to-br to-card from-card/50 rounded-lg">
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
    <div className="p-6 flex flex-col  bg-gradient-to-br to-card from-card/50 rounded-lg">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Profile Completion
        </h3>
        <p className="text-sm text-muted-foreground">
          Complete your profile to unlock more opportunities
        </p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-foreground">
            {completionPercentage}%
          </span>
          <span className="text-xs text-muted-foreground">Almost there!</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
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
        Complete Profile
      </Button>
    </div>
  );
}
