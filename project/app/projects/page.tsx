"use client";

import { useDatabase } from '@/hooks/use-database';
import { ProjectList } from '@/components/features/projects/project-list';
import { ProjectHeader } from '@/components/features/projects/project-header';

export default function ProjectsPage() {
  const { data: projects = [], isLoading: projectsLoading } = useDatabase('projects');
  const { data: goals = [], isLoading: goalsLoading } = useDatabase('goals');

  const isLoading = projectsLoading || goalsLoading;

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <ProjectHeader />
      <ProjectList projects={projects} goals={goals} />
    </div>
  );
}