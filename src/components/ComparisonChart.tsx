
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type ComparisonItem = {
  name: string;
  winning: number;
  losing: number;
};

type ComparisonChartProps = {
  data: ComparisonItem[];
  title: string;
  description?: string;
  className?: string;
};

const ComparisonChart = ({ data, title, description, className }: ComparisonChartProps) => {
  return (
    <div className={cn("chart-container animate-slide-in-up h-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="h-[calc(100%-60px)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--muted) / 0.3)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))" 
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              stroke="hsl(var(--muted-foreground))" 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                color: 'hsl(var(--card-foreground))'
              }} 
            />
            <Legend />
            <Bar dataKey="winning" name="Winning Positions" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="losing" name="Losing Positions" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;
