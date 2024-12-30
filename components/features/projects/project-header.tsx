"use client";

import { ProjectForm } from './project-form';

export function ProjectHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Projects</h1>
        <p className="text-muted-foreground">
          Manage and track your projects effectively
        </p>
      </div>
      <ProjectForm />
    </div>
  );
}