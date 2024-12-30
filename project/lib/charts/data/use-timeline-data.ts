"use client";

import { Goal } from "@/lib/db";
import { eachDayOfInterval, format, isBefore, startOfDay } from "date-fns";

export function useTimelineData(goals: Goal[]) {
  if (!goals.length) return null;

  // Sort goals by creation date
  const sortedGoals = [...goals].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Find date range
  const startDate = startOfDay(new Date(sortedGoals[0].createdAt));
  const endDate = startOfDay(new Date());

  // Generate all dates in range
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  // Calculate cumulative goals for each date
  const data = dates.map(date => {
    const goalsUpToDate = sortedGoals.filter(goal => 
      isBefore(new Date(goal.createdAt), date) || 
      startOfDay(new Date(goal.createdAt)).getTime() === date.getTime()
    ).length;

    return {
      x: format(date, 'MMM dd'),
      y: goalsUpToDate
    };
  });

  return {
    labels: data.map(d => d.x),
    datasets: [
      {
        label: "Total Goals",
        data: data.map(d => d.y),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };
}