import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";

interface DeleteDialogProps {
  red?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  confirmText?: string;
  confirmTextLoading?: string;
  cancelText?: string;
}

export function DeleteDialog({
  red = true,
  open,
  onOpenChange,
  onConfirm,
  loading = false,
  title = "Delete item?",
  description = "This action cannot be undone. The item will be permanently removed from the system.",
  trigger,
  confirmText = "Delete",
  confirmTextLoading = "Deleting...",
  cancelText = "Cancel",
}: DeleteDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>} */}
      {trigger && trigger}
      <DialogContent
        className="max-w-lg p-6 bg-gradient-to-bl to-card from-card border-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className={red ? "text-red-600" : "text-green-600"}>
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant={red ? "destructive" : "default"}
            disabled={loading}
            onClick={handleConfirm}
            type="submit"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                {confirmTextLoading}
                <Loader className="animate-spin" />
              </span>
            ) : (
              confirmText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Default trigger component
export function DeleteTrigger({
  children,
  size = "sm",
  variant = "ghost",
  className = "bg-red-700/20 text-red-600 hover:bg-red-700/30",
}: {
  children?: React.ReactNode;
  size?: "sm" | "default" | "lg";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
}) {
  return (
    <Button size={size} variant={variant} className={className}>
      {children || <Trash2 />}
    </Button>
  );
}
