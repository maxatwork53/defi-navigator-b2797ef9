
import React from 'react';
import { filterIcons, tvlRanges } from './constants';
import FilterDropdown from './FilterDropdown';

type TvlRangeFilterProps = {
  selectedValue: string | null;
  onChange: (rangeId: string) => void;
};

const TvlRangeFilter = ({ selectedValue, onChange }: TvlRangeFilterProps) => {
  return (
    <FilterDropdown
      label="TVL Range"
      options={tvlRanges}
      selectedValue={selectedValue}
      onChange={onChange}
      icon={filterIcons.tvlRange}
    />
  );
};

export default TvlRangeFilter;
