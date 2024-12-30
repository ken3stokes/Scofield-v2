"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { GoalFormData } from './schema';
import { useState } from 'react';

interface FormFieldsProps {
  form: UseFormReturn<GoalFormData>;
}

const PRIORITIES = [
  { value: 'urgent', label: 'Urgent', color: 'text-red-500' },
  { value: 'high', label: 'High', color: 'text-orange-500' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-500' },
  { value: 'low', label: 'Low', color: 'text-green-500' },
] as const;

const CATEGORIES = [
  { value: 'career', label: 'Career' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'financial', label: 'Financial' },
  { value: 'business', label: 'Business' },
  { value: 'hobbies', label: 'Hobbies' },
  { value: 'security', label: 'Security' },
  { value: 'home', label: 'Home' },
] as const;

export function FormFields({ form }: FormFieldsProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter goal title" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PRIORITIES.map(({ value, label, color }) => (
                    <SelectItem key={value} value={value}>
                      <span className={cn("font-medium", color)}>{label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="timebound"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Due Date</FormLabel>
            <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <DialogTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                  </Button>
                </FormControl>
              </DialogTrigger>
              <DialogContent className="p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                />
              </DialogContent>
            </Dialog>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="specific"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specific</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="What exactly do you want to accomplish? Include details about who, what, where, when, why, and which." 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="measurable"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Measurable</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="How will you measure progress and success? What metrics will you use?" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="achievable"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Achievable</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="What steps will you take to achieve this goal? Is it realistic given your resources?" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="relevant"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relevant</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Why is this goal important? How does it align with your broader objectives?" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}