
import React from 'react';
import ComparisonChart from '@/components/ComparisonChart';
import AreaChart from '@/components/AreaChart';
import HeatmapChart from '@/components/HeatmapChart';

type ChartsSectionProps = {
  comparisonData: Array<{ name: string; winning: number; losing: number }>;
  tvlData: Array<{ name: string; value: number }>;
  heatmapData: Array<{ x: number; y: number; value: number }>;
  className?: string;
};

const ChartsSection = ({ comparisonData, tvlData, heatmapData, className }: ChartsSectionProps) => {
  return (
    <div className={`flex flex-col w-full ${className || ''}`}>
      <div className="w-full h-[365px] mb-6">
        {/* Position metrics comparison chart */}
        <ComparisonChart 
          data={comparisonData}
          title="Winning vs Losing Positions"
          description="Comparison of key metrics between winning and losing positions"
          className="w-full h-full"
        />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChart 
          data={tvlData}
          title="Total Value Locked"
          description="Trend of TVL across all pools"
          className="h-[300px]"
        />
        <HeatmapChart 
          data={heatmapData}
          title="Liquidity Concentration"
          description="Distribution of liquidity across price ranges"
          xLabel="Price Lower"
          yLabel="Price Upper"
          className="h-[300px]"
        />
      </div>
    </div>
  );
};

export default ChartsSection;
