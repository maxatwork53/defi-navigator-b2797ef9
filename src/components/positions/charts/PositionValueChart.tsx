
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PoolPosition } from '@/components/positions/PoolPositionsTable';
import { formatCurrency } from '@/utils/formatters';

type PositionValueChartProps = {
  positions: PoolPosition[];
};

const PositionValueChart = ({ positions }: PositionValueChartProps) => {
  const positionValueData = useMemo(() => {
    if (!positions.length) return [];

    // Define value buckets
    const valueDistribution = [
      { category: '$0-$1K', value: 0 },
      { category: '$1K-$5K', value: 0 },
      { category: '$5K-$10K', value: 0 },
      { category: '$10K-$50K', value: 0 },
      { category: '$50K-$100K', value: 0 },
      { category: '$100K+', value: 0 },
    ];

    // Calculate total value in each bucket
    positions.forEach(position => {
      const value = position.valueInvested;

      if (value < 1000) {
        valueDistribution[0].value += value;
      } else if (value < 5000) {
        valueDistribution[1].value += value;
      } else if (value < 10000) {
        valueDistribution[2].value += value;
      } else if (value < 50000) {
        valueDistribution[3].value += value;
      } else if (value < 100000) {
        valueDistribution[4].value += value;
      } else {
        valueDistribution[5].value += value;
      }
    });

    return valueDistribution;
  }, [positions]);

  if (!positions.length) {
    return (
      <div className="chart-container flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-muted-foreground text-center">Add pools to view cumulative position value</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Cumulative Position Value by Size Category</h3>
        <p className="text-sm text-muted-foreground mt-1">Total USD value of positions across different size categories</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={positionValueData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--muted) / 0.3)" />
          <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => {
              if (value >= 1000000) {
                return `$${(value / 1000000).toFixed(1)}M`;
              } else if (value >= 1000) {
                return `$${(value / 1000).toFixed(1)}K`;
              } else {
                return `$${value.toFixed(0)}`;
              }
            }}
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip 
            formatter={(value: number) => {
              if (value >= 1000000) {
                return [`$${(value / 1000000).toFixed(2)}M`, 'Total Value'];
              } else if (value >= 1000) {
                return [`$${(value / 1000).toFixed(2)}K`, 'Total Value'];
              } else {
                return [`$${value.toFixed(2)}`, 'Total Value'];
              }
            }}
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              color: 'hsl(var(--card-foreground))'
            }} 
          />
          <Bar dataKey="value" name="Total Value (USD)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PositionValueChart;
