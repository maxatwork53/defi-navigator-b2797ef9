
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatPercentage } from '@/utils/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type PositionChange = {
  period: string;
  opened: number;
  closed: number;
};

type StatItem = {
  period: string;
  value: number;
};

type PoolLPStatsProps = {
  addressesCount: number;
  openPositionsCount: number;
  newPositions: PositionChange[];
  tvlChange: StatItem[];
};

const PoolLPStatistics = ({ addressesCount, openPositionsCount, newPositions, tvlChange }: PoolLPStatsProps) => {
  // Array of time periods for the table headers
  const periods = ['24h', '7d', '14d', '30d'];
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold mb-2">Pool LP Statistics</h3>
        
        {/* TVL Change section */}
        <div className="grid grid-cols-5 gap-2 mb-3 border-b pb-2">
          <div className="text-xs text-muted-foreground">TVL Change</div>
          {tvlChange.map((item, index) => (
            <div key={index} className="flex items-center">
              {item.value > 0 ? (
                <ArrowUpRight className="h-3.5 w-3.5 text-success mr-1" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5 text-destructive mr-1" />
              )}
              <span className={`text-xs font-medium ${item.value > 0 ? 'text-success' : 'text-destructive'}`}>
                {formatPercentage(item.value)}
              </span>
            </div>
          ))}
        </div>
        
        {/* Top metrics row - Addresses and Positions */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-muted/30 p-2 rounded-md">
            <span className="text-xs text-muted-foreground block">Addresses Providing Liquidity:</span>
            <span className="font-medium text-base">{addressesCount}</span>
          </div>
          <div className="bg-muted/30 p-2 rounded-md">
            <span className="text-xs text-muted-foreground block">Open Positions:</span>
            <span className="font-medium text-base">{openPositionsCount}</span>
          </div>
        </div>
        
        <Separator className="my-2" />
        
        {/* Unified table for time-based metrics with tighter layout */}
        <div className="grid grid-cols-5 gap-2 mb-1 border-b pb-1">
          <div className="font-medium text-xs">Metric</div>
          {periods.map((period, index) => (
            <div key={index} className="font-medium text-xs">{period}</div>
          ))}
        </div>
        
        {/* Newly Opened Positions Row */}
        <div className="grid grid-cols-5 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Newly Opened</div>
          {newPositions.map((item, index) => (
            <div key={index} className="text-xs font-medium">{item.opened}</div>
          ))}
        </div>
        
        {/* Closed Positions Row */}
        <div className="grid grid-cols-5 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Closed</div>
          {newPositions.map((item, index) => (
            <div key={index} className="text-xs font-medium">{item.closed}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PoolLPStatistics;
