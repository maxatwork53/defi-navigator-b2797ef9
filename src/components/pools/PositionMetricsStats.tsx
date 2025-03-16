
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency, formatPercentage, formatDuration } from '@/utils/formatters';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

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
    percentage?: number;
  };
  losing: {
    medianTimeHours: number;
    medianUsdValue: number;
    medianRangePercentage: number;
    percentage?: number;
  };
};

type PositionMetricsStatsProps = {
  positionStats: PositionStatsType;
};

const PositionMetricsStats = ({ positionStats }: PositionMetricsStatsProps) => {
  // Set default percentages if not provided
  const winningPercentage = positionStats.winning.percentage || 62.5;
  const losingPercentage = positionStats.losing.percentage || 37.5;

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
          {positionStats.overall.value.bottomQuartile !== undefined && (
            <div className="font-medium text-xs">Bottom Quartile</div>
          )}
          {positionStats.overall.value.topQuartile !== undefined && (
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
          <div className="text-xs font-medium">{formatValue(positionStats.overall.value.median, 'value')}</div>
          <div className="text-xs font-medium">{formatValue(positionStats.overall.value.average, 'value')}</div>
          {positionStats.overall.value.bottomQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(positionStats.overall.value.bottomQuartile, 'value')}</div>
          )}
          {positionStats.overall.value.topQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(positionStats.overall.value.topQuartile, 'value')}</div>
          )}
          <div className="text-xs font-medium text-success">{formatCurrency(positionStats.winning.medianUsdValue)}</div>
          <div className="text-xs font-medium text-destructive">{formatCurrency(positionStats.losing.medianUsdValue)}</div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Price Range (%)</div>
          <div className="text-xs font-medium">{formatValue(positionStats.overall.priceRange.median, 'range')}</div>
          <div className="text-xs font-medium">{formatValue(positionStats.overall.priceRange.average, 'range')}</div>
          {positionStats.overall.priceRange.bottomQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(positionStats.overall.priceRange.bottomQuartile, 'range')}</div>
          )}
          {positionStats.overall.priceRange.topQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(positionStats.overall.priceRange.topQuartile, 'range')}</div>
          )}
          <div className="text-xs font-medium text-success">{formatPercentage(positionStats.winning.medianRangePercentage)}</div>
          <div className="text-xs font-medium text-destructive">{formatPercentage(positionStats.losing.medianRangePercentage)}</div>
        </div>
        
        <div className="grid grid-cols-7 gap-2 py-1">
          <div className="text-xs text-muted-foreground">Time in Position</div>
          <div className="text-xs font-medium">{formatValue(positionStats.overall.timeInPosition.median, 'time')}</div>
          <div className="text-xs font-medium">{formatValue(positionStats.overall.timeInPosition.average, 'time')}</div>
          {positionStats.overall.timeInPosition.bottomQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(positionStats.overall.timeInPosition.bottomQuartile, 'time')}</div>
          )}
          {positionStats.overall.timeInPosition.topQuartile !== undefined && (
            <div className="text-xs font-medium">{formatValue(positionStats.overall.timeInPosition.topQuartile, 'time')}</div>
          )}
          <div className="text-xs font-medium text-success">{formatDuration(positionStats.winning.medianTimeHours)}</div>
          <div className="text-xs font-medium text-destructive">{formatDuration(positionStats.losing.medianTimeHours)}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionMetricsStats;
