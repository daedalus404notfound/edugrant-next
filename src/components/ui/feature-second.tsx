import { GlobeLock, Zap, Map, Sparkles } from "lucide-react";
import SpotlightBorderWrapper from "./border";

const AppSection = () => {
  const featuresData = [
    {
      icon: Zap,
      title: "Fast Application",
      description:
        "Submit your scholarship application online in just a few minutes without paperwork.",
    },
    {
      icon: Map,
      title: "Smart Tracking",
      description:
        "  Monitor your application status and receive real-time updates on your progress.",
    },
    {
      icon: GlobeLock,
      title: "Secure Data",
      description:
        " All your personal information is safely encrypted and kept private.",
    },
  ];

  return (
    <section className="w-full py-25 lg:px-6 space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <h2 className="lg:text-3xl text-xl font-semibold flex gap-3 items-center">
          Features <Sparkles className="h-4 w-4 lg:h-6 lg:w-6" />
        </h2>
        <p className="mt-2 lg:text-base text-sm text-muted-foreground max-w-3xl ">
          Edugrant provides a straightforward and secure way for students to
          submit applications and check their status at any time.
        </p>
      </div>

      {/* Cards */}
      <div className="flex items-center flex-col lg:flex-row gap-3 justify-between ">
        {featuresData.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <SpotlightBorderWrapper key={index}>
              <div
                className={`hover:-translate-y-0.5 transition duration-300 ${
                  index === 1
                    ? "p-px rounded-[11px] dark:bg-gradient-to-br dark:from-[#2e5e367b] dark:to-[#1a2f1b8c]"
                    : ""
                }`}
              >
                <div
                  className="lg:p-8 p-4 rounded-lg space-y-4
                            border shadow-sm dark:border-green-800/20
                            dark:bg-green-950/20
                         
                            w-full max-w-sm"
                >
                  <Icon className="h-4 w-4 lg:h-8 lg:w-8" />
                  <h3 className="text-base font-medium">{feature.title}</h3>
                  <p className="lg:line-clamp-2 pb-4 text-sm lg:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </SpotlightBorderWrapper>
          );
        })}
      </div>
    </section>
  );
};

export default AppSection;
