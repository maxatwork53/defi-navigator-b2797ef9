
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Filter, ChevronDown } from 'lucide-react';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger
} from '@/components/ui/collapsible';

import SearchInput from './SearchInput';
import NetworkButtons from './NetworkButtons';
import AdvancedFilters from './AdvancedFilters';
import { FilterState, FilterOptionsProps } from './types';

const FilterOptions = ({ 
  onFilterChange, 
  className, 
  defaultNetwork = 'all'
}: FilterOptionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    networks: defaultNetwork === 'all' ? [] : [defaultNetwork],
    tokenCategory: null,
    apyRange: null,
    dex: null,
    tvlRange: null,
    excludeClosedPositions: true,
    searchQuery: '',
  });

  const handleNetworkChange = (networkId: string) => {
    let updatedNetworks: string[];

    if (networkId === 'all') {
      updatedNetworks = [];
    } else if (filters.networks.includes(networkId)) {
      updatedNetworks = filters.networks.filter(id => id !== networkId);
    } else {
      updatedNetworks = [...filters.networks, networkId];
    }

    const updatedFilters = { ...filters, networks: updatedNetworks };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleCategoryChange = (categoryId: string) => {
    const updatedFilters = { 
      ...filters, 
      tokenCategory: categoryId === 'all' ? null : categoryId 
    };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleApyRangeChange = (rangeId: string) => {
    const updatedFilters = { 
      ...filters, 
      apyRange: rangeId === 'all' ? null : rangeId 
    };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleDexChange = (dexId: string) => {
    const updatedFilters = { 
      ...filters, 
      dex: dexId === 'all' ? null : dexId 
    };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleTvlRangeChange = (rangeId: string) => {
    const updatedFilters = { 
      ...filters, 
      tvlRange: rangeId === 'all' ? null : rangeId 
    };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleExcludeClosedChange = (checked: boolean) => {
    const updatedFilters = { ...filters, excludeClosedPositions: checked };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters, searchQuery: e.target.value };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.networks.length > 0) count++;
    if (filters.tokenCategory) count++;
    if (filters.apyRange) count++;
    if (filters.dex) count++;
    if (filters.tvlRange) count++;
    if (filters.searchQuery) count++;
    return count;
  };
  
  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <SearchInput
          value={filters.searchQuery}
          onChange={handleSearchChange}
        />
        
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="w-full sm:w-auto"
        >
          <div className="flex gap-2">
            <CollapsibleTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-primary rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
              </button>
            </CollapsibleTrigger>
            
            <NetworkButtons 
              selectedNetworks={filters.networks}
              onChange={handleNetworkChange}
            />
          </div>
          
          <CollapsibleContent className="mt-4 space-y-4 bg-white p-4 rounded-md border border-border shadow-sm">
            <AdvancedFilters 
              filters={filters}
              onCategoryChange={handleCategoryChange}
              onApyRangeChange={handleApyRangeChange}
              onDexChange={handleDexChange}
              onTvlRangeChange={handleTvlRangeChange}
              onExcludeClosedChange={handleExcludeClosedChange}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default FilterOptions;
