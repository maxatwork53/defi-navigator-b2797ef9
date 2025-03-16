
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
  
  // Generate mock TVL trends with all pools starting at 100% on day 1
  return dates.map((date, dayIndex) => {
    const dataPoint: any = { date };
    
    poolsToShow.forEach(pool => {
      // All pools start at 100% on day 1 (first day)
      if (dayIndex === 0) {
        dataPoint[pool.name] = 100;
      } else {
        // Pool-specific trend factor (some pools grow, others decline)
        // Using pool.id to create a deterministic but varied behavior per pool
        const poolTrendFactor = (parseInt(pool.id, 36) % 10) / 10 - 0.3; // -0.3 to 0.7 range
        
        // The volatility factor determines how much the TVL fluctuates day to day
        const volatilityFactor = 0.015; // 1.5% maximum daily fluctuation
        
        // Get previous day's value
        const prevDayValue = dayIndex > 0 ? 
          parseFloat(dates.map((d, i) => ({ date: d, index: i }))
            .filter(d => d.index === dayIndex - 1)
            .map(d => {
              // This is a bit hacky but works for our mock data
              const prevDataPoint = dates.map((date, i) => ({ 
                date, 
                value: precalculatedChartData.get(`priceRange_${pools.map(p => p.id).join('_')}`) ? 
                  precalculatedChartData.get(`priceRange_${pools.map(p => p.id).join('_')}`)[i][pool.name] : 
                  100 
              }))
              .find(point => point.date === d.date)?.value || 100;
              
              return prevDataPoint;
            })[0] || 100) : 100;
        
        // Random daily change with slight trend bias
        const dailyChange = (Math.random() * 2 - 1) * volatilityFactor + poolTrendFactor / days;
        
        // Calculate new value with compounding effect
        const newValue = prevDayValue * (1 + dailyChange);
        
        // Assign the percentage value to this pool for this day
        dataPoint[pool.name] = parseFloat(newValue.toFixed(1));
      }
    });
    
    return dataPoint;
  });
};
