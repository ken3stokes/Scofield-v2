"use client";

import { Button } from '@/components/ui/button';
import { Play, CheckCircle, XCircle } from 'lucide-react';
import { db, Goal } from '@/lib/db';

interface GoalStatusProps {
  goal: Goal;
}

export function GoalStatus({ goal }: GoalStatusProps) {
  const updateStatus = async (newStatus: Goal['status']) => {
    await db.goals.update(goal.id, { status: newStatus });
  };

  const getStatusConfig = () => {
    switch (goal.status) {
      case 'not-started':
        return {
          label: 'Not Started',
          icon: XCircle,
          action: () => updateStatus('in-progress'),
          actionLabel: 'Start Goal',
          variant: 'outline' as const,
        };
      case 'in-progress':
        return {
          label: 'In Progress',
          icon: Play,
          action: () => updateStatus('completed'),
          actionLabel: 'Complete Goal',
          variant: 'default' as const,
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle,
          action: () => updateStatus('in-progress'),
          actionLabel: 'Reopen Goal',
          variant: 'secondary' as const,
        };
      default:
        return null;
    }
  };

  const config = getStatusConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-sm">
        <Icon className="h-4 w-4" />
        <span>{config.label}</span>
      </div>
      <Button
        variant={config.variant}
        size="sm"
        onClick={config.action}
      >
        {config.actionLabel}
      </Button>
    </div>
  );
}