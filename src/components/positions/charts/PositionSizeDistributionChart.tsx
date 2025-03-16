
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for position size distribution
const mockSizeDistributionData = [
  { size: '$0-$1K', count: 320 },
  { size: '$1K-$5K', count: 580 },
  { size: '$5K-$10K', count: 450 },
  { size: '$10K-$50K', count: 210 },
  { size: '$50K-$100K', count: 120 },
  { size: '$100K+', count: 80 },
];

const PositionSizeDistributionChart = () => {
  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Position Size Distribution</h3>
        <p className="text-sm text-muted-foreground mt-1">Distribution of positions by size in USD</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={mockSizeDistributionData}
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
          />
          <Bar dataKey="count" name="Number of Positions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PositionSizeDistributionChart;
