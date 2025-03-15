import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FilterOptions, { FilterState } from '@/components/FilterOptions';

const PoolAnalytics = () => {
  const [filters, setFilters] = useState<FilterState>({
    networks: ['ethereum'],
    tokenCategory: null,
    apyRange: null,
    dex: null,
    tvlRange: null,
    excludeClosedPositions: true,
    searchQuery: '',
  });
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log('Filter changed:', newFilters);
    // Here you would typically fetch or filter data based on the new filters
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              Detailed pool analytics and metrics will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PoolAnalytics;
