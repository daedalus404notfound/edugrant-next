import { Button } from "@/components/ui/button";
import { getFamilyBackgroundProgress } from "@/lib/isFamilyComplete";
import { useUserStore } from "@/store/useUserStore";
import { UserRoundCog } from "lucide-react";
import Link from "next/link";

export default function ProfileProgress() {
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

  return (
    <div className="hidden lg:block rounded-xl p-6 bg-gradient-to-br from-card/90 to-background/70 backdrop-blur-md shadow-md  transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold flex gap-2 items-center">
            <UserRoundCog size={18} /> Complete your profile
          </h3>
          <p className="text-sm text-muted-foreground">
            Complete your profile to unlock scholarships.
          </p>
        </div>
        <Link href={"/user/home/profile"}>
          <Button variant="secondary">View Details</Button>
        </Link>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Progress</span>
          <span className="text-sm">{percentage}%</span>
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
    </div>
  );
}
