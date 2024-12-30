"use client";

import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/layout/sidebar';
import { ToastProvider } from '@/components/ui/toast/toast-provider';
import { DatabaseProvider } from '@/components/database-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ToastProvider>
        <DatabaseProvider>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </DatabaseProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
