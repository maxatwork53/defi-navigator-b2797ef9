
import React from 'react';
import { Pool } from '@/data/mockPools';
import { formatCurrency, formatPercentage, formatDuration } from '@/utils/formatters';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { mockPositionStats } from '@/utils/mockData';

// Generate mock data for the expanded section
const generateMockPoolStats = (pool: Pool) => {
  // Time periods
  const periods = ['1d', '7d', '14d', '30d'];
  
  // Mock swap volume
  const swapVolume = periods.map(period => {
    const baseValue = pool.tvl * (Math.random() * 0.1); // 0-10% of TVL
    return { period, value: baseValue };
  });
  
  // Mock number of swaps
  const swaps = periods.map(period => {
    const baseValue = Math.floor(Math.random() * 1000) + 100;
    return { period, value: baseValue };
  });
  
  // Mock fees collected
  const feesCollected = periods.map(period => {
    const baseValue = pool.feesCollected * (Math.random() * 0.2); // 0-20% of total fees
    return { period, value: baseValue };
  });
  
  // Mock TVL change percentages
  const tvlChange = periods.map(period => {
    const changePercent = (Math.random() * 40) - 20; // -20% to +20%
    return { period, value: changePercent };
  });
  
  // Mock LP stats
  const lpStats = {
    addressesCount: Math.floor(Math.random() * 500) + 50,
    openPositionsCount: Math.floor(Math.random() * 1000) + 100,
    newPositions: periods.map(period => ({
      period,
      opened: Math.floor(Math.random() * 100) + 10,
      closed: Math.floor(Math.random() * 50) + 5
    }))
  };
  
  // Mock position stats
  const positionStats = {
    overall: {
      value: {
        median: pool.tvl / (lpStats.openPositionsCount * 0.5),
        average: pool.tvl / lpStats.openPositionsCount,
        bottomQuartile: pool.tvl / (lpStats.openPositionsCount * 2),
        topQuartile: pool.tvl / (lpStats.openPositionsCount * 0.25)
      },
      priceRange: {
        median: Math.random() * 10 + 5, // 5-15%
        average: Math.random() * 15 + 10, // 10-25%
        bottomQuartile: Math.random() * 5 + 2, // 2-7%
        topQuartile: Math.random() * 20 + 15 // 15-35%
      },
      timeInPosition: {
        median: Math.floor(Math.random() * 168) + 24, // 1-8 days in hours
        average: Math.floor(Math.random() * 240) + 48, // 2-12 days in hours
        bottomQuartile: Math.floor(Math.random() * 72) + 12, // 0.5-3.5 days in hours
        topQuartile: Math.floor(Math.random() * 336) + 168 // 7-21 days in hours
      }
    },
    winning: mockPositionStats.winning,
    losing: mockPositionStats.losing
  };
  
  return { swapVolume, swaps, feesCollected, tvlChange, lpStats, positionStats };
};

const StatRow = ({ label, values }: { label: string, values: Array<{ period: string, value: number }> }) => (
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

const TvlChangeRow = ({ values }: { values: Array<{ period: string, value: number }> }) => (
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

const PositionStatsRow = ({ 
  label, 
  data 
}: { 
  label: string, 
  data: { 
    median: number, 
    average: number, 
    bottomQuartile?: number, 
    topQuartile?: number 
  } 
}) => {
  const formatValue = (value: number) => {
    if (label.includes('Value')) return formatCurrency(value);
    if (label.includes('Range')) return formatPercentage(value);
    if (label.includes('Time')) return formatDuration(value);
    return value.toLocaleString();
  };

  return (
    <div className="grid grid-cols-5 gap-4 py-1">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">Median: {formatValue(data.median)}</div>
      <div className="text-sm font-medium">Average: {formatValue(data.average)}</div>
      {data.bottomQuartile !== undefined && (
        <div className="text-sm font-medium">Bottom Quartile: {formatValue(data.bottomQuartile)}</div>
      )}
      {data.topQuartile !== undefined && (
        <div className="text-sm font-medium">Top Quartile: {formatValue(data.topQuartile)}</div>
      )}
    </div>
  );
};

interface ExpandedPoolInfoProps {
  pool: Pool;
}

const ExpandedPoolInfo = ({ pool }: ExpandedPoolInfoProps) => {
  // Generate mock data for the expanded section
  const poolStats = generateMockPoolStats(pool);
  
  return (
    <div className="px-4 py-3 bg-muted/20 animate-fade-in border-t">
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
          <StatRow label="Swap Volume" values={poolStats.swapVolume} />
          <StatRow label="Number of Swaps" values={poolStats.swaps} />
          <StatRow label="Fees Collected" values={poolStats.feesCollected} />
        </CardContent>
      </Card>
      
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
          <TvlChangeRow values={poolStats.tvlChange} />
          
          <div className="mt-4 mb-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Addresses Providing Liquidity:</span>{' '}
                <span className="font-medium">{poolStats.lpStats.addressesCount}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Open Positions:</span>{' '}
                <span className="font-medium">{poolStats.lpStats.openPositionsCount}</span>
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
            {poolStats.lpStats.newPositions.map((item, index) => (
              <div key={index} className="text-sm font-medium">
                {item.opened}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-5 gap-4 py-1">
            <div className="text-sm text-muted-foreground">Closed</div>
            {poolStats.lpStats.newPositions.map((item, index) => (
              <div key={index} className="text-sm font-medium">
                {item.closed}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-4">
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold mb-3">Position Metrics (All Positions)</h3>
          <PositionStatsRow 
            label="Value of Positions" 
            data={poolStats.positionStats.overall.value} 
          />
          <PositionStatsRow 
            label="Price Range (%)" 
            data={poolStats.positionStats.overall.priceRange} 
          />
          <PositionStatsRow 
            label="Time in Position" 
            data={poolStats.positionStats.overall.timeInPosition} 
          />
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-2 text-success">Winning Positions (Positive APY)</h4>
              <PositionStatsRow 
                label="Value of Positions" 
                data={{ 
                  median: poolStats.positionStats.winning.medianUsdValue, 
                  average: poolStats.positionStats.winning.medianUsdValue * 1.2
                }} 
              />
              <PositionStatsRow 
                label="Price Range (%)" 
                data={{ 
                  median: poolStats.positionStats.winning.medianRangePercentage, 
                  average: poolStats.positionStats.winning.medianRangePercentage * 1.1
                }} 
              />
              <PositionStatsRow 
                label="Time in Position" 
                data={{ 
                  median: poolStats.positionStats.winning.medianTimeHours, 
                  average: poolStats.positionStats.winning.medianTimeHours * 1.15
                }} 
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-destructive">Losing Positions (Negative APY)</h4>
              <PositionStatsRow 
                label="Value of Positions" 
                data={{ 
                  median: poolStats.positionStats.losing.medianUsdValue, 
                  average: poolStats.positionStats.losing.medianUsdValue * 1.2
                }} 
              />
              <PositionStatsRow 
                label="Price Range (%)" 
                data={{ 
                  median: poolStats.positionStats.losing.medianRangePercentage, 
                  average: poolStats.positionStats.losing.medianRangePercentage * 1.1
                }} 
              />
              <PositionStatsRow 
                label="Time in Position" 
                data={{ 
                  median: poolStats.positionStats.losing.medianTimeHours, 
                  average: poolStats.positionStats.losing.medianTimeHours * 0.85
                }} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpandedPoolInfo;
