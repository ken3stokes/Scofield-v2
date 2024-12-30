"use client";

import { Goal } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Bar } from 'react-chartjs-2';

interface CategoryDistributionProps {
  goals: Goal[];
}

export function CategoryDistribution({ goals }: CategoryDistributionProps) {
  const categories = ['Career', 'Education', 'Health', 'Financial', 'Business', 'Hobbies', 'Security'];
  
  const categoryData = categories.map(category => 
    goals.filter(goal => goal.category.toLowerCase() === category.toLowerCase()).length
  );

  const data = {
    labels: categories,
    datasets: [{
      label: 'Goals by Category',
      data: categoryData,
      backgroundColor: 'rgb(99, 155, 255)',
      borderWidth: 0,
      maxBarThickness: 30,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'start' as const,
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          precision: 0
        },
        grid: {
          display: true,
          drawBorder: false,
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <Card className="p-6">
      <div className="h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
}