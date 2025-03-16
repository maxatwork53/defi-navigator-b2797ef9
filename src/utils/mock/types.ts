
import { Pool } from '@/data/mockPools';

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
