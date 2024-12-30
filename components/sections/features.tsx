"use client";

import { BookOpen, ListTodo, LineChart } from 'lucide-react';
import { FeatureCard } from '@/components/cards/feature-card';
import Link from 'next/link';

export function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Everything You Need</h2>
          <p className="text-muted-foreground">
            Powerful features to help you achieve your goals effectively
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/features/goal-framework">
            <FeatureCard
              icon={<BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              title="Goal Framework"
              description="Learn and apply the SMART methodology to create effective, achievable goals."
            />
          </Link>
          <Link href="/features/task-management">
            <FeatureCard
              icon={<ListTodo className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              title="Task Management"
              description="Break down goals into manageable tasks with priorities and deadlines."
            />
          </Link>
          <Link href="/features/progress-tracking">
            <FeatureCard
              icon={<LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
              title="Progress Tracking"
              description="Visualize your progress with dynamic charts and milestone tracking."
            />
          </Link>
        </div>
      </div>
    </section>
  );
}