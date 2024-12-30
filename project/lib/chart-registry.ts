"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "chartjs-adapter-date-fns";

if (typeof window !== "undefined") {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
    ChartDataLabels
  );

  // Optimize chart rendering
  ChartJS.defaults.font.family = "Inter, sans-serif";
  ChartJS.defaults.color = "hsl(var(--foreground))";
  ChartJS.defaults.scale.grid.color = "hsl(var(--border))";
  ChartJS.defaults.animation = false;
  ChartJS.defaults.responsive = true;
  ChartJS.defaults.maintainAspectRatio = false;
}

export const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true,
      }
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      backgroundColor: 'hsl(var(--popover))',
      titleColor: 'hsl(var(--popover-foreground))',
      bodyColor: 'hsl(var(--popover-foreground))',
      borderColor: 'hsl(var(--border))',
      borderWidth: 1,
      padding: 8,
      cornerRadius: 4,
    },
  },
};