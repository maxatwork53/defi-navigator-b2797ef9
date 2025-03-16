
import React from 'react';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCardsSection from '@/components/dashboard/StatCardsSection';
import PositionMetricsCard from '@/components/dashboard/PositionMetricsCard';
import ChartsSection from '@/components/dashboard/ChartsSection';
import PositionsTable from '@/components/positions/PositionsTable';
import { mockPositions } from '@/data/mockPositions';
import { Position } from '@/components/positions/PositionTableRow';
import { formatCurrency, formatPercentage, formatDuration } from '@/utils/formatters';
import { 
  mockPositionStats, 
  mockComparisonData,
  mockTvlData,
  mockHeatmapData
} from '@/utils/mockData';

const Index = () => {
  const currentTvl = mockTvlData[mockTvlData.length - 1].value;
  const formattedTvl = formatCurrency(currentTvl);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />

        <StatCardsSection formattedTvl={formattedTvl} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 min-h-[500px]">
          <div className="lg:col-span-1 flex">
            <PositionMetricsCard
              positionStats={mockPositionStats}
              formatDuration={formatDuration}
              formatCurrency={formatCurrency}
              formatPercentage={formatPercentage}
              className="w-full"
            />
          </div>
          
          <div className="lg:col-span-2 flex">
            <ChartsSection 
              comparisonData={mockComparisonData}
              tvlData={mockTvlData}
              heatmapData={mockHeatmapData}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Your Positions</h2>
          <PositionsTable positions={mockPositions as Position[]} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
