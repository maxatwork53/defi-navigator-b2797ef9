
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PoolPosition } from '@/components/positions/PoolPositionsTable';

type PositionPerformanceChartProps = {
  positions: PoolPosition[];
};

const PositionPerformanceChart = ({ positions }: PositionPerformanceChartProps) => {
  const performanceData = useMemo(() => {
    if (!positions.length) return [];

    // Group positions by performance categories
    const winningPositions = positions.filter(p => p.pnlPercentage > 0);
    const losingPositions = positions.filter(p => p.pnlPercentage <= 0);

    // Calculate average PnL percentages for different time periods
    const calculateAvgPnl = (posArray: PoolPosition[], maxAgeDays: number) => {
      const filteredPositions = posArray.filter(p => p.ageInHours / 24 <= maxAgeDays);
      if (filteredPositions.length === 0) return 0;
      return filteredPositions.reduce((sum, p) => sum + p.pnlPercentage, 0) / filteredPositions.length;
    };

    // Time periods in days
    const periods = [
      { name: '1d', days: 1 },
      { name: '1w', days: 7 },
      { name: '1m', days: 30 },
      { name: '3m', days: 90 },
      { name: '1y', days: 365 },
    ];

    return periods.map(period => ({
      name: period.name,
      winning: calculateAvgPnl(winningPositions, period.days),
      losing: calculateAvgPnl(losingPositions, period.days),
    }));
  }, [positions]);

  if (!positions.length) {
    return (
      <div className="chart-container flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-muted-foreground text-center">Add pools to view position performance</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Position Performance</h3>
        <p className="text-sm text-muted-foreground mt-1">Average returns for winning vs losing positions over time</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={performanceData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => `${value.toFixed(1)}%`}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(2)}%`, value >= 0 ? 'Return' : 'Loss']}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }} 
          />
          <Legend />
          <Bar dataKey="winning" name="Winning Positions" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="losing" name="Losing Positions" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PositionPerformanceChart;
