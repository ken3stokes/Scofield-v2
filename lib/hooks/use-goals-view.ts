"use client";

import { useState, useCallback, useMemo } from 'react';
import { Goal } from '@/lib/db';

interface UseGoalsViewResult {
  view: "grid" | "list";
  sort: string;
  search: string;
  filteredGoals: Goal[];
  setView: (view: "grid" | "list") => void;
  setSort: (sort: string) => void;
  setSearch: (search: string) => void;
}

export function useGoalsView(goals: Goal[]): UseGoalsViewResult {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("dueDate-asc");
  const [search, setSearch] = useState("");

  const filteredGoals = useMemo(() => {
    let result = [...goals];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(goal => 
        goal.title.toLowerCase().includes(searchLower) ||
        goal.specific.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    const [field, direction] = sort.split('-');
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (field) {
        case 'priority':
          comparison = a.priority.localeCompare(b.priority);
          break;
        case 'dueDate':
          comparison = new Date(a.timebound).getTime() - new Date(b.timebound).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'progress':
          comparison = a.progress - b.progress;
          break;
        case 'status':
          const getStatusValue = (goal: Goal) => goal.progress === 100 ? 2 : goal.progress > 0 ? 1 : 0;
          comparison = getStatusValue(a) - getStatusValue(b);
          break;
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [goals, search, sort]);

  return {
    view,
    sort,
    search,
    filteredGoals,
    setView,
    setSort,
    setSearch,
  };
}