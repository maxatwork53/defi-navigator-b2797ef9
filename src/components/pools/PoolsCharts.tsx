import React, { memo, useMemo } from 'react';
import { Pool } from '@/data/mockPools';
import { generateChartData } from '@/utils/mock';
import WinningPositionsChart from '@/components/charts/WinningPositionsChart';
import TvlToFeesRatioChart from '@/components/charts/TvlToFeesRatioChart';
import FeesCollectedChart from '@/components/charts/FeesCollectedChart';
import PriceRangeChart from '@/components/charts/PriceRangeChart';
type PoolsChartsProps = {
  pools: Pool[];
};

// Main PoolsCharts component
const PoolsCharts = ({
  pools
}: PoolsChartsProps) => {
  // Generate chart data using memoization
  const winningPositionsData = useMemo(() => generateChartData(pools, 'winningPositions'), [pools]);
  const tvlToFeesRatioData = useMemo(() => generateChartData(pools, 'tvlToFeesRatio'), [pools]);
  const feesCollectedData = useMemo(() => generateChartData(pools, 'feesCollected'), [pools]);
  const priceRangeData = useMemo(() => generateChartData(pools, 'priceRange'), [pools]);
  return <div className="mt-8 space-y-8">
      <h2 className="text-xl font-semibold mb-4">Top Pool Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <WinningPositionsChart data={winningPositionsData} />
        <TvlToFeesRatioChart data={tvlToFeesRatioData} />
        <FeesCollectedChart data={feesCollectedData} pools={pools} />
        <PriceRangeChart data={priceRangeData} pools={pools} />
      </div>
    </div>;
};
export default memo(PoolsCharts);