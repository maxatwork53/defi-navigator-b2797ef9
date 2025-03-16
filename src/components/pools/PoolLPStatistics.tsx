
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatPercentage } from '@/utils/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type StatItem = {
  period: string;
  value: number;
};

type PositionChange = {
  period: string;
  opened: number;
  closed: number;
};

type PoolLPStatsProps = {
  tvlChange: StatItem[];
  lpStats: {
    addressesCount: number;
    openPositionsCount: number;
    newPositions: PositionChange[];
  };
};

const TvlChangeRow = ({ values }: { values: StatItem[] }) => (
  <div className="grid grid-cols-5 gap-4 py-1">
    <div className="text-sm text-muted-foreground">TVL Change</div>
    {values.map((item, index) => {
      const isPositive = item.value > 0;
      return (
        <div key={index} className="text-sm font-medium flex items-center">
          <span className={isPositive ? 'text-success' : 'text-destructive'}>
            {isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5 mr-1 inline" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 mr-1 inline" />
            )}
            {formatPercentage(Math.abs(item.value))}
          </span>
        </div>
      );
    })}
  </div>
);

const PoolLPStatistics = ({ tvlChange, lpStats }: PoolLPStatsProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold mb-3">Pool LP Statistics</h3>
        <div className="grid grid-cols-5 gap-4 mb-1 border-b pb-1">
          <div className="font-medium text-xs">Metric</div>
          <div className="font-medium text-xs">1 Day</div>
          <div className="font-medium text-xs">7 Days</div>
          <div className="font-medium text-xs">14 Days</div>
          <div className="font-medium text-xs">30 Days</div>
        </div>
        <TvlChangeRow values={tvlChange} />
        
        <div className="mt-4 mb-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">Addresses Providing Liquidity:</span>{' '}
              <span className="font-medium">{lpStats.addressesCount}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Open Positions:</span>{' '}
              <span className="font-medium">{lpStats.openPositionsCount}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-4 mb-1 border-b pb-1 mt-4">
          <div className="font-medium text-xs">Position Changes</div>
          <div className="font-medium text-xs">1 Day</div>
          <div className="font-medium text-xs">7 Days</div>
          <div className="font-medium text-xs">14 Days</div>
          <div className="font-medium text-xs">30 Days</div>
        </div>
        
        <div className="grid grid-cols-5 gap-4 py-1">
          <div className="text-sm text-muted-foreground">Newly Opened</div>
          {lpStats.newPositions.map((item, index) => (
            <div key={index} className="text-sm font-medium">
              {item.opened}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-5 gap-4 py-1">
          <div className="text-sm text-muted-foreground">Closed</div>
          {lpStats.newPositions.map((item, index) => (
            <div key={index} className="text-sm font-medium">
              {item.closed}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PoolLPStatistics;
