import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutTemplate, Sparkles } from "lucide-react";
import logo from "@/assets/edugrant-logo.png";
export default function WelcomeCard() {
  return (
    <div className="relative overflow-hidden flex flex-col justify-between gap-4 h-70 bg-gradient-to-br to-card from-card/50 p-6 rounded-lg">
      <img
        className="absolute object-contain shadow -right-8 h-full -bottom-15 opacity-20"
        src={logo.src}
        alt=""
      />

      <div>
        <div className="flex items-center gap-2 mb-2">
          <LayoutTemplate className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-primary jakarta">
            Welcome back
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance jakarta">
          Ready to find a scholarship?
        </h2>

        <p className="text-muted-foreground text-balance ">
          You currently have <strong>0</strong> applications in progress and{" "}
          <strong>2</strong> pending applications awaiting review.
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
