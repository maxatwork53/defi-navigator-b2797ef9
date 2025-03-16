
import React, { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formatters';

type TvlToFeesRatioChartProps = {
  data: any[];
};

const TvlToFeesRatioChart = memo(({ data }: TvlToFeesRatioChartProps) => (
  <div className="bg-card rounded-lg border shadow-sm p-6">
    <h3 className="text-lg font-medium mb-4">Top Pools by TVL to Fees Ratio (24h)</h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={60} 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-background p-3 rounded-md border text-xs shadow">
                    <p className="font-medium">{data.name}</p>
                    <p>TVL: {formatCurrency(data.tvl)}</p>
                    <p>Fees (24h): {formatCurrency(data.fees)}</p>
                    <p>Ratio: {formatCurrency(data.value)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
));

export default TvlToFeesRatioChart;
