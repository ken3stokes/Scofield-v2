"use client";

import * as React from "react";
import { ToastContext } from "./toast-context";
import { Toaster } from "./toaster";
import type { Toast } from "./types";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
    setToasts((prev) => [
      ...prev,
      { ...toast, id: Math.random().toString(36).slice(2) },
    ]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const updateToast = React.useCallback((id: string, toast: Partial<Toast>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...toast } : t))
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}