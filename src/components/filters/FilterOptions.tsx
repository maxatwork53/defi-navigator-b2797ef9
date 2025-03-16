
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
    tokenCategory: [],
    apyRange: [],
    dex: [],
    tvlRange: [],
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
    let updatedCategories: string[];
    
    if (categoryId === 'all') {
      updatedCategories = [];
    } else if (filters.tokenCategory.includes(categoryId)) {
      updatedCategories = filters.tokenCategory.filter(id => id !== categoryId);
    } else {
      updatedCategories = [...filters.tokenCategory, categoryId];
    }
    
    const updatedFilters = { ...filters, tokenCategory: updatedCategories };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleApyRangeChange = (rangeId: string) => {
    let updatedRanges: string[];
    
    if (rangeId === 'all') {
      updatedRanges = [];
    } else if (filters.apyRange.includes(rangeId)) {
      updatedRanges = filters.apyRange.filter(id => id !== rangeId);
    } else {
      updatedRanges = [...filters.apyRange, rangeId];
    }
    
    const updatedFilters = { ...filters, apyRange: updatedRanges };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleDexChange = (dexId: string) => {
    let updatedDexes: string[];
    
    if (dexId === 'all') {
      updatedDexes = [];
    } else if (filters.dex.includes(dexId)) {
      updatedDexes = filters.dex.filter(id => id !== dexId);
    } else {
      updatedDexes = [...filters.dex, dexId];
    }
    
    const updatedFilters = { ...filters, dex: updatedDexes };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleTvlRangeChange = (rangeId: string) => {
    let updatedRanges: string[];
    
    if (rangeId === 'all') {
      updatedRanges = [];
    } else if (filters.tvlRange.includes(rangeId)) {
      updatedRanges = filters.tvlRange.filter(id => id !== rangeId);
    } else {
      updatedRanges = [...filters.tvlRange, rangeId];
    }
    
    const updatedFilters = { ...filters, tvlRange: updatedRanges };
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
    if (filters.tokenCategory.length > 0) count++;
    if (filters.apyRange.length > 0) count++;
    if (filters.dex.length > 0) count++;
    if (filters.tvlRange.length > 0) count++;
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
          
          <CollapsibleContent className="mt-4 space-y-4 bg-white dark:bg-gray-800 p-4 rounded-md border border-border dark:border-gray-700 shadow-sm">
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
