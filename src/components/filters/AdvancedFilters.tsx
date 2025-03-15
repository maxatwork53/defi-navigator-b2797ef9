
import React from 'react';
import TokenCategoryFilter from './TokenCategoryFilter';
import ApyRangeFilter from './ApyRangeFilter';
import DexFilter from './DexFilter';
import TvlRangeFilter from './TvlRangeFilter';
import ExcludeClosedToggle from './ExcludeClosedToggle';
import { FilterState } from './types';

type AdvancedFiltersProps = {
  filters: FilterState;
  onCategoryChange: (categoryId: string) => void;
  onApyRangeChange: (rangeId: string) => void;
  onDexChange: (dexId: string) => void;
  onTvlRangeChange: (rangeId: string) => void;
  onExcludeClosedChange: (checked: boolean) => void;
};

const AdvancedFilters = ({
  filters,
  onCategoryChange,
  onApyRangeChange,
  onDexChange,
  onTvlRangeChange,
  onExcludeClosedChange,
}: AdvancedFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Token Category */}
        <TokenCategoryFilter 
          selectedValue={filters.tokenCategory}
          onChange={onCategoryChange}
        />

        {/* APY Range */}
        <ApyRangeFilter 
          selectedValue={filters.apyRange}
          onChange={onApyRangeChange}
        />

        {/* DEX */}
        <DexFilter 
          selectedValue={filters.dex}
          onChange={onDexChange}
        />

        {/* TVL Range */}
        <TvlRangeFilter 
          selectedValue={filters.tvlRange}
          onChange={onTvlRangeChange}
        />
      </div>

      <ExcludeClosedToggle 
        checked={filters.excludeClosedPositions}
        onChange={onExcludeClosedChange}
      />
    </div>
  );
};

export default AdvancedFilters;
