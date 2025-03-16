
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for position value by category
const mockPositionValueData = [
  { category: '$0-$1K', value: 160000 },
  { category: '$1K-$5K', value: 1740000 },
  { category: '$5K-$10K', value: 3375000 },
  { category: '$10K-$50K', value: 6300000 },
  { category: '$50K-$100K', value: 9000000 },
  { category: '$100K+', value: 12000000 },
];

const PositionValueChart = () => {
  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Cumulative Position Value by Size Category</h3>
        <p className="text-sm text-muted-foreground mt-1">Total USD value of positions across different size categories</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={mockPositionValueData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="category" tick={{ fontSize: 12 }} />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => value >= 1000000 ? `$${(value / 1000000).toFixed(1)}M` : `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip 
            formatter={(value: number) => [
              value >= 1000000 ? `$${(value / 1000000).toFixed(2)}M` : `$${(value / 1000).toFixed(2)}K`, 
              'Total Value'
            ]}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #f0f0f0',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }} 
          />
          <Bar dataKey="value" name="Total Value (USD)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PositionValueChart;
