"use client";

import { useState } from "react";
import { deleteTask as deleteTaskFromDb } from "@/lib/tasks";
import { useToast } from "@/hooks/use-toast";

export function useTaskDelete(goalId: string) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const deleteTask = async (taskId: string) => {
    setIsDeleting(true);
    try {
      await deleteTaskFromDb(goalId, taskId);
      toast({
        title: "Task deleted",
        description: "The task has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteTask, isDeleting };
}