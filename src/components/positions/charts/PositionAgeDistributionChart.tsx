
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for position age distribution
const mockPositionAgeData = [
  { age: '0-7d', count: 245 },
  { age: '7-14d', count: 187 },
  { age: '14-30d', count: 328 },
  { age: '1-3m', count: 415 },
  { age: '3-6m', count: 210 },
  { age: '6m+', count: 98 },
];

const PositionAgeDistributionChart = () => {
  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Position Age Distribution</h3>
        <p className="text-sm text-muted-foreground mt-1">Count of positions by age range</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={mockPositionAgeData}
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
