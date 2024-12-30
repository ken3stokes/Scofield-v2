"use client";

import { useToastContext } from "@/components/ui/toast/toast-context";
import type { Toast } from "@/components/ui/toast/types";

export function useToast() {
  const { addToast } = useToastContext();

  return {
    toast: (props: Omit<Toast, "id">) => addToast(props),
  };
}