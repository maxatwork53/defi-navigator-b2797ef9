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
      result = generateDailyFeesCollectedData(pools);
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

const generateDailyFeesCollectedData = (pools: Pool[]) => {
  // Generate day labels for the last 30 days
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i)); // Start from 29 days ago to today
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Generate data points for each day
  return days.map((day) => {
    const dataPoint: any = { name: day };
    
    // Add data for top 5 pools
    pools.slice(0, 5).forEach(pool => {
      // Base the daily fee on pool volume, fees rate, and add some random variation
      const baseFeesPerDay = pool.feesCollected / 90; // Assume quarterly fees collected is available
      
      // Add random variation between 0.7 and 1.3 of the base value
      const variation = 0.7 + (Math.random() * 0.6);
      
      // Weekend effect - lower on weekends
      const dayDate = new Date(day + ', 2023');
      const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;
      const weekendFactor = isWeekend ? 0.7 : 1;
      
      // Calculate the daily fee with variation
      dataPoint[pool.name] = baseFeesPerDay * variation * weekendFactor;
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
