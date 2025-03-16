
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';

type StatItem = {
  period: string;
  value: number;
};

type PoolUsageStatsProps = {
  swapVolume: StatItem[];
  swaps: StatItem[];
  feesCollected: StatItem[];
};

const StatRow = ({ label, values }: { label: string, values: StatItem[] }) => (
  <div className="grid grid-cols-5 gap-4 py-1">
    <div className="text-sm text-muted-foreground">{label}</div>
    {values.map((item, index) => (
      <div key={index} className="text-sm font-medium">
        {label.includes('Volume') || label.includes('Fees') 
          ? formatCurrency(item.value) 
          : item.value.toLocaleString()}
      </div>
    ))}
  </div>
);

const PoolUsageStatistics = ({ swapVolume, swaps, feesCollected }: PoolUsageStatsProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold mb-3">Pool Usage Statistics</h3>
        <div className="grid grid-cols-5 gap-4 mb-1 border-b pb-1">
          <div className="font-medium text-xs">Metric</div>
          <div className="font-medium text-xs">1 Day</div>
          <div className="font-medium text-xs">7 Days</div>
          <div className="font-medium text-xs">14 Days</div>
          <div className="font-medium text-xs">30 Days</div>
        </div>
        <StatRow label="Swap Volume" values={swapVolume} />
        <StatRow label="Number of Swaps" values={swaps} />
        <StatRow label="Fees Collected" values={feesCollected} />
      </CardContent>
    </Card>
  );
};

export default PoolUsageStatistics;
