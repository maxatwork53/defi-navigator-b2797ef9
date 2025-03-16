
import { v4 as uuidv4 } from 'uuid';
import { PoolPosition } from '@/components/positions/PoolPositionsTable';

// List of fee tiers
const feeTiers = ["0.01%", "0.05%", "0.3%", "1%"];

// Networks mapping
const networks = ["ethereum", "arbitrum", "base"];

// Token pairs for naming
const tokenPairs = [
  "ETH-USDC",
  "WBTC-ETH",
  "USDT-DAI",
  "ETH-DAI",
  "LINK-ETH",
  "UNI-ETH",
  "AAVE-ETH",
  "MATIC-ETH",
  "SUSHI-ETH",
  "COMP-ETH"
];

/**
 * Generate a random mock token ID
 */
const generateTokenId = () => {
  return Math.floor(Math.random() * 10000000).toString();
};

/**
 * Generate a random age in hours (between 1 hour and 60 days)
 */
const generateAge = () => {
  // Between 1 hour and 60 days (1440 hours)
  return Math.floor(Math.random() * 1440) + 1;
};

/**
 * Generate a random value invested (between $100 and $100,000)
 */
const generateValueInvested = () => {
  return Math.random() * 99900 + 100; // Between $100 and $100,000
};

/**
 * Generate a random position fee (between 0.1% and 10% of value invested)
 */
const generatePositionFees = (valueInvested: number) => {
  return valueInvested * (Math.random() * 0.099 + 0.001); // Between 0.1% and 10% of value invested
};

/**
 * Generate a random PNL (between -30% and +50% of value invested)
 */
const generatePnl = (valueInvested: number) => {
  return valueInvested * (Math.random() * 0.8 - 0.3); // Between -30% and +50% of value invested
};

/**
 * Generate a random fee APR (between 0.5% and 100%)
 */
const generateFeeApr = () => {
  return Math.random() * 99.5 + 0.5; // Between 0.5% and 100%
};

/**
 * Generates mock positions for the given pool IDs
 */
export const generateMockPositions = (poolIds: string[]): PoolPosition[] => {
  if (!poolIds.length) return [];

  // Generate between 1 and 5 positions per pool
  return poolIds.flatMap(poolId => {
    const positionsCount = Math.floor(Math.random() * 5) + 1;
    const poolName = tokenPairs[Math.floor(Math.random() * tokenPairs.length)];
    const network = networks[Math.floor(Math.random() * networks.length)];
    
    return Array.from({ length: positionsCount }, () => {
      const valueInvested = generateValueInvested();
      const positionFees = generatePositionFees(valueInvested);
      const pnl = generatePnl(valueInvested);
      const pnlPercentage = (pnl / valueInvested) * 100;
      
      return {
        id: uuidv4(),
        tokenId: generateTokenId(),
        poolId,
        poolName,
        network,
        feeTier: feeTiers[Math.floor(Math.random() * feeTiers.length)],
        ageInHours: generateAge(),
        valueInvested,
        positionFees,
        pnl,
        pnlPercentage,
        feeApr: generateFeeApr(),
      };
    });
  });
};
