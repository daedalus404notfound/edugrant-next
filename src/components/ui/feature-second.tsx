import { GlobeLock, Zap, Map } from "lucide-react";
import { Badge } from "./badge";

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
    <section className="w-full py-20 px-6 space-y-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold mt-4 text-slate-900 dark:text-white">
          Features
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-3xl ">
          Edugrant provides a straightforward and secure way for students to
          submit applications and check their status at any time.
        </p>
      </div>

      {/* Cards */}
      <div className="flex items-center justify-between ">
        {featuresData.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className={`hover:-translate-y-0.5 transition duration-300 ${
                index === 1
                  ? "p-px rounded-[11px] dark:bg-gradient-to-br dark:from-[#2e5e367b] dark:to-[#1a2f1b8c]"
                  : ""
              }`}
            >
              <div
                className="p-8 rounded-lg space-y-4
                            border shadow-sm dark:border-green-800/20
                            dark:bg-green-950/20
                         
                            w-full max-w-sm"
              >
                <Icon size={32} />
                <h3 className="text-base font-medium">{feature.title}</h3>
                <p className="line-clamp-2 pb-4">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AppSection;
