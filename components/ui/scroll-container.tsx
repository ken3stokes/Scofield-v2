"use client";

import { cn } from "@/lib/utils";

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollContainer({ children, className }: ScrollContainerProps) {
  return (
    <div className={cn(
      "h-full overflow-y-auto custom-scrollbar",
      className
    )}>
      {children}
    </div>
  );
}