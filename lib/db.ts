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
    
    this.version(2).stores({
      goals: 'id, title, priority, category, status, progress, createdAt, updatedAt',
      tasks: 'id, goalId, status, priority, dueDate'
    });

    // Add hooks to update goal progress when tasks change
    this.tasks.hook('creating', async (primKey, obj) => {
      try {
        await this.updateGoalProgress(obj.goalId);
      } catch (error) {
        console.error('Error in creating hook:', error);
      }
    });

    this.tasks.hook('updating', async (mods, primKey, obj) => {
      try {
        if (obj) {
          await this.updateGoalProgress(obj.goalId);
        }
      } catch (error) {
        console.error('Error in updating hook:', error);
      }
    });

    this.tasks.hook('deleting', async (primKey, obj) => {
      try {
        if (obj) {
          await this.updateGoalProgress(obj.goalId);
        }
      } catch (error) {
        console.error('Error in deleting hook:', error);
      }
    });
  }

  private async updateGoalProgress(goalId: string) {
    await this.transaction('rw', [this.tasks, this.goals], async () => {
      const tasks = await this.tasks.where('goalId').equals(goalId).toArray();
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
      
      await this.goals.update(goalId, {
        progress,
        status: progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started',
        updatedAt: new Date()
      });
    });
  }
}

export const db = new ScofieldDatabase();