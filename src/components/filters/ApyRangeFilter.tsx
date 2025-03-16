
import React from 'react';
import { filterIcons, apyRanges } from './constants';
import FilterDropdown from './FilterDropdown';

type ApyRangeFilterProps = {
  selectedValue: string[];
  onChange: (rangeId: string) => void;
};

const ApyRangeFilter = ({ selectedValue, onChange }: ApyRangeFilterProps) => {
  return (
    <FilterDropdown
      label="APY Range"
      options={apyRanges}
      selectedValue={selectedValue}
      onChange={onChange}
      icon={filterIcons.apyRange}
    />
  );
};

export default ApyRangeFilter;
