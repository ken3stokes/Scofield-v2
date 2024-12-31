"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { GoalsHeader } from '@/components/features/goals/header';
import { SearchBar } from '@/components/features/goals/search-bar';
import { GridView } from '@/components/features/goals/views/grid-view';
import { ListView } from '@/components/features/goals/views/list-view';
import { useGoalsView } from '@/lib/hooks/use-goals-view';

export default function GoalsPage() {
  // Fetch goals and their tasks
  const goals = useLiveQuery(async () => {
    const allGoals = await db.goals.toArray();
    const goalsWithTasks = await Promise.all(
      allGoals.map(async (goal) => {
        const tasks = await db.tasks.where('goalId').equals(goal.id).toArray();
        return { ...goal, tasks };
      })
    );
    return goalsWithTasks;
  });

  const {
    view,
    sort,
    search,
    filteredGoals,
    setView,
    setSort,
    setSearch,
  } = useGoalsView(goals || []);

  if (!goals) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <p className="text-muted-foreground">Loading goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <GoalsHeader
        view={view}
        sort={sort}
        onViewChange={setView}
        onSortChange={setSort}
      />
      
      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {view === 'grid' ? (
        <GridView goals={filteredGoals} />
      ) : (
        <ListView goals={filteredGoals} />
      )}
    </div>
  );
}