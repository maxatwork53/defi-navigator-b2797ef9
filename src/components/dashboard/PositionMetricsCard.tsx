
import React from 'react';
import { Clock, DollarSign, Percent, ArrowUpRight } from 'lucide-react';

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
    <div className={`bg-white rounded-xl shadow-sm border border-border p-6 lg:col-span-1 animate-slide-in-up ${className || ''}`}>
      <h2 className="text-lg font-semibold mb-4">Position Metrics</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Median Time in Position</h3>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center text-success">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Winning</span>
              </div>
              <p className="text-xl font-semibold mt-1">
                {formatDuration(positionStats.winning.medianTimeHours)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-destructive">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                <span className="text-xs">Losing</span>
              </div>
              <p className="text-xl font-semibold mt-1">
                {formatDuration(positionStats.losing.medianTimeHours)}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Median USD Value</h3>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center text-success">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Winning</span>
              </div>
              <p className="text-xl font-semibold mt-1">
                {formatCurrency(positionStats.winning.medianUsdValue)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-destructive">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                <span className="text-xs">Losing</span>
              </div>
              <p className="text-xl font-semibold mt-1">
                {formatCurrency(positionStats.losing.medianUsdValue)}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <Percent className="w-4 h-4 mr-2 text-muted-foreground" />
            <h3 className="text-sm font-medium">Median Range Coverage</h3>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex items-center text-success">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs">Winning</span>
              </div>
              <p className="text-xl font-semibold mt-1">
                {formatPercentage(positionStats.winning.medianRangePercentage)}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-destructive">
                <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                <span className="text-xs">Losing</span>
              </div>
              <p className="text-xl font-semibold mt-1">
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
