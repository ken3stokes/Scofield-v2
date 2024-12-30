"use client";

import { Target, List, BarChart2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="relative group hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="bg-blue-50 rounded-lg p-3 w-fit mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

export function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-gray-600">
            Powerful features to help you achieve your goals effectively
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Target className="h-6 w-6 text-blue-600" />}
            title="SMART Goals"
            description="Create Specific, Measurable, Achievable, Relevant, and Time-bound goals."
          />
          <FeatureCard
            icon={<List className="h-6 w-6 text-blue-600" />}
            title="Task Management"
            description="Break down goals into manageable tasks with priorities and deadlines."
          />
          <FeatureCard
            icon={<BarChart2 className="h-6 w-6 text-blue-600" />}
            title="Progress Tracking"
            description="Visualize your progress with dynamic charts and milestone tracking."
          />
        </div>
      </div>
    </section>
  );
}