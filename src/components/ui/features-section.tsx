import { Cpu, Lock, Sparkles, Zap } from "lucide-react";
import imagee from "@/assets/zzzzz.png";

export function FeaturesSection() {
  return (
    <section className="overflow-hidden py-16 lg:py-20">
      <div className="mx-auto w-full lg:space-y-8 space-y-4 lg:px-6 md:space-y-12">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-semibold lg:text-5xl">Features</h2>
          <p className="mt-6 text-lg">
            Edugrant provides a straightforward and secure way for students to
            submit applications and check their status at any time.
          </p>
        </div>
        <div className="relative -mx-4 rounded-3xl p-3 md:-mx-12 lg:col-span-3"></div>
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4" />
              <h3 className="text-sm font-medium">Fast Application</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Submit your scholarship application online in just a few minutes
              without paperwork.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="size-4" />
              <h3 className="text-sm font-medium">Smart Tracking</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Monitor your application status and receive real-time updates on
              your progress.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="size-4" />
              <h3 className="text-sm font-medium">Secure Data</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              All your personal information is safely encrypted and kept
              private.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4" />
              <h3 className="text-sm font-medium">Student Friendly</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Designed with students in mind — simple, clear, and easy to use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
