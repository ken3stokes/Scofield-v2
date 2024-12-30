"use client";

import { format } from 'date-fns';

interface SmartCriteriaProps {
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timebound: Date;
}

export function SmartCriteria({
  specific,
  measurable,
  achievable,
  relevant,
  timebound
}: SmartCriteriaProps) {
  return (
    <div className="mt-4 space-y-3 border-t pt-4">
      <CriteriaItem
        letter="S"
        title="Specific"
        description={specific}
      />
      <CriteriaItem
        letter="M"
        title="Measurable"
        description={measurable}
      />
      <CriteriaItem
        letter="A"
        title="Achievable"
        description={achievable}
      />
      <CriteriaItem
        letter="R"
        title="Relevant"
        description={relevant}
      />
      <CriteriaItem
        letter="T"
        title="Time-bound"
        description={`Due by ${format(new Date(timebound), 'PPP')}`}
      />
    </div>
  );
}

interface CriteriaItemProps {
  letter: string;
  title: string;
  description: string;
}

function CriteriaItem({ letter, title, description }: CriteriaItemProps) {
  return (
    <div className="flex gap-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
        {letter}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}