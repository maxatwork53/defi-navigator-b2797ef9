
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PoolPosition } from '@/components/positions/PoolPositionsTable';

type PositionAgeDistributionChartProps = {
  positions: PoolPosition[];
};

const PositionAgeDistributionChart = ({ positions }: PositionAgeDistributionChartProps) => {
  const positionAgeData = useMemo(() => {
    if (!positions.length) return [];

    // Define age buckets
    const ageDistribution = [
      { age: '0-7d', count: 0 },
      { age: '7-14d', count: 0 },
      { age: '14-30d', count: 0 },
      { age: '1-3m', count: 0 },
      { age: '3-6m', count: 0 },
      { age: '6m+', count: 0 },
    ];

    // Categorize positions by age
    positions.forEach(position => {
      const ageInHours = position.ageInHours;
      const ageInDays = ageInHours / 24;

      if (ageInDays <= 7) {
        ageDistribution[0].count += 1;
      } else if (ageInDays <= 14) {
        ageDistribution[1].count += 1;
      } else if (ageInDays <= 30) {
        ageDistribution[2].count += 1;
      } else if (ageInDays <= 90) { // 3 months
        ageDistribution[3].count += 1;
      } else if (ageInDays <= 180) { // 6 months
        ageDistribution[4].count += 1;
      } else {
        ageDistribution[5].count += 1;
      }
    });

    return ageDistribution;
  }, [positions]);

  if (!positions.length) {
    return (
      <div className="chart-container flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-muted-foreground text-center">Add pools to view position age distribution</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Position Age Distribution</h3>
        <p className="text-sm text-muted-foreground mt-1">Count of positions by age range</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={positionAgeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="age" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value: number) => [`${value} positions`, 'Count']}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }} 
          />
          <Bar dataKey="count" name="Number of Positions" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PositionAgeDistributionChart;
