
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { cn } from '@/lib/utils';
import PositionsPoolTable from '@/components/positions/PositionsPoolTable';
import PoolPositionsTable from '@/components/positions/PoolPositionsTable';
import PositionPerformanceChart from '@/components/positions/charts/PositionPerformanceChart';
import PositionSizeDistributionChart from '@/components/positions/charts/PositionSizeDistributionChart';
import PositionAgeDistributionChart from '@/components/positions/charts/PositionAgeDistributionChart';
import PositionValueChart from '@/components/positions/charts/PositionValueChart';
import PositionInsights from '@/components/positions/PositionInsights';
import { PoolPosition } from '@/components/positions/PoolPositionsTable';
import { generateMockPositions } from '@/utils/mock/positionGenerator';

const PositionAnalytics = () => {
  const [trackedPoolIds, setTrackedPoolIds] = useState<string[]>([]);
  const [positions, setPositions] = useState<PoolPosition[]>([]);

  useEffect(() => {
    if (trackedPoolIds.length > 0) {
      // Generate positions data based on pool IDs
      const mockPositions = generateMockPositions(trackedPoolIds);
      setPositions(mockPositions);
    } else {
      setPositions([]);
    }
  }, [trackedPoolIds]);

  const handlePoolsChange = (poolIds: string[]) => {
    setTrackedPoolIds(poolIds);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">Position Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed analytics and metrics for liquidity positions
          </p>
        </div>

        <div className="mb-8 animate-slide-in-up">
          <h2 className="text-xl font-semibold mb-4">Tracked Pools</h2>
          <PositionsPoolTable className="mb-6" onPoolsChange={handlePoolsChange} />
          <p className="text-sm text-muted-foreground">
            Manually add pools you want to track and analyze. Search by pool name or address.
          </p>
        </div>

        {trackedPoolIds.length > 0 && (
          <div className="mb-8 animate-slide-in-up">
            <h2 className="text-xl font-semibold mb-4">Pool Liquidity Positions</h2>
            <PoolPositionsTable poolIds={trackedPoolIds} />
            <p className="text-sm text-muted-foreground mt-2">
              Displaying liquidity positions for the tracked pools. Data updates automatically when pools are added or removed.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={cn("animate-slide-in-up")}>
            <PositionPerformanceChart positions={positions} />
          </div>

          <div className={cn("animate-slide-in-up")}>
            <PositionSizeDistributionChart positions={positions} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-slide-in-up">
          <PositionAgeDistributionChart positions={positions} />
          <PositionValueChart positions={positions} />
        </div>
        
        <PositionInsights hasPositions={positions.length > 0} />
      </div>
    </Layout>
  );
};

export default PositionAnalytics;
