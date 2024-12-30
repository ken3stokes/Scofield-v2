"use client";

import { Card, CardContent } from '@/components/ui/card';

interface PrincipleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function PrincipleCard({ icon, title, description }: PrincipleCardProps) {
  return (
    <Card className="bg-white/10 border-none">
      <CardContent className="p-6 text-center">
        <div className="bg-white/10 rounded-lg p-3 w-fit mx-auto mb-4">
          {React.cloneElement(icon as React.ReactElement, { className: 'h-8 w-8' })}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-blue-200">{description}</p>
      </CardContent>
    </Card>
  );
}