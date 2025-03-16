
import React, { useMemo } from 'react';
import { Pool } from '@/data/mockPools';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PoolUsageStatistics from './PoolUsageStatistics';
import PoolLPStatistics from './PoolLPStatistics';
import PositionMetricsStats from './PositionMetricsStats';
import { generateMockPoolStats } from '@/utils/mock';

interface ExpandedPoolInfoProps {
  pool: Pool;
}

const ExpandedPoolInfo = ({ pool }: ExpandedPoolInfoProps) => {
  // Use memoization to avoid recalculating on every render
  const poolStats = useMemo(() => generateMockPoolStats(pool), [pool]);
  
  return (
    <div className="py-4 px-2">
      <Tabs defaultValue="usage" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="usage" className="flex-1">Pool Usage</TabsTrigger>
          <TabsTrigger value="liquidity" className="flex-1">LP Statistics</TabsTrigger>
          <TabsTrigger value="positions" className="flex-1">Position Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage">
          <PoolUsageStatistics
            swapVolume={poolStats.swapVolume}
            swaps={poolStats.swaps}
            feesCollected={poolStats.feesCollected}
          />
        </TabsContent>
        
        <TabsContent value="liquidity">
          <PoolLPStatistics 
            addressesCount={poolStats.lpStats.addressesCount}
            openPositionsCount={poolStats.lpStats.openPositionsCount}
            newPositions={poolStats.lpStats.newPositions}
            tvlChange={poolStats.tvlChange}
          />
        </TabsContent>
        
        <TabsContent value="positions">
          <PositionMetricsStats 
            overall={poolStats.positionStats.overall}
            winning={poolStats.positionStats.winning}
            losing={poolStats.positionStats.losing}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpandedPoolInfo;
