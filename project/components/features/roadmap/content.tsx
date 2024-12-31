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
    description: "Create separate workspaces for different areas of life (Career, Personal, Health, Financial) with customizable themes and settings.",
    status: "planned",
    quarter: "Q1 2025"
  },
  {
    title: "Workspace Settings",
    description: "Add workspace-level settings including workspace name customization, color coding/theming, and default view preferences.",
    status: "planned",
    quarter: "Q2 2025"
  },
  {
    title: "Bulk Actions",
    description: "Implement multi-select functionality for goals to enable batch operations like moving or exporting multiple goals at once.",
    status: "planned",
    quarter: "Q2 2025"
  }
];

export function RoadmapContent() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Roadmap</h1>
        <p className="text-muted-foreground">
          Explore upcoming features and improvements planned for Scofield
        </p>
      </div>

      <div className="grid gap-6">
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="outline">Planned</Badge>
          <Badge variant="outline" className="bg-blue-100">In Progress</Badge>
          <Badge variant="outline" className="bg-green-100">Completed</Badge>
        </div>

        <div className="grid gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={
                      feature.status === "completed" 
                        ? "bg-green-100" 
                        : feature.status === "in-progress" 
                          ? "bg-blue-100" 
                          : ""
                    }
                  >
                    {feature.status}
                  </Badge>
                  <Badge variant="secondary">{feature.quarter}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
