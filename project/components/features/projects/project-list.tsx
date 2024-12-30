"use client";

import { Project, Goal } from '@/lib/db';
import { ProjectCard } from './project-card';

interface ProjectListProps {
  projects: Project[];
  goals: Goal[];
}

export function ProjectList({ projects = [], goals = [] }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center p-12 bg-card rounded-lg">
        <p className="text-muted-foreground">No projects yet. Create your first project to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} goals={goals} />
      ))}
    </div>
  );
}