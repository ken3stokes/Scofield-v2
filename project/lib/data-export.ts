import { db } from './db';

export async function exportData() {
  const goals = await db.goals.toArray();
  const tasks = await db.tasks.toArray();

  const exportData = {
    version: 1,
    timestamp: new Date().toISOString(),
    goals,
    tasks
  };

  // Create blob and download
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
    type: 'application/json' 
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `scofield-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}