"use client";

import { Card } from '@/components/ui/card';
import { Target, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react';

export function FrameworkGuide() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">SMART Framework Guide</h2>
      </div>

      <div className="space-y-4">
        <GuideItem
          title="Specific"
          description="What exactly do you want to accomplish? Include who, what, where, when, why, and which."
        />
        <GuideItem
          title="Measurable"
          description="How will you track progress and measure success? Define concrete criteria."
        />
        <GuideItem
          title="Achievable"
          description="Is the goal realistic given your resources and constraints? Break it down into steps."
        />
        <GuideItem
          title="Relevant"
          description="Why is this goal important? How does it align with your broader objectives?"
        />
        <GuideItem
          title="Time-bound"
          description="When do you want to achieve this goal? Set a clear deadline."
        />

        <div className="mt-6 pt-4 border-t">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Example Goal
          </h3>
          <p className="text-sm text-muted-foreground">
            "Increase my typing speed from 60 WPM to 90 WPM by practicing 30 minutes daily and completing 
            online typing courses, achieving this improvement within 3 months to enhance my productivity 
            as a developer."
          </p>
        </div>
      </div>
    </Card>
  );
}

interface GuideItemProps {
  title: string;
  description: string;
}

function GuideItem({ title, description }: GuideItemProps) {
  return (
    <div className="flex items-start gap-2">
      <ArrowRight className="h-4 w-4 mt-1 text-primary" />
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}