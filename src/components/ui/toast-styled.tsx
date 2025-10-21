import { CircleCheck, LoaderCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

interface StyledToastProps {
  status: "success" | "error" | "checking";
  title: string;
  description: string;
  duration?: number;
  persistent?: boolean;
}

export default function StyledToast({
  status,
  title,
  description,
  duration,
  persistent = false,
}: StyledToastProps) {
  const toastDuration = persistent ? Infinity : duration;

  if (status === "success") {
    toast.custom(
      () => (
        <div className="flex items-center gap-4 p-4 border border-green-800 bg-green-900 text-white rounded-md shadow-md lg:w-sm w-full ">
          <CircleCheck className="text-green-300 size-6" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm">{title}</span>
            <span className="text-xs text-green-100">{description}</span>
          </div>
        </div>
      ),
      {
        duration: toastDuration,
      }
    );
  }

  if (status === "error") {
    toast.custom(
      () => (
        <div className="flex items-center gap-4 p-4 border border-red-800 bg-red-900 text-white rounded-md shadow-md lg:w-sm w-full ">
          <XCircle className="text-red-300 size-6" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm">{title}</span>
            <span className="text-xs text-red-100">{description}</span>
          </div>
        </div>
      ),
      {
        duration: toastDuration,
      }
    );
  }

  if (status === "checking") {
    toast.custom(
      () => (
        <div className="flex items-center gap-4 p-4 border  bg-card text-foreground rounded-md shadow-md lg:w-sm w-full ">
          <LoaderCircle className="animate-spin text-green-600 size-8" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-sm">{title}</span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </div>
        </div>
      ),
      {
        duration: toastDuration,
      }
    );
  }
}

// Usage examples:
// StyledToast({ status: "success", title: "Success!", description: "Operation completed" });
// StyledToast({ status: "error", title: "Error", description: "Something went wrong", persistent: true });
// StyledToast({ status: "checking", title: "Loading", description: "Please wait...", duration: 5000 });
