"use client";

import { Goal } from "@/lib/db";
import { eachDayOfInterval, format, isBefore, isAfter, parseISO } from "date-fns";

export function useTimelineData(goals: Goal[]) {
  if (!goals.length) return null;

  // Sort goals by timebound date
  const sortedGoals = [...goals].sort((a, b) => 
    new Date(a.timebound).getTime() - new Date(b.timebound).getTime()
  );

  // Find date range
  const startDate = new Date(sortedGoals[0].timebound);
  const endDate = new Date(sortedGoals[sortedGoals.length - 1].timebound);

  // Generate all dates in range
  const dates = eachDayOfInterval({ start: startDate, end: endDate });

  // Calculate cumulative goals for each date
  const data = dates.map(date => {
    const goalsUpToDate = sortedGoals.filter(goal => 
      isBefore(new Date(goal.timebound), date) || 
      date.getTime() === new Date(goal.timebound).getTime()
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
        label: "Cumulative Goals",
        data: data.map(d => d.y),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };
}