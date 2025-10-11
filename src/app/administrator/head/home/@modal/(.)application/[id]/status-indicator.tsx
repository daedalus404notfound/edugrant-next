import { Check, X, Ban, MessageSquare } from "lucide-react";

interface StatusAlertProps {
  status: "APPROVED" | "DECLINED" | "BLOCKED" | "INTERVIEW";
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
      icon: <Check className="opacity-80" size={16} />,
      bgColor: "dark:bg-green-900 bg-green-200",
      bgColorIcon: "dark:bg-green-950 bg-green-300",
    },
    DECLINED: {
      icon: <X className="opacity-80" size={16} />,
      bgColor: "dark:bg-red-900 bg-red-200",
      bgColorIcon: "dark:bg-red-950 bg-red-300",
    },
    BLOCKED: {
      icon: <Ban className="opacity-80" size={16} />,
      bgColor: "dark:bg-gray-900 bg-gray-200",
      bgColorIcon: "dark:bg-gray-950 bg-gray-300",
    },
    INTERVIEW: {
      icon: <MessageSquare className="opacity-80" size={16} />,
      bgColor: "dark:bg-indigo-900 bg-indigo-200",
      bgColorIcon: "dark:bg-indigo-950 bg-indigo-300",
    },
  }[status];

  return (
    <div
      className={`${statusConfig.bgColor} text-foreground px-4 py-3 rounded-md`}
    >
      <div className="flex grow gap-3 md:items-center">
        <div
          className={`${statusConfig.bgColorIcon} flex size-9 shrink-0 items-center justify-center rounded-full max-md:mt-0.5`}
          aria-hidden="true"
        >
          {statusConfig.icon}
        </div>
        <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{title}</p>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
