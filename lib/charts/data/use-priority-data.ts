"use client";

import { Goal } from '@/lib/db';
import { priorityChartColors } from '../config/priority-chart';

export function usePriorityData(goals: Goal[]) {
  const priorityCounts = {
    urgent: goals.filter(goal => goal.priority === 'urgent').length,
    high: goals.filter(goal => goal.priority === 'high').length,
    medium: goals.filter(goal => goal.priority === 'medium').length,
    low: goals.filter(goal => goal.priority === 'low').length,
  };

  const data = {
    labels: ['Urgent', 'High', 'Medium', 'Low'],
    datasets: [{
      data: [
        priorityCounts.urgent,
        priorityCounts.high,
        priorityCounts.medium,
        priorityCounts.low,
      ],
      backgroundColor: [
        priorityChartColors.urgent,
        priorityChartColors.high,
        priorityChartColors.medium,
        priorityChartColors.low,
      ],
      borderWidth: 0,
    }],
  };

  // Only return data if there are actual goals
  const totalGoals = Object.values(priorityCounts).reduce((a, b) => a + b, 0);
  return totalGoals > 0 ? data : { labels: [], datasets: [{ data: [], backgroundColor: [], borderWidth: 0 }] };
}