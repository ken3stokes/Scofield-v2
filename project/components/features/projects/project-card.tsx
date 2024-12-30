"use client";

import { Project, Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderKanban, Calendar, Target } from 'lucide-react';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  goals: Goal[];
}

export function ProjectCard({ project, goals = [] }: ProjectCardProps) {
  const linkedGoals = goals.filter(goal => project.goals?.includes(goal.id)) || [];

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <FolderKanban className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-medium">{project.title}</h3>
        </div>
        <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
          {project.status}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {project.description}
      </p>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Due {format(new Date(project.dueDate), 'MMM d, yyyy')}</span>
        </div>
        {linkedGoals.length > 0 && (
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {linkedGoals.map(goal => (
                <Badge key={goal.id} variant="outline" className="text-xs">
                  {goal.title}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}