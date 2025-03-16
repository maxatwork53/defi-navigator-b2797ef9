
import { useMemo } from 'react';
import { Pool, mockPools } from '@/data/mockPools';
import { FilterState } from '@/components/filters/types';

export const useFilteredPools = (filters: FilterState): Pool[] => {
  return useMemo(() => {
    return mockPools.filter(pool => {
      // Network filter
      if (filters.networks.length > 0 && !filters.networks.includes(pool.network)) {
        return false;
      }

      // DEX filter
      if (filters.dex.length > 0) {
        const dexMatches = filters.dex.some(dex => {
          if (dex === 'uniswap-v3') return pool.dex === 'Uniswap V3';
          if (dex === 'uniswap-v2') return pool.dex === 'Uniswap V2';
          return false;
        });
        if (!dexMatches) {
          return false;
        }
      }

      // TVL Range filter
      if (filters.tvlRange.length > 0) {
        const tvlMatches = filters.tvlRange.some(range => {
          if (range === 'high') return pool.tvl > 2000000;
          if (range === 'medium') return pool.tvl >= 500000 && pool.tvl <= 2000000;
          if (range === 'low') return pool.tvl < 500000;
          return false;
        });
        if (!tvlMatches) {
          return false;
        }
      }

      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          pool.name.toLowerCase().includes(query) ||
          pool.dex.toLowerCase().includes(query) ||
          networkNames[pool.network]?.toLowerCase().includes(query) ||
          pool.address.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [filters]);
};

// Map of network IDs to their display names for readability
const networkNames: Record<string, string> = {
  ethereum: 'Ethereum',
  arbitrum: 'Arbitrum',
  base: 'Base'
};
