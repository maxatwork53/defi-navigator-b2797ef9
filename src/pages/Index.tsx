
import React, { useState } from 'react';
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
  networks, 
  mockPositionStats, 
  mockComparisonData,
  mockTvlData,
  mockHeatmapData
} from '@/utils/mockData';

const Index = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const currentTvl = mockTvlData[mockTvlData.length - 1].value;
  const formattedTvl = formatCurrency(currentTvl);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <DashboardHeader 
          networks={networks}
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
        />

        <StatCardsSection formattedTvl={formattedTvl} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <PositionMetricsCard
            positionStats={mockPositionStats}
            formatDuration={formatDuration}
            formatCurrency={formatCurrency}
            formatPercentage={formatPercentage}
          />
          
          <ChartsSection 
            comparisonData={mockComparisonData}
            tvlData={mockTvlData}
            heatmapData={mockHeatmapData}
          />
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your Positions</h2>
          <PositionsTable positions={mockPositions as Position[]} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
