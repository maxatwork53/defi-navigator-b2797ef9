
import React from 'react';
import { cn } from '@/lib/utils';

type RangeIndicatorProps = {
  range: { 
    lower: number; 
    upper: number; 
    current: number;
  };
  className?: string;
};

const RangeIndicator = ({ range, className }: RangeIndicatorProps) => {
  // Calculate where the current price is in the range
  const rangeSize = range.upper - range.lower;
  const currentPosition = (range.current - range.lower) / rangeSize;
  
  // Check if price is within range
  const isInRange = range.current >= range.lower && range.current <= range.upper;
  
  return (
    <div className={cn("h-2 bg-secondary rounded-full overflow-hidden", className)}>
      {isInRange ? (
        <div className="h-full bg-primary relative overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${Math.max(Math.min(currentPosition * 100, 100), 0)}%` }}
          >
            <div 
              className="absolute top-0 h-full w-1 bg-white" 
              style={{ left: `${Math.max(Math.min(currentPosition * 100, 100), 0)}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="h-full bg-muted relative">
          <div 
            className="absolute top-0 h-full w-1 bg-destructive" 
            style={{ 
              left: range.current < range.lower 
                ? '0%' 
                : '100%' 
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RangeIndicator;
