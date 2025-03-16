
import { Pool } from '@/data/mockPools';
import { generateMockPoolStats } from './poolStatsGenerator';

// Pre-generate chart data for all pools
const precalculatedChartData = new Map<string, any>();

export const generateChartData = (pools: Pool[], chartType: string) => {
  const cacheKey = `${chartType}_${pools.map(p => p.id).join('_')}`;
  
  if (precalculatedChartData.has(cacheKey)) {
    return precalculatedChartData.get(cacheKey);
  }
  
  let result;
  
  switch (chartType) {
    case 'winningPositions': {
      result = generateWinningPositionsData(pools);
      break;
    }
    
    case 'tvlToFeesRatio': {
      result = generateTvlToFeesRatioData(pools);
      break;
    }
    
    case 'feesCollected': {
      result = generateFeesCollectedData(pools);
      break;
    }
    
    case 'priceRange': {
      result = generatePriceRangeData(pools);
      break;
    }
    
    default:
      result = [];
  }
  
  precalculatedChartData.set(cacheKey, result);
  return result;
};

const generateWinningPositionsData = (pools: Pool[]) => {
  return pools
    .map(pool => {
      const stats = generateMockPoolStats(pool);
      return {
        name: pool.name,
        value: stats.positionStats.winning.percentage,
        poolId: pool.id
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
};

const generateTvlToFeesRatioData = (pools: Pool[]) => {
  return pools
    .map(pool => {
      const stats = generateMockPoolStats(pool);
      const feesLast24h = stats.feesCollected[0].value;
      const ratio = feesLast24h > 0 ? (pool.tvl / feesLast24h) : 0;
      return {
        name: pool.name,
        value: ratio,
        poolId: pool.id,
        tvl: pool.tvl,
        fees: feesLast24h
      };
    })
    .sort((a, b) => a.value - b.value)
    .slice(0, 5);
};

const generateFeesCollectedData = (pools: Pool[]) => {
  const periods = ['1d', '7d', '14d', '30d'];
  const lines = pools.slice(0, 5).map(pool => {
    const stats = generateMockPoolStats(pool);
    return {
      id: pool.id,
      name: pool.name,
      data: stats.feesCollected
    };
  });

  return periods.map((period, index) => {
    const dataPoint: any = { name: period };
    lines.forEach(line => {
      dataPoint[line.name] = line.data[index].value;
    });
    return dataPoint;
  });
};

const generatePriceRangeData = (pools: Pool[]) => {
  const periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const topPools = pools.slice(0, 3);
  
  return periods.map(period => {
    const dataPoint: any = { name: period };
    
    topPools.forEach(pool => {
      const poolStats = generateMockPoolStats(pool);
      const winningBase = poolStats.positionStats.winning.medianRangePercentage;
      const losingBase = poolStats.positionStats.losing.medianRangePercentage;
      
      const variation = (Math.random() * 0.4) - 0.2;
      
      dataPoint[`${pool.name} (Win)`] = winningBase * (1 + variation);
      dataPoint[`${pool.name} (Loss)`] = losingBase * (1 + variation);
    });
    
    return dataPoint;
  });
};
