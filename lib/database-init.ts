"use client";

import Dexie from 'dexie';
import { db } from './db';

let initialized = false;
let initializationPromise: Promise<void> | null = null;

export async function initializeDatabase() {
  if (initialized) return;

  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        // Delete the database if it exists to handle schema changes
        if (db.isOpen()) {
          await db.close();
        }
        
        // Delete the database to force a clean state
        await Dexie.delete('ScofieldDB');

        // Open the database with the new schema
        await db.open();
        
        // Initialize with empty tables
        await db.transaction('rw', [db.goals, db.tasks], async () => {
          const goalCount = await db.goals.count();
          const taskCount = await db.tasks.count();
          
          if (goalCount === 0) {
            // Add sample goal
            const goalId = crypto.randomUUID();
            await db.goals.add({
              id: goalId,
              title: 'Welcome to Scofield',
              specific: 'Get started with goal tracking',
              measurable: 'Complete first task',
              achievable: 'Easy to start',
              relevant: 'Important for productivity',
              timebound: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
              priority: 'medium',
              category: 'career',
              status: 'not-started',
              progress: 0,
              createdAt: new Date(),
              updatedAt: new Date()
            });

            if (taskCount === 0) {
              // Add sample task
              await db.tasks.add({
                id: crypto.randomUUID(),
                goalId,
                title: 'Create your first task',
                status: 'pending',
                priority: 'medium',
                dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day from now
              });
            }
          }
        });

        initialized = true;
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Database initialization failed:', error);
        initialized = false;
        initializationPromise = null;
        throw error;
      }
    })();
  }

  return initializationPromise;
}