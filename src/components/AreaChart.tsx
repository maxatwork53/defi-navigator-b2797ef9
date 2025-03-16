
import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type DataPoint = {
  name: string;
  value: number;
};

type AreaChartProps = {
  data: DataPoint[];
  title: string;
  description?: string;
  color?: string;
  className?: string;
};

const AreaChart = ({ 
  data, 
  title, 
  description, 
  color = "#3b82f6", 
  className 
}: AreaChartProps) => {
  return (
    <div className={cn("chart-container animate-slide-in-up h-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="h-[calc(100%-60px)]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }} 
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fill={`url(#gradient-${title.replace(/\s+/g, '-')})`} 
              strokeWidth={2} 
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChart;
