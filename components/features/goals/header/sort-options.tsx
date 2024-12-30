"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortOption {
  label: string;
  value: string;
  direction?: "asc" | "desc";
}

interface SortOptionsProps {
  selectedSort: string;
  onSortChange: (value: string) => void;
}

const sortOptions: SortOption[] = [
  { label: "Priority ↑", value: "priority-asc" },
  { label: "Priority ↓", value: "priority-desc" },
  { label: "Due Date ↑", value: "dueDate-asc" },
  { label: "Due Date ↓", value: "dueDate-desc" },
  { label: "Title ↑", value: "title-asc" },
  { label: "Title ↓", value: "title-desc" },
  { label: "Progress ↑", value: "progress-asc" },
  { label: "Progress ↓", value: "progress-desc" },
  { label: "Status ↑", value: "status-asc" },
  { label: "Status ↓", value: "status-desc" },
];

export function SortOptions({ selectedSort, onSortChange }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <Select value={selectedSort} onValueChange={onSortChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}