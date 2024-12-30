export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  variant?: "default" | "destructive";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}