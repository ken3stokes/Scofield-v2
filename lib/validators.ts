"use client";

import { isAfter, isValid } from 'date-fns';

export function validateTaskDueDate(taskDueDate: Date, goalDueDate: Date): boolean {
  if (!isValid(taskDueDate) || !isValid(goalDueDate)) return false;
  return !isAfter(taskDueDate, goalDueDate);
}

export function getMaxTaskDueDate(goalDueDate: Date): Date | null {
  if (!isValid(goalDueDate)) return null;
  return new Date(goalDueDate);
}