
import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Pool } from '@/data/mockPools';
import { formatCurrency } from '@/utils/formatters';
import { ChartContainer, ChartTooltipContent, ChartLegend } from '@/components/ui/chart';
import { getColor } from '@/utils/chartUtils';

type FeesCollectedChartProps = {
  data: any[];
  pools: Pool[];
};

const FeesCollectedChart = memo(({ data, pools }: FeesCollectedChartProps) => {
  const chartConfig = {
    blue: { color: '#3b82f6' },
    green: { color: '#10b981' },
    red: { color: '#ef4444' },
    purple: { color: '#8b5cf6' },
    cyan: { color: '#06b6d4' },
    pink: { color: '#ec4899' },
    lime: { color: '#84cc16' },
    rose: { color: '#f43f5e' },
    teal: { color: '#14b8a6' },
    indigo: { color: '#6366f1' },
    orange: { color: '#f97316' },
    amber: { color: '#f59e0b' }
  };
  
  return (
    <div className="bg-card rounded-lg border shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Daily Fees Collected (Last 30 Days)</h3>
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                // Shorten the date display to help with spacing
                return value.split(' ')[1]; // Show just the day number
              }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value) => formatCurrency(Number(value))}
                />
              }
            />
            <ChartLegend />
            {pools.slice(0, 5).map((pool, index) => (
              <Line
                key={pool.id}
                type="monotone"
                dataKey={pool.name}
                stroke={getColor(index)}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
});

export default FeesCollectedChart;
