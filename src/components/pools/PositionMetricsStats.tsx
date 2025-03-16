
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
        <h3 className="text-sm font-semibold mb-4">Position Metrics</h3>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Metric</TableHead>
              <TableHead>Median</TableHead>
              <TableHead>Average</TableHead>
              {positionStats.overall.value.bottomQuartile !== undefined && (
                <TableHead>Bottom Quartile</TableHead>
              )}
              {positionStats.overall.value.topQuartile !== undefined && (
                <TableHead>Top Quartile</TableHead>
              )}
              <TableHead className="text-success">
                Winning Positions ({formatPercentage(winningPercentage)})
              </TableHead>
              <TableHead className="text-destructive">
                Losing Positions ({formatPercentage(losingPercentage)})
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Value of Positions</TableCell>
              <TableCell>{formatValue(positionStats.overall.value.median, 'value')}</TableCell>
              <TableCell>{formatValue(positionStats.overall.value.average, 'value')}</TableCell>
              {positionStats.overall.value.bottomQuartile !== undefined && (
                <TableCell>{formatValue(positionStats.overall.value.bottomQuartile, 'value')}</TableCell>
              )}
              {positionStats.overall.value.topQuartile !== undefined && (
                <TableCell>{formatValue(positionStats.overall.value.topQuartile, 'value')}</TableCell>
              )}
              <TableCell className="text-success">{formatCurrency(positionStats.winning.medianUsdValue)}</TableCell>
              <TableCell className="text-destructive">{formatCurrency(positionStats.losing.medianUsdValue)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Price Range (%)</TableCell>
              <TableCell>{formatValue(positionStats.overall.priceRange.median, 'range')}</TableCell>
              <TableCell>{formatValue(positionStats.overall.priceRange.average, 'range')}</TableCell>
              {positionStats.overall.priceRange.bottomQuartile !== undefined && (
                <TableCell>{formatValue(positionStats.overall.priceRange.bottomQuartile, 'range')}</TableCell>
              )}
              {positionStats.overall.priceRange.topQuartile !== undefined && (
                <TableCell>{formatValue(positionStats.overall.priceRange.topQuartile, 'range')}</TableCell>
              )}
              <TableCell className="text-success">{formatPercentage(positionStats.winning.medianRangePercentage)}</TableCell>
              <TableCell className="text-destructive">{formatPercentage(positionStats.losing.medianRangePercentage)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Time in Position</TableCell>
              <TableCell>{formatValue(positionStats.overall.timeInPosition.median, 'time')}</TableCell>
              <TableCell>{formatValue(positionStats.overall.timeInPosition.average, 'time')}</TableCell>
              {positionStats.overall.timeInPosition.bottomQuartile !== undefined && (
                <TableCell>{formatValue(positionStats.overall.timeInPosition.bottomQuartile, 'time')}</TableCell>
              )}
              {positionStats.overall.timeInPosition.topQuartile !== undefined && (
                <TableCell>{formatValue(positionStats.overall.timeInPosition.topQuartile, 'time')}</TableCell>
              )}
              <TableCell className="text-success">{formatDuration(positionStats.winning.medianTimeHours)}</TableCell>
              <TableCell className="text-destructive">{formatDuration(positionStats.losing.medianTimeHours)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PositionMetricsStats;
