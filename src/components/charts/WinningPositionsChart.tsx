import React, { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
type WinningPositionsChartProps = {
  data: any[];
};
const WinningPositionsChart = memo(({
  data
}: WinningPositionsChartProps) => <div className="bg-card rounded-lg border shadow-sm p-6">
    <h3 className="text-lg font-medium mb-4">Winning Position %</h3>
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 60
      }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{
          fontSize: 12
        }} />
          <YAxis tickFormatter={value => `${value}%`} tick={{
          fontSize: 12
        }} />
          <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, 'Winning %']} cursor={{
          fill: 'rgba(0, 0, 0, 0.05)'
        }} />
          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>);
export default WinningPositionsChart;