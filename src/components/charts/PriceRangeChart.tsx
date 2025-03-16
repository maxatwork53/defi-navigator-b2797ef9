
import React, { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Pool } from '@/data/mockPools';
import { ChartContainer, ChartTooltipContent, ChartLegend } from '@/components/ui/chart';
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
    <div className="bg-card rounded-lg border shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Median Price Ranges (30 Days)</h3>
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />
            <Tooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value) => `${Number(value).toFixed(1)}%`}
                />
              }
            />
            <ChartLegend />
            {pools.slice(0, 3).map((pool, index) => (
              <React.Fragment key={pool.id}>
                <Area
                  type="monotone"
                  dataKey={`${pool.name} (Win)`}
                  stroke={getColor(index, 'win')}
                  fill={getColor(index, 'win')}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey={`${pool.name} (Loss)`}
                  stroke={getColor(index, 'lose')}
                  fill={getColor(index, 'lose')}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </React.Fragment>
            ))}
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
});

export default PriceRangeChart;
