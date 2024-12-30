"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Brain } from "lucide-react";
import Link from "next/link";

export function HomeHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-semibold">Scofield</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}