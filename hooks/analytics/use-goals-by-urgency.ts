"use client";

import { Goal } from "@/lib/db";

export function useGoalsByUrgencyData(goals: Goal[]) {
  const urgencyCount = {
    urgent: goals.filter(goal => goal.priority === 'urgent').length,
    high: goals.filter(goal => goal.priority === 'high').length,
    medium: goals.filter(goal => goal.priority === 'medium').length,
    low: goals.filter(goal => goal.priority === 'low').length,
  };

  return {
    labels: ['Urgent', 'High', 'Medium', 'Low'],
    datasets: [{
      data: [
        urgencyCount.urgent,
        urgencyCount.high,
        urgencyCount.medium,
        urgencyCount.low,
      ],
      backgroundColor: [
        'rgb(239, 68, 68)', // red-500
        'rgb(249, 115, 22)', // orange-500
        'rgb(234, 179, 8)', // yellow-500
        'rgb(34, 197, 94)', // green-500
      ],
    }],
  };
}