
import React from 'react';
import { Pool } from '@/data/mockPools';
import { generateMockPoolStats } from './mock-utils';
import PoolUsageStatistics from './PoolUsageStatistics';
import PoolLPStatistics from './PoolLPStatistics';
import PositionMetricsStats from './PositionMetricsStats';

interface ExpandedPoolInfoProps {
  pool: Pool;
}

const ExpandedPoolInfo = ({ pool }: ExpandedPoolInfoProps) => {
  // Generate mock data for the expanded section
  const poolStats = generateMockPoolStats(pool);
  
  return (
    <div className="px-4 py-3 bg-muted/20 animate-fade-in border-t">
      <PoolUsageStatistics 
        swapVolume={poolStats.swapVolume}
        swaps={poolStats.swaps}
        feesCollected={poolStats.feesCollected}
      />
      
      <PoolLPStatistics 
        tvlChange={poolStats.tvlChange}
        lpStats={poolStats.lpStats}
      />
      
      <PositionMetricsStats 
        positionStats={poolStats.positionStats}
      />
    </div>
  );
};

export default ExpandedPoolInfo;
