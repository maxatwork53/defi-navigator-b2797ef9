
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for position performance metrics
const mockPerformanceData = [
  { name: '1d', winning: 2.3, losing: -1.5 },
  { name: '1w', winning: 8.7, losing: -4.2 },
  { name: '1m', winning: 18.5, losing: -9.8 },
  { name: '3m', winning: 32.6, losing: -15.3 },
  { name: '1y', winning: 76.2, losing: -28.7 },
];

const PositionPerformanceChart = () => {
  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Position Performance</h3>
        <p className="text-sm text-muted-foreground mt-1">Average returns for winning vs losing positions over time</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={mockPerformanceData}
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
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, value >= 0 ? 'Return' : 'Loss']}
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
