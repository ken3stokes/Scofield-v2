"use client";

import { Goal } from '@/lib/db';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskManagement } from '../tasks/task-management';
import { GoalProgress } from './goal-progress';
import { GoalActions } from './goal-actions';
import { GoalStatus } from './goal-status';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';

interface GoalDetailsDialogProps {
  goal: Goal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GoalDetailsDialog({ goal, open, onOpenChange }: GoalDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{goal.title}</DialogTitle>
            <GoalActions goal={goal} />
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due {format(new Date(goal.timebound), 'PPP')}</span>
            </div>
            <GoalStatus goal={goal} />
          </div>

          <GoalProgress goalId={goal.id} progress={goal.progress} />

          <TaskManagement 
            goalId={goal.id} 
            tasks={goal.tasks || []} 
            dueDate={new Date(goal.timebound)} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}