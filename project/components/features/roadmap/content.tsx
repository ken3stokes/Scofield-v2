"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Feature {
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
  quarter: string;
}

const features: Feature[] = [
  {
    title: "Enhanced Workspace Management",
    description: "Add tooltips and info icons to provide better context about the Goals Workspace functionality and its features.",
    status: "planned",
    quarter: "Q1 2025"
  },
  {
    title: "Multiple Workspaces",
    description: "Enable users to create and manage multiple workspaces for different areas of their life or different projects.",
    status: "planned",
    quarter: "Q1 2025"
  },
  {
    title: "Workspace Settings",
    description: "Add customizable settings for each workspace including notifications, reminders, and display preferences.",
    status: "planned",
    quarter: "Q2 2025"
  },
  {
    title: "Bulk Actions",
    description: "Implement bulk actions for goals and tasks including multi-select, batch edit, and batch delete.",
    status: "planned",
    quarter: "Q2 2025"
  }
];

export function RoadmapContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Product Roadmap</h1>
        <p className="text-muted-foreground">
          Our planned features and improvements for Scofield
        </p>
      </div>

      <div className="grid gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <Badge
                variant={
                  feature.status === "completed"
                    ? "default"
                    : feature.status === "in-progress"
                    ? "secondary"
                    : "outline"
                }
                className="ml-4"
              >
                {feature.status}
              </Badge>
            </div>
            <Separator className="my-4" />
            <div className="text-sm text-muted-foreground">{feature.quarter}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
