
import React, { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatPercentage } from '@/utils/formatters';

type TvlToFeesRatioChartProps = {
  data: any[];
};

const TvlToFeesRatioChart = memo(({
  data
}: TvlToFeesRatioChartProps) => (
  <div className="bg-card rounded-lg border shadow-sm p-6 dark:bg-gray-800 dark:border-gray-700">
    <h3 className="text-lg font-medium mb-4">Fees/TVL Ratio (24h)</h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--muted) / 0.3)" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={60} 
            tick={{
              fontSize: 12
            }}
            stroke="hsl(var(--muted-foreground))" 
          />
          <YAxis 
            tick={{
              fontSize: 12
            }} 
            tickFormatter={value => formatPercentage(value)}
            stroke="hsl(var(--muted-foreground))" 
          />
          <Tooltip 
            cursor={{
              fill: 'rgba(0, 0, 0, 0.05)'
            }} 
            content={({
              active,
              payload
            }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-background p-3 rounded-md border text-xs shadow dark:bg-gray-800 dark:border-gray-700">
                    <p className="font-medium">{data.name}</p>
                    <p>TVL: ${(data.tvl).toLocaleString()}</p>
                    <p>Fees (24h): ${(data.fees).toLocaleString()}</p>
                    <p>Ratio: {formatPercentage(data.value)}</p>
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
