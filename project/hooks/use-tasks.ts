"use client";

import { useState } from 'react';
import { Task } from '@/lib/db';
import { createTask, updateTask, deleteTask } from '@/lib/tasks';
import { useToast } from './use-toast';

export function useTasks(goalId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'goalId'>) => {
    setIsLoading(true);
    try {
      await createTask(goalId, taskData);
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create task",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    setIsLoading(true);
    try {
      await updateTask(goalId, taskId, updates);
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update task",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    setIsLoading(true);
    try {
      await deleteTask(goalId, taskId);
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete task",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
  };
}