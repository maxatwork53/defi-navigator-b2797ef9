
import React, { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Pool } from '@/data/mockPools';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { getColor } from '@/utils/chartUtils';

type PriceRangeChartProps = {
  data: any[];
  pools: Pool[];
};

const PriceRangeChart = memo(({ data, pools }: PriceRangeChartProps) => {
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
    <div className="bg-card rounded-lg border shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-medium mb-4">TVL Change (30 Days)</h3>
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--muted) / 0.3)" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))" 
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              domain={['auto', 'auto']}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value) => `${Number(value).toFixed(1)}%`}
                />
              }
            />
            <Legend />
            {pools.slice(0, 5).map((pool, index) => (
              <Line
                key={pool.id}
                type="monotone"
                dataKey={pool.name}
                stroke={getColor(index, 'base')}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
});

export default PriceRangeChart;
