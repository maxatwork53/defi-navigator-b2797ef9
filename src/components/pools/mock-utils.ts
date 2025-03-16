
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
  // Time periods in order: 24h, 7d, 14d, 30d
  const periods = ['1d', '7d', '14d', '30d'];
  
  // Base value multipliers for different time periods to ensure cumulative growth
  const volumeMultipliers = [1, 5, 9, 20];
  const swapsMultipliers = [1, 6, 12, 25];
  const feesMultipliers = [1, 6, 11, 22];
  
  // Mock swap volume (cumulative)
  const baseVolumePerDay = pool.tvl * 0.01; // 1% of TVL per day
  const swapVolume = periods.map((period, index) => {
    return { 
      period, 
      value: baseVolumePerDay * volumeMultipliers[index]
    };
  });
  
  // Mock number of swaps (cumulative)
  const baseSwapsPerDay = Math.floor(Math.random() * 100) + 50;
  const swaps = periods.map((period, index) => {
    return { 
      period, 
      value: baseSwapsPerDay * swapsMultipliers[index]
    };
  });
  
  // Mock fees collected (cumulative)
  const baseFeesPerDay = pool.feesCollected * 0.005; // 0.5% of total fees per day
  const feesCollected = periods.map((period, index) => {
    return { 
      period, 
      value: baseFeesPerDay * feesMultipliers[index]
    };
  });
  
  // Mock TVL change percentages (not cumulative since these are relative percentages)
  const tvlChange = [
    { period: periods[0], value: (Math.random() * 6) - 3 },        // -3% to +3% for 24h
    { period: periods[1], value: (Math.random() * 10) - 5 },       // -5% to +5% for 7d
    { period: periods[2], value: (Math.random() * 16) - 8 },       // -8% to +8% for 14d
    { period: periods[3], value: (Math.random() * 20) - 10 },      // -10% to +10% for 30d
  ];
  
  // Position change multipliers
  const positionOpenMultipliers = [1, 4, 7, 12];
  const positionCloseMultipliers = [1, 3, 6, 9];
  
  // Mock LP stats
  const baseNewPositionsPerDay = Math.floor(Math.random() * 10) + 5;
  const baseClosedPositionsPerDay = Math.floor(Math.random() * 5) + 2;
  
  const lpStats = {
    addressesCount: Math.floor(Math.random() * 500) + 50,
    openPositionsCount: Math.floor(Math.random() * 1000) + 100,
    newPositions: periods.map((period, index) => ({
      period,
      opened: baseNewPositionsPerDay * positionOpenMultipliers[index],
      closed: baseClosedPositionsPerDay * positionCloseMultipliers[index]
    }))
  };
  
  // Generate winning/losing percentages that add up to 100%
  const poolFactor = (pool.id.charCodeAt(0) % 10) / 10; // Use pool ID to create variation
  const winningPercentage = 55 + (poolFactor * 15); // 55-70%
  const losingPercentage = 100 - winningPercentage; // 30-45%
  
  // Calculate median range percentages based on pool volume
  const rangeFactorWinning = 5 + ((pool.volume / 5000000) * 10); // 5-15% based on volume
  const rangeFactorLosing = 8 + ((pool.volume / 5000000) * 12); // 8-20% based on volume
  
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
      medianTimeHours: Math.floor(Math.random() * 240) + 72, // 3-13 days in hours
      medianUsdValue: (pool.tvl / lpStats.openPositionsCount) * 1.2, // 20% higher than average
      medianRangePercentage: rangeFactorWinning,
      percentage: winningPercentage
    },
    losing: {
      medianTimeHours: Math.floor(Math.random() * 120) + 24, // 1-6 days in hours
      medianUsdValue: (pool.tvl / lpStats.openPositionsCount) * 0.8, // 20% lower than average
      medianRangePercentage: rangeFactorLosing,
      percentage: losingPercentage
    }
  };
  
  return { swapVolume, swaps, feesCollected, tvlChange, lpStats, positionStats };
};
