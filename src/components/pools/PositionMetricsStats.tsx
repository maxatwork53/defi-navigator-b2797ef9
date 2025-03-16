
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercentage, formatDuration } from '@/utils/formatters';

type PositionMetricsStatsProps = {
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
    percentage?: number;
  };
  losing: {
    medianTimeHours: number;
    medianUsdValue: number;
    medianRangePercentage: number;
    percentage?: number;
  };
};

const PositionMetricsStats = ({ overall, winning, losing }: PositionMetricsStatsProps) => {
  // Set default percentages if not provided
  const winningPercentage = winning.percentage || 62.5;
  const losingPercentage = losing.percentage || 37.5;

  const formatValue = (value: number, type: string) => {
    if (type === 'value') return formatCurrency(value);
    if (type === 'range') return formatPercentage(value);
    if (type === 'time') return formatDuration(value);
    return value.toLocaleString();
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold mb-2">Position Metrics</h3>
        
        <div className="grid grid-cols-7 gap-2 mb-1 border-b pb-1">
          <div className="font-medium text-xs">Metric</div>
          <div className="font-medium text-xs">Median</div>
          <div className="font-medium text-xs">Average</div>
          {overall.value.bottomQuartile !== undefined && (
            <div className="font-medium text-xs">Bottom Quartile</div>
          )}
          {overall.value.topQuartile !== undefined && (
            <div className="font-medium text-xs">Top Quartile</div>
          )}
          <div className="font-medium text-xs text-success">
            Winning ({formatPercentage(winningPercentage)})
          </div>
          <div className="font-medium text-xs text-destructive">
            Losing ({formatPercentage(losingPercentage)})
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Value of Positions</div>
          <div className="text-xs font-medium">{formatValue(overall.value.median, 'value')}</div>
          <div className="text-xs font-medium">{formatValue(overall.value.average, 'value')}</div>
          {overall.value.bottomQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(overall.value.bottomQuartile, 'value')}</div>
          )}
          {overall.value.topQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(overall.value.topQuartile, 'value')}</div>
          )}
          <div className="text-xs font-medium text-success">{formatCurrency(winning.medianUsdValue)}</div>
          <div className="text-xs font-medium text-destructive">{formatCurrency(losing.medianUsdValue)}</div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Price Range (%)</div>
          <div className="text-xs font-medium">{formatValue(overall.priceRange.median, 'range')}</div>
          <div className="text-xs font-medium">{formatValue(overall.priceRange.average, 'range')}</div>
          {overall.priceRange.bottomQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(overall.priceRange.bottomQuartile, 'range')}</div>
          )}
          {overall.priceRange.topQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(overall.priceRange.topQuartile, 'range')}</div>
          )}
          <div className="text-xs font-medium text-success">{formatPercentage(winning.medianRangePercentage)}</div>
          <div className="text-xs font-medium text-destructive">{formatPercentage(losing.medianRangePercentage)}</div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Time in Position</div>
          <div className="text-xs font-medium">{formatValue(overall.timeInPosition.median, 'time')}</div>
          <div className="text-xs font-medium">{formatValue(overall.timeInPosition.average, 'time')}</div>
          {overall.timeInPosition.bottomQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(overall.timeInPosition.bottomQuartile, 'time')}</div>
          )}
          {overall.timeInPosition.topQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(overall.timeInPosition.topQuartile, 'time')}</div>
          )}
          <div className="text-xs font-medium text-success">{formatDuration(winning.medianTimeHours)}</div>
          <div className="text-xs font-medium text-destructive">{formatDuration(losing.medianTimeHours)}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionMetricsStats;
