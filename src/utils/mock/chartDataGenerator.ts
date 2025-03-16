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
      result = generateTvlChangePercentageData(pools);
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

const generateTvlChangePercentageData = (pools: Pool[]) => {
  // Generate data for the last 30 days
  const days = 30;
  const poolsToShow = pools.slice(0, 5); // Show only top 5 pools
  
  // Create an array of dates (from oldest to newest)
  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i)); // Start from 29 days ago to today
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  // Generate base TVL values for day 30 (today)
  const baseTvlValues = new Map<string, number>();
  poolsToShow.forEach(pool => {
    baseTvlValues.set(pool.id, pool.tvl);
  });
  
  // Generate daily percentage changes relative to the final day (which is 100%)
  return dates.map((date, dayIndex) => {
    const dataPoint: any = { date };
    
    poolsToShow.forEach(pool => {
      // The base volatility factor determines how much the TVL fluctuates
      const volatilityFactor = 0.15; // 15% maximum fluctuation
      
      // On the last day (today), all pools should show 100%
      if (dayIndex === days - 1) {
        dataPoint[pool.name] = 100;
      } else {
        // For previous days, generate realistic fluctuations that trend upward or downward
        // based on the pool's characteristics
        
        // Calculate days from the first day (0-based)
        const daysFromStart = dayIndex;
        const daysToEnd = days - 1 - dayIndex;
        
        // Pool-specific trend factor (some pools grow, others decline)
        const poolTrendFactor = (parseInt(pool.id, 36) % 10) / 10 - 0.5; // -0.5 to 0.5
        
        // Linear trend component based on pool characteristics
        const trendComponent = poolTrendFactor * (daysFromStart / days) * 30; // Up to ±15% trend
        
        // Random fluctuation component (higher for earlier dates, converging to 100% at the end)
        const randomFactor = (Math.random() * 2 - 1) * volatilityFactor * (daysToEnd / days);
        
        // Calculate percentage (100% is the baseline at the end)
        const percentage = 100 + trendComponent + randomFactor * 100;
        
        // Assign the percentage value to this pool for this day
        dataPoint[pool.name] = parseFloat(percentage.toFixed(1));
      }
    });
    
    return dataPoint;
  });
};
