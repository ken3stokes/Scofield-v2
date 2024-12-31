"use client";

import * as React from "react";
import { type ToastActionElement, type ToastProps } from "@/components/ui/toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
};

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type State = {
  toasts: ToasterToast[];
};

export function useToastStore() {
  const [state, setState] = React.useState<State>({ toasts: [] });

  const toast = React.useCallback(
    function ({ ...props }: Omit<ToasterToast, "id">) {
      const id = Math.random().toString(36).slice(2);
      const newToast: ToasterToast = {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss(id);
        },
      };

      setState((state) => ({
        ...state,
        toasts: [newToast, ...state.toasts].slice(0, TOAST_LIMIT),
      }));

      return {
        id,
        dismiss: () => dismiss(id),
        update: (props: ToasterToast) =>
          setState((state) => ({
            ...state,
            toasts: state.toasts.map((t) =>
              t.id === id ? { ...t, ...props } : t
            ),
          })),
      };
    },
    []
  );

  const dismiss = React.useCallback(function (toastId?: string) {
    setState((state) => ({
      ...state,
      toasts: state.toasts.map((t) =>
        t.id === toastId || toastId === undefined
          ? {
              ...t,
              open: false,
            }
          : t
      ),
    }));

    setTimeout(() => {
      setState((state) => ({
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      }));
    }, TOAST_REMOVE_DELAY);
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss,
  };
}