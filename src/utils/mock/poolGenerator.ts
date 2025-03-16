
import { v4 as uuidv4 } from 'uuid';
import { TrackedPool } from '@/components/positions/PositionsPoolTable';

// List of token pairs for random selection
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

const dexes = ["Uniswap V3", "Uniswap V2", "SushiSwap", "Curve", "Balancer"];
const networks = ["ethereum", "arbitrum", "base"];
const fees = ["0.01%", "0.05%", "0.3%", "1%"];

/**
 * Generates a mock pool based on the search query
 * In a real app, this would be replaced with actual API calls
 */
export const generateMockPool = (searchQuery: string): TrackedPool => {
  // Check if the search query resembles an address
  const isAddress = searchQuery.startsWith('0x') && searchQuery.length > 10;
  
  // Generate a pool name - if the search query is not an address, use it as part of the name
  let poolName;
  if (isAddress) {
    // If it's an address, generate a random pool name
    poolName = tokenPairs[Math.floor(Math.random() * tokenPairs.length)];
  } else {
    // If it's not an address, try to incorporate the search query
    const searchTerms = searchQuery.toUpperCase().split(/[^a-zA-Z0-9]/);
    
    // If search contains a token symbol, create a pair with it
    const validToken = searchTerms.find(term => term.length >= 2 && term.length <= 5);
    
    if (validToken) {
      const commonTokens = ["ETH", "USDC", "USDT", "DAI", "WBTC"];
      const pairedToken = commonTokens[Math.floor(Math.random() * commonTokens.length)];
      poolName = validToken === pairedToken 
        ? `${validToken}-${commonTokens[(commonTokens.indexOf(pairedToken) + 1) % commonTokens.length]}`
        : `${validToken}-${pairedToken}`;
    } else {
      // Fall back to a random pair
      poolName = tokenPairs[Math.floor(Math.random() * tokenPairs.length)];
    }
  }

  // Generate random values for the pool
  const tvl = Math.random() * 10000000 + 100000; // Between $100K and $10M
  const volume = tvl * (Math.random() * 0.2 + 0.05); // 5-25% of TVL
  const feesCollected = volume * (Math.random() * 0.01 + 0.001); // 0.1-1.1% of volume
  
  // Generate a mock address if the search query is not an address
  const address = isAddress 
    ? searchQuery 
    : `0x${Array.from({length: 40}, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join('')}`;

  return {
    id: uuidv4(),
    name: poolName,
    address: address,
    network: networks[Math.floor(Math.random() * networks.length)],
    dex: dexes[Math.floor(Math.random() * dexes.length)],
    tvl,
    volume,
    feesCollected,
    fee: fees[Math.floor(Math.random() * fees.length)],
    added: new Date()
  };
};
