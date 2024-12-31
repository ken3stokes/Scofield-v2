"use client";

import { db, Task } from './db';

export async function createTask(goalId: string, taskData: Omit<Task, 'id' | 'goalId'>): Promise<void> {
  const taskId = crypto.randomUUID();

  const newTask: Task = {
    id: taskId,
    goalId,
    ...taskData
  };

  await db.tasks.add(newTask);
}

export async function updateTask(goalId: string, taskId: string, updates: Partial<Task>): Promise<void> {
  await db.tasks.update(taskId, {
    ...updates,
    goalId // Ensure goalId doesn't change
  });
}

export async function deleteTask(goalId: string, taskId: string): Promise<void> {
  await db.tasks.delete(taskId);
}

export async function getTasksByGoal(goalId: string): Promise<Task[]> {
  return await db.tasks.where('goalId').equals(goalId).toArray();
}

export async function getTaskById(taskId: string): Promise<Task | undefined> {
  return await db.tasks.get(taskId);
}