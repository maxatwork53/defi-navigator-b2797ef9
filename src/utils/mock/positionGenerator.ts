
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

// Create a stable seed based on pool ID to ensure consistent generation
const getStableSeed = (poolId: string): number => {
  let hash = 0;
  for (let i = 0; i < poolId.length; i++) {
    const char = poolId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Generate deterministic random number using seed
const getSeededRandom = (seed: number, index: number = 0): number => {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
};

/**
 * Generate a random mock token ID
 */
const generateTokenId = (seed: number, index: number): string => {
  return Math.floor(getSeededRandom(seed, index) * 10000000).toString();
};

/**
 * Generate a random age in hours (between 1 hour and 60 days)
 */
const generateAge = (seed: number, index: number): number => {
  // Between 1 hour and 60 days (1440 hours)
  return Math.floor(getSeededRandom(seed, index + 1) * 1440) + 1;
};

/**
 * Generate a random value invested (between $100 and $100,000)
 */
const generateValueInvested = (seed: number, index: number): number => {
  return getSeededRandom(seed, index + 2) * 99900 + 100; // Between $100 and $100,000
};

/**
 * Generate a random position fee (between 0.1% and 10% of value invested)
 */
const generatePositionFees = (valueInvested: number, seed: number, index: number): number => {
  return valueInvested * (getSeededRandom(seed, index + 3) * 0.099 + 0.001); // Between 0.1% and 10% of value invested
};

/**
 * Generate a random PNL (between -30% and +50% of value invested)
 */
const generatePnl = (valueInvested: number, seed: number, index: number): number => {
  return valueInvested * (getSeededRandom(seed, index + 4) * 0.8 - 0.3); // Between -30% and +50% of value invested
};

/**
 * Generate a random fee APR (between 0.5% and 100%)
 */
const generateFeeApr = (seed: number, index: number): number => {
  return getSeededRandom(seed, index + 5) * 99.5 + 0.5; // Between 0.5% and 100%
};

/**
 * Generates mock positions for the given pool IDs with deterministic results
 */
export const generateMockPositions = (poolIds: string[]): PoolPosition[] => {
  if (!poolIds.length) return [];

  // Generate between 1 and 5 positions per pool, but with stable results
  return poolIds.flatMap(poolId => {
    const seed = getStableSeed(poolId);
    const positionsCount = Math.floor(getSeededRandom(seed, 0) * 5) + 1;
    
    // Get a stable pool name and network based on the seed
    const poolNameIndex = Math.floor(getSeededRandom(seed, 1) * tokenPairs.length);
    const networkIndex = Math.floor(getSeededRandom(seed, 2) * networks.length);
    const poolName = tokenPairs[poolNameIndex];
    const network = networks[networkIndex];
    
    return Array.from({ length: positionsCount }, (_, index) => {
      const valueInvested = generateValueInvested(seed, index * 10);
      const positionFees = generatePositionFees(valueInvested, seed, index * 10);
      const pnl = generatePnl(valueInvested, seed, index * 10);
      const pnlPercentage = (pnl / valueInvested) * 100;
      const feeTierIndex = Math.floor(getSeededRandom(seed, index * 10 + 3) * feeTiers.length);
      
      return {
        id: `${poolId}-position-${index}`,
        tokenId: generateTokenId(seed, index * 10),
        poolId,
        poolName,
        network,
        feeTier: feeTiers[feeTierIndex],
        ageInHours: generateAge(seed, index * 10),
        valueInvested,
        positionFees,
        pnl,
        pnlPercentage,
        feeApr: generateFeeApr(seed, index * 10),
      };
    });
  });
};
