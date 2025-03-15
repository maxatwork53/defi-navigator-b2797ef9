
import React from 'react';
import { filterIcons, tokenCategories, apyRanges, dexOptions, tvlRanges } from './constants';
import FilterDropdown from './FilterDropdown';
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
        <FilterDropdown
          label="Token Category"
          options={tokenCategories}
          selectedValue={filters.tokenCategory}
          onChange={onCategoryChange}
          icon={filterIcons.tokenCategory}
        />

        {/* APY Range */}
        <FilterDropdown
          label="APY Range"
          options={apyRanges}
          selectedValue={filters.apyRange}
          onChange={onApyRangeChange}
          icon={filterIcons.apyRange}
        />

        {/* DEX */}
        <FilterDropdown
          label="DEX"
          options={dexOptions}
          selectedValue={filters.dex}
          onChange={onDexChange}
          icon={filterIcons.dex}
        />

        {/* TVL Range */}
        <FilterDropdown
          label="TVL Range"
          options={tvlRanges}
          selectedValue={filters.tvlRange}
          onChange={onTvlRangeChange}
          icon={filterIcons.tvlRange}
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
