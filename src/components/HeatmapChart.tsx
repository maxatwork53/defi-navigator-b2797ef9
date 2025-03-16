
import React from 'react';
import { cn } from '@/lib/utils';

type HeatmapPoint = {
  x: number;
  y: number;
  value: number;
};

type HeatmapChartProps = {
  data: HeatmapPoint[];
  title: string;
  description?: string;
  xLabel: string;
  yLabel: string;
  className?: string;
  maxValue?: number;
};

const HeatmapChart = ({ 
  data, 
  title, 
  description, 
  xLabel, 
  yLabel, 
  className,
  maxValue = Math.max(...data.map(d => d.value))
}: HeatmapChartProps) => {
  const xValues = Array.from(new Set(data.map(d => d.x))).sort((a, b) => a - b);
  const yValues = Array.from(new Set(data.map(d => d.y))).sort((a, b) => a - b);
  
  const cellWidth = 100 / xValues.length;
  const cellHeight = 100 / yValues.length;

  const colorScale = (value: number) => {
    const normalized = Math.min(value / maxValue, 1);
    return `rgba(59, 130, 246, ${normalized})`;
  };

  return (
    <div className={cn("chart-container animate-slide-in-up h-full", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="flex flex-col h-[calc(100%-60px)]">
        <div className="flex items-center">
          <div className="w-12"></div>
          <div className="flex-grow text-center text-xs font-medium text-muted-foreground">
            {xLabel}
          </div>
        </div>
        <div className="flex flex-grow">
          <div className="w-12 flex items-center justify-center">
            <div 
              className="transform -rotate-90 whitespace-nowrap text-xs font-medium text-muted-foreground"
            >
              {yLabel}
            </div>
          </div>
          <div className="relative flex-grow h-full">
            {data.map((point, i) => {
              const xIndex = xValues.indexOf(point.x);
              const yIndex = yValues.indexOf(point.y);
              
              return (
                <div
                  key={i}
                  className="absolute rounded-sm transition-all duration-300 hover:shadow-md hover:z-10"
                  style={{
                    left: `${xIndex * cellWidth}%`,
                    top: `${yIndex * cellHeight}%`,
                    width: `${cellWidth}%`,
                    height: `${cellHeight}%`,
                    backgroundColor: colorScale(point.value),
                  }}
                  title={`${xLabel}: ${point.x}, ${yLabel}: ${point.y}, Value: ${point.value}`}
                />
              );
            })}
          </div>
        </div>
        <div className="h-8 flex items-center mt-2">
          <div className="w-12"></div>
          <div className="flex-grow">
            <div className="h-3 bg-gradient-to-r from-blue-100 to-blue-600 rounded-sm"></div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>{maxValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;
