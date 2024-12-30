"use client";

export function getChartColors(isDark: boolean) {
  return {
    text: isDark ? "rgb(241, 245, 249)" : "rgb(15, 23, 42)",
    grid: isDark ? "rgba(241, 245, 249, 0.1)" : "rgba(15, 23, 42, 0.1)",
    primary: isDark ? "hsl(var(--primary))" : "rgb(59, 130, 246)",
    primaryAlpha: isDark ? "hsl(var(--primary) / 0.1)" : "rgba(59, 130, 246, 0.1)",
  };
}