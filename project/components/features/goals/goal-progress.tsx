"use client";

import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle } from 'lucide-react';
import { db } from '@/lib/db';

interface GoalProgressProps {
  goalId: string;
  progress: number;
}

export function GoalProgress({ goalId, progress }: GoalProgressProps) {
  const updateProgress = async (increment: boolean) => {
    const newProgress = increment 
      ? Math.min(progress + 10, 100)
      : Math.max(progress - 10, 0);
      
    await db.goals.update(goalId, { 
      progress: newProgress,
      status: newProgress === 100 ? 'completed' : newProgress > 0 ? 'in-progress' : 'not-started'
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {progress === 0 ? "Not Started" : `${progress}%`}
        </span>
        <div className="space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateProgress(false)}
            disabled={progress === 0}
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateProgress(true)}
            disabled={progress === 100}
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Progress value={progress} />
    </div>
  );
}