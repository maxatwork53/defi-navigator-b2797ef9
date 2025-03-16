
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FilterOptions from '@/components/FilterOptions';
import { FilterState } from '@/components/filters/types';
import PoolsTable from '@/components/pools/PoolsTable';
import { useFilteredPools } from '@/hooks/use-filtered-pools';

const PoolAnalytics = () => {
  const [filters, setFilters] = useState<FilterState>({
    networks: ['ethereum'],
    tokenCategory: [],
    apyRange: [],
    dex: [],
    tvlRange: [],
    excludeClosedPositions: true,
    searchQuery: ''
  });
  
  const pools = useFilteredPools(filters);
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log('Filter changed:', newFilters);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">Pool Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed metrics and insights for liquidity pools
          </p>
        </div>
        
        <FilterOptions 
          onFilterChange={handleFilterChange} 
          className="animate-fade-in mb-8" 
          defaultNetwork="ethereum" 
        />
        
        <div className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Liquidity Pools</h2>
          <PoolsTable pools={pools} />
        </div>
      </div>
    </Layout>
  );
};

export default PoolAnalytics;
