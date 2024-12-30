"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useToastContext } from "./toast-context";
import type { Toast as ToastType } from "./types";

export function Toast({
  id,
  title,
  description,
  action,
  variant = "default",
  duration = 5000,
  onOpenChange,
}: ToastType) {
  const { removeToast } = useToastContext();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
      onOpenChange?.(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onOpenChange, removeToast]);

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        variant === "default" && "bg-white border-gray-200",
        variant === "destructive" && "bg-red-600 border-red-600 text-white"
      )}
    >
      <div className="flex flex-col gap-1">
        {title && <div className="font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}