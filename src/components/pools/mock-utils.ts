
import { Pool } from '@/data/mockPools';
import { mockPositionStats } from '@/utils/mockData';

export type PoolStats = {
  swapVolume: Array<{ period: string, value: number }>;
  swaps: Array<{ period: string, value: number }>;
  feesCollected: Array<{ period: string, value: number }>;
  tvlChange: Array<{ period: string, value: number }>;
  lpStats: {
    addressesCount: number;
    openPositionsCount: number;
    newPositions: Array<{
      period: string;
      opened: number;
      closed: number;
    }>;
  };
  positionStats: {
    overall: {
      value: {
        median: number;
        average: number;
        bottomQuartile: number;
        topQuartile: number;
      };
      priceRange: {
        median: number;
        average: number;
        bottomQuartile: number;
        topQuartile: number;
      };
      timeInPosition: {
        median: number;
        average: number;
        bottomQuartile: number;
        topQuartile: number;
      };
    };
    winning: {
      medianTimeHours: number;
      medianUsdValue: number;
      medianRangePercentage: number;
      percentage: number;
    };
    losing: {
      medianTimeHours: number;
      medianUsdValue: number;
      medianRangePercentage: number;
      percentage: number;
    };
  };
};

// Generate mock data for the expanded section
export const generateMockPoolStats = (pool: Pool): PoolStats => {
  // Time periods
  const periods = ['1d', '7d', '14d', '30d'];
  
  // Mock swap volume
  const swapVolume = periods.map(period => {
    const baseValue = pool.tvl * (Math.random() * 0.1); // 0-10% of TVL
    return { period, value: baseValue };
  });
  
  // Mock number of swaps
  const swaps = periods.map(period => {
    const baseValue = Math.floor(Math.random() * 1000) + 100;
    return { period, value: baseValue };
  });
  
  // Mock fees collected
  const feesCollected = periods.map(period => {
    const baseValue = pool.feesCollected * (Math.random() * 0.2); // 0-20% of total fees
    return { period, value: baseValue };
  });
  
  // Mock TVL change percentages
  const tvlChange = periods.map(period => {
    const changePercent = (Math.random() * 40) - 20; // -20% to +20%
    return { period, value: changePercent };
  });
  
  // Mock LP stats
  const lpStats = {
    addressesCount: Math.floor(Math.random() * 500) + 50,
    openPositionsCount: Math.floor(Math.random() * 1000) + 100,
    newPositions: periods.map(period => ({
      period,
      opened: Math.floor(Math.random() * 100) + 10,
      closed: Math.floor(Math.random() * 50) + 5
    }))
  };
  
  // Generate winning/losing percentages that add up to 100%
  const winningPercentage = 62.5; // 62.5%
  const losingPercentage = 37.5; // 37.5%
  
  // Mock position stats
  const positionStats = {
    overall: {
      value: {
        median: pool.tvl / (lpStats.openPositionsCount * 0.5),
        average: pool.tvl / lpStats.openPositionsCount,
        bottomQuartile: pool.tvl / (lpStats.openPositionsCount * 2),
        topQuartile: pool.tvl / (lpStats.openPositionsCount * 0.25)
      },
      priceRange: {
        median: Math.random() * 10 + 5, // 5-15%
        average: Math.random() * 15 + 10, // 10-25%
        bottomQuartile: Math.random() * 5 + 2, // 2-7%
        topQuartile: Math.random() * 20 + 15 // 15-35%
      },
      timeInPosition: {
        median: Math.floor(Math.random() * 168) + 24, // 1-8 days in hours
        average: Math.floor(Math.random() * 240) + 48, // 2-12 days in hours
        bottomQuartile: Math.floor(Math.random() * 72) + 12, // 0.5-3.5 days in hours
        topQuartile: Math.floor(Math.random() * 336) + 168 // 7-21 days in hours
      }
    },
    winning: {
      ...mockPositionStats.winning,
      percentage: winningPercentage
    },
    losing: {
      ...mockPositionStats.losing,
      percentage: losingPercentage
    }
  };
  
  return { swapVolume, swaps, feesCollected, tvlChange, lpStats, positionStats };
};
