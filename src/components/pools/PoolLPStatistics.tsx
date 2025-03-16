
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
        <h3 className="text-sm font-semibold mb-3">Pool LP Statistics</h3>
        
        {/* Top metrics - Addresses and Positions */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-muted/30 p-3 rounded-md">
            <span className="text-sm text-muted-foreground block mb-1">Addresses Providing Liquidity:</span>
            <span className="font-medium text-lg">{lpStats.addressesCount}</span>
          </div>
          <div className="bg-muted/30 p-3 rounded-md">
            <span className="text-sm text-muted-foreground block mb-1">Open Positions:</span>
            <span className="font-medium text-lg">{lpStats.openPositionsCount}</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Unified table for time-based metrics */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Metric</TableHead>
              {periods.map((period, index) => (
                <TableHead key={index}>{period}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* TVL Change Row */}
            <TableRow>
              <TableCell className="font-medium">TVL Change</TableCell>
              {tvlChange.map((item, index) => {
                const isPositive = item.value > 0;
                return (
                  <TableCell key={index}>
                    <span className={isPositive ? 'text-success' : 'text-destructive'}>
                      {isPositive ? (
                        <ArrowUpRight className="h-3.5 w-3.5 mr-1 inline" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 mr-1 inline" />
                      )}
                      {formatPercentage(Math.abs(item.value))}
                    </span>
                  </TableCell>
                );
              })}
            </TableRow>
            
            {/* Newly Opened Positions Row */}
            <TableRow>
              <TableCell className="font-medium">Newly Opened</TableCell>
              {lpStats.newPositions.map((item, index) => (
                <TableCell key={index}>{item.opened}</TableCell>
              ))}
            </TableRow>
            
            {/* Closed Positions Row */}
            <TableRow>
              <TableCell className="font-medium">Closed</TableCell>
              {lpStats.newPositions.map((item, index) => (
                <TableCell key={index}>{item.closed}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PoolLPStatistics;
