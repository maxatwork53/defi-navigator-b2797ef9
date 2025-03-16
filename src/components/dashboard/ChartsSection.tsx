
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
      <div className="w-full mb-6">
        {/* Position metrics comparison chart */}
        <ComparisonChart 
          data={comparisonData}
          title="Winning vs Losing Positions"
          description="Comparison of key metrics between winning and losing positions"
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChart 
          data={tvlData}
          title="Total Value Locked"
          description="Trend of TVL across all pools"
        />
        <HeatmapChart 
          data={heatmapData}
          title="Liquidity Concentration"
          description="Distribution of liquidity across price ranges"
          xLabel="Price Lower"
          yLabel="Price Upper"
        />
      </div>
    </div>
  );
};

export default ChartsSection;
