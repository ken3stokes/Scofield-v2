"use client";

import Dexie, { Table } from 'dexie';

export type GoalPriority = 'urgent' | 'high' | 'medium' | 'low';
export type GoalCategory = 'career' | 'education' | 'health' | 'financial' | 'business' | 'hobbies' | 'security';
export type GoalStatus = 'not-started' | 'in-progress' | 'completed';

export interface Goal {
  id: string;
  title: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timebound: Date;
  priority: GoalPriority;
  category: GoalCategory;
  status: GoalStatus;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  goalId: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
}

class ScofieldDatabase extends Dexie {
  goals!: Table<Goal>;
  tasks!: Table<Task>;

  constructor() {
    super('ScofieldDB');

    // Delete and recreate the database if version changes
    const currentVersion = 4;
    const storedVersion = localStorage.getItem('ScofieldDBVersion');

    if (storedVersion !== currentVersion.toString()) {
      indexedDB.deleteDatabase('ScofieldDB');
      localStorage.setItem('ScofieldDBVersion', currentVersion.toString());
    }

    this.version(currentVersion).stores({
      goals: 'id, title, priority, category, status, progress, createdAt, updatedAt',
      tasks: 'id, goalId, status, priority, dueDate'
    });

    // Add hooks for task changes
    this.tasks.hook('creating', (primKey, obj) => {
      this.updateGoalProgressAsync(obj.goalId);
      return obj;
    });

    this.tasks.hook('updating', (mods, primKey, obj) => {
      if (obj) {
        this.updateGoalProgressAsync(obj.goalId);
      }
      return mods;
    });

    this.tasks.hook('deleting', (primKey, obj) => {
      if (obj) {
        this.updateGoalProgressAsync(obj.goalId);
      }
      return obj;
    });
  }

  // Helper function to update goal progress asynchronously
  private updateGoalProgressAsync(goalId: string) {
    setTimeout(async () => {
      try {
        await this.updateGoalProgress(goalId);
      } catch (error) {
        console.error('Error in async goal progress update:', error);
      }
    }, 0);
  }

  // Main function to update goal progress
  private async updateGoalProgress(goalId: string) {
    try {
      // Start a new transaction
      await this.transaction('rw', [this.goals, this.tasks], async () => {
        // Get tasks and calculate progress within transaction
        const tasks = await this.tasks.where('goalId').equals(goalId).toArray();
        const completedTasks = tasks.filter(t => t.status === 'completed').length;
        const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

        // Get the goal within transaction
        const goal = await this.goals.get(goalId);
        if (!goal) {
          console.error('Goal not found:', goalId);
          return;
        }

        // Update goal within transaction
        const status = progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';
        await this.goals.put({
          ...goal,
          progress,
          status,
          updatedAt: new Date()
        });
      });
    } catch (error) {
      console.error('Error updating goal progress:', error);
      // Retry once after a short delay if there's an error
      setTimeout(() => this.updateGoalProgressAsync(goalId), 1000);
    }
  }
}

export const db = new ScofieldDatabase();