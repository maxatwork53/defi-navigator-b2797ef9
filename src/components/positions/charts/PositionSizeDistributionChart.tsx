
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PoolPosition } from '@/components/positions/PoolPositionsTable';

type PositionSizeDistributionChartProps = {
  positions: PoolPosition[];
};

const PositionSizeDistributionChart = ({ positions }: PositionSizeDistributionChartProps) => {
  const sizeDistributionData = useMemo(() => {
    if (!positions.length) return [];

    // Define size buckets
    const sizeDistribution = [
      { size: '$0-$1K', count: 0 },
      { size: '$1K-$5K', count: 0 },
      { size: '$5K-$10K', count: 0 },
      { size: '$10K-$50K', count: 0 },
      { size: '$50K-$100K', count: 0 },
      { size: '$100K+', count: 0 },
    ];

    // Categorize positions by size
    positions.forEach(position => {
      const value = position.valueInvested;

      if (value < 1000) {
        sizeDistribution[0].count += 1;
      } else if (value < 5000) {
        sizeDistribution[1].count += 1;
      } else if (value < 10000) {
        sizeDistribution[2].count += 1;
      } else if (value < 50000) {
        sizeDistribution[3].count += 1;
      } else if (value < 100000) {
        sizeDistribution[4].count += 1;
      } else {
        sizeDistribution[5].count += 1;
      }
    });

    return sizeDistribution;
  }, [positions]);

  if (!positions.length) {
    return (
      <div className="chart-container flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-muted-foreground text-center">Add pools to view position size distribution</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Position Size Distribution</h3>
        <p className="text-sm text-muted-foreground mt-1">Distribution of positions by size in USD</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={sizeDistributionData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="size" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value: number) => [`${value} positions`, 'Count']}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }} 
            labelFormatter={(label) => `Size Range: ${label}`}
          />
          <Bar dataKey="count" name="Number of Positions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PositionSizeDistributionChart;
