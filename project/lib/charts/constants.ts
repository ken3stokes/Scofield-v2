"use client";

export const CHART_CATEGORIES = [
  "Career",
  "Education", 
  "Health",
  "Financial",
  "Business",
  "Hobbies",
  "Security"
] as const;

export const CHART_COLORS = {
  light: [
    "rgb(59, 130, 246, 0.7)",  // blue
    "rgb(16, 185, 129, 0.7)",  // green
    "rgb(245, 158, 11, 0.7)",  // yellow
    "rgb(99, 102, 241, 0.7)",  // indigo
    "rgb(236, 72, 153, 0.7)",  // pink
    "rgb(139, 92, 246, 0.7)",  // purple
    "rgb(75, 85, 99, 0.7)",    // gray
  ],
  dark: [
    "hsl(var(--primary) / 0.7)",
    "hsl(var(--success) / 0.7)",
    "hsl(var(--warning) / 0.7)",
    "hsl(var(--info) / 0.7)",
    "hsl(var(--destructive) / 0.7)",
    "hsl(var(--secondary) / 0.7)",
    "hsl(var(--muted) / 0.7)",
  ]
};