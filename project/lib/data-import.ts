import { db } from './db';

interface ImportData {
  version: number;
  timestamp: string;
  goals: any[];
  tasks: any[];
}

export async function importData(file: File): Promise<void> {
  try {
    const text = await file.text();
    const data: ImportData = JSON.parse(text);

    // Validate data structure
    if (!data.version || !Array.isArray(data.goals) || !Array.isArray(data.tasks)) {
      throw new Error('Invalid backup file format');
    }

    // Clear existing data
    await db.goals.clear();
    await db.tasks.clear();

    // Import goals
    await db.goals.bulkAdd(data.goals);
    
    // Import tasks
    await db.tasks.bulkAdd(data.tasks);

  } catch (error) {
    throw new Error('Failed to import data: ' + (error as Error).message);
  }
}