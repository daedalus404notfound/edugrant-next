import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function WelcomeCard() {
  return (
    <div className="flex flex-col justify-between gap-4 h-70 bg-gradient-to-br to-card from-background p-6 rounded-md">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Welcome back</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
          Ready to find your perfect scholarship?
        </h2>
        <p className="text-muted-foreground text-balance">
          You have 3 applications in progress and 12 new scholarships matching
          your profile.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button>
          Browse Scholarships
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline">Continue Applications</Button>
      </div>
    </div>
  );
}
