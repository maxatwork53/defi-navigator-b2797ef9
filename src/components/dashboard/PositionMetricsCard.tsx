
import React from 'react';
import { Clock, DollarSign, Percent, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type PositionStatsType = {
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

type PositionMetricsCardProps = {
  positionStats: PositionStatsType;
  formatDuration: (hours: number) => string;
  formatCurrency: (value: number) => string;
  formatPercentage: (value: number) => string;
  className?: string;
};

const PositionMetricsCard = ({ 
  positionStats, 
  formatDuration, 
  formatCurrency, 
  formatPercentage,
  className 
}: PositionMetricsCardProps) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-4 animate-slide-in-up flex flex-col h-[250px] w-full", 
      className
    )}>
      <h2 className="text-lg font-semibold mb-2 dark:text-white">Position Metrics</h2>
      
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-1">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground dark:text-gray-400" />
            <h3 className="text-sm font-medium dark:text-gray-200">Median Time in Position</h3>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center text-success">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Winning</span>
              </div>
              <p className="text-sm font-semibold mt-0.5 dark:text-white">
                {formatDuration(positionStats.winning.medianTimeHours)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-destructive">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                <span className="text-xs">Losing</span>
              </div>
              <p className="text-sm font-semibold mt-0.5 dark:text-white">
                {formatDuration(positionStats.losing.medianTimeHours)}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-1">
            <DollarSign className="w-4 h-4 mr-2 text-muted-foreground dark:text-gray-400" />
            <h3 className="text-sm font-medium dark:text-gray-200">Median USD Value</h3>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center text-success">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Winning</span>
              </div>
              <p className="text-sm font-semibold mt-0.5 dark:text-white">
                {formatCurrency(positionStats.winning.medianUsdValue)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-destructive">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                <span className="text-xs">Losing</span>
              </div>
              <p className="text-sm font-semibold mt-0.5 dark:text-white">
                {formatCurrency(positionStats.losing.medianUsdValue)}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-1">
            <Percent className="w-4 h-4 mr-2 text-muted-foreground dark:text-gray-400" />
            <h3 className="text-sm font-medium dark:text-gray-200">Median Range Coverage</h3>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center text-success">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Winning</span>
              </div>
              <p className="text-sm font-semibold mt-0.5 dark:text-white">
                {formatPercentage(positionStats.winning.medianRangePercentage)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-destructive">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                <span className="text-xs">Losing</span>
              </div>
              <p className="text-sm font-semibold mt-0.5 dark:text-white">
                {formatPercentage(positionStats.losing.medianRangePercentage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionMetricsCard;
