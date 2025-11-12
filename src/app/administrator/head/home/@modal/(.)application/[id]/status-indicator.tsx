import TitleReusable from "@/components/ui/title";
import { Check, X, Ban, MessageSquare } from "lucide-react";

interface StatusAlertProps {
  status: "APPROVED" | "DECLINED" | "BLOCKED" | "INTERVIEW" | "PENDING";
  title: string;
  description: string;
}

export const StatusAlertIndicator = ({
  status,
  title,
  description,
}: StatusAlertProps) => {
  const statusConfig = {
    APPROVED: {
      icon: <Check className="opacity-80 size-4" />,
      color: "text-green-700/70",
      bgColorIcon: "dark:bg-green-800 bg-green-300",
    },
    DECLINED: {
      icon: <X className="opacity-80 size-4" />,
      color: "text-red-700/70",
      bgColorIcon: "dark:bg-red-800 bg-red-300",
    },
    BLOCKED: {
      icon: <Ban className="opacity-80 size-4" />,
      color: "text-gray-700/70",
      bgColorIcon: "dark:bg-gray-800 bg-gray-300",
    },
    INTERVIEW: {
      icon: <MessageSquare className="opacity-80 size-4" />,
      color: "text-blue-700/70",
      bgColorIcon: "dark:bg-blue-800 bg-blue-300",
    },
    PENDING: {
      icon: <MessageSquare className="opacity-80 size-4" />,
      color: "text-yellow-700/70",
      bgColorIcon: "dark:bg-yellow-800 bg-yellow-300",
    },
  }[status];

  return (
    <div className="lg:p-4 p-2 bg-background rounded-t-md">
      <div className="flex grow gap-3 md:items-center">
        <div
          className={`${statusConfig.bgColorIcon} flex size-9 shrink-0 items-center justify-center rounded-md max-md:mt-0.5`}
          aria-hidden="true"
        >
          {statusConfig.icon}
        </div>

        <TitleReusable
          title={title}
          description={description}
          textColor={statusConfig.color}
          titleSize="lg:text-base text-sm"
        />
      </div>
    </div>
  );
};
