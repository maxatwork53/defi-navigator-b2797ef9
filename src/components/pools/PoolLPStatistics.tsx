
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatPercentage } from '@/utils/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

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

const PoolLPStatistics = ({ tvlChange, lpStats }: PoolLPStatsProps) => {
  // Array of time periods for the table headers
  const periods = ['1 Day', '7 Days', '14 Days', '30 Days'];
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold mb-2">Pool LP Statistics</h3>
        
        {/* Top metrics row - Addresses and Positions */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="bg-muted/30 p-2 rounded-md">
            <span className="text-xs text-muted-foreground block">Addresses Providing Liquidity:</span>
            <span className="font-medium text-base">{lpStats.addressesCount}</span>
          </div>
          <div className="bg-muted/30 p-2 rounded-md">
            <span className="text-xs text-muted-foreground block">Open Positions:</span>
            <span className="font-medium text-base">{lpStats.openPositionsCount}</span>
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
        
        {/* TVL Change Row */}
        <div className="grid grid-cols-5 gap-2 py-1">
          <div className="text-xs text-muted-foreground">TVL Change</div>
          {tvlChange.map((item, index) => {
            const isPositive = item.value > 0;
            return (
              <div key={index} className="text-xs font-medium">
                <span className={isPositive ? 'text-success' : 'text-destructive'}>
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5 inline" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5 inline" />
                  )}
                  {formatPercentage(Math.abs(item.value))}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Newly Opened Positions Row */}
        <div className="grid grid-cols-5 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Newly Opened</div>
          {lpStats.newPositions.map((item, index) => (
            <div key={index} className="text-xs font-medium">{item.opened}</div>
          ))}
        </div>
        
        {/* Closed Positions Row */}
        <div className="grid grid-cols-5 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Closed</div>
          {lpStats.newPositions.map((item, index) => (
            <div key={index} className="text-xs font-medium">{item.closed}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PoolLPStatistics;
