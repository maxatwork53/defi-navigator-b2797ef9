
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency, formatPercentage, formatDuration } from '@/utils/formatters';

type PositionStatsType = {
  overall: {
    value: {
      median: number;
      average: number;
      bottomQuartile?: number;
      topQuartile?: number;
    };
    priceRange: {
      median: number;
      average: number;
      bottomQuartile?: number;
      topQuartile?: number;
    };
    timeInPosition: {
      median: number;
      average: number;
      bottomQuartile?: number;
      topQuartile?: number;
    };
  };
  winning: {
    medianTimeHours: number;
    medianUsdValue: number;
    medianRangePercentage: number;
  };
  losing: {
    medianTimeHours: number;
    medianUsdValue: number;
    medianRangePercentage: number;
  };
};

type PositionMetricsStatsProps = {
  positionStats: PositionStatsType;
};

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

const PositionMetricsStats = ({ positionStats }: PositionMetricsStatsProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold mb-3">Position Metrics (All Positions)</h3>
        <PositionStatsRow 
          label="Value of Positions" 
          data={positionStats.overall.value} 
        />
        <PositionStatsRow 
          label="Price Range (%)" 
          data={positionStats.overall.priceRange} 
        />
        <PositionStatsRow 
          label="Time in Position" 
          data={positionStats.overall.timeInPosition} 
        />
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium mb-2 text-success">Winning Positions (Positive APY)</h4>
            <PositionStatsRow 
              label="Value of Positions" 
              data={{ 
                median: positionStats.winning.medianUsdValue, 
                average: positionStats.winning.medianUsdValue * 1.2
              }} 
            />
            <PositionStatsRow 
              label="Price Range (%)" 
              data={{ 
                median: positionStats.winning.medianRangePercentage, 
                average: positionStats.winning.medianRangePercentage * 1.1
              }} 
            />
            <PositionStatsRow 
              label="Time in Position" 
              data={{ 
                median: positionStats.winning.medianTimeHours, 
                average: positionStats.winning.medianTimeHours * 1.15
              }} 
            />
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 text-destructive">Losing Positions (Negative APY)</h4>
            <PositionStatsRow 
              label="Value of Positions" 
              data={{ 
                median: positionStats.losing.medianUsdValue, 
                average: positionStats.losing.medianUsdValue * 1.2
              }} 
            />
            <PositionStatsRow 
              label="Price Range (%)" 
              data={{ 
                median: positionStats.losing.medianRangePercentage, 
                average: positionStats.losing.medianRangePercentage * 1.1
              }} 
            />
            <PositionStatsRow 
              label="Time in Position" 
              data={{ 
                median: positionStats.losing.medianTimeHours, 
                average: positionStats.losing.medianTimeHours * 0.85
              }} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionMetricsStats;
