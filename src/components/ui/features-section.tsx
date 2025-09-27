import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import imagee from "@/assets/zzzzz.png";
export function FeaturesSection() {
  return (
    <section className="overflow-hidden py-16 lg:py-20">
      <div className="mx-auto w-full space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-semibold lg:text-5xl">Features</h2>
          <p className="mt-6 text-lg">
            Empower your team with workflows that adapt to your needs, whether
            you prefer git synchronization or a AI Agents interface.
          </p>
        </div>
        <div className="relative -mx-4 rounded-3xl p-3 md:-mx-12 lg:col-span-3"></div>
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Faaast</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              It supports an entire helping developers and innovate.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4" />
              <h3 className="text-sm font-medium">Powerful</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              It supports an entire helping developers and businesses.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="size-4" />
              <h3 className="text-sm font-medium">Security</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              It supports an helping developers businesses innovate.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />

              <h3 className="text-sm font-medium">AI Powered</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              It supports an helping developers businesses innovate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
