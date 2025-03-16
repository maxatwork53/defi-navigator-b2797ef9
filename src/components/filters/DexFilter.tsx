
import React from 'react';
import { filterIcons, dexOptions } from './constants';
import FilterDropdown from './FilterDropdown';

type DexFilterProps = {
  selectedValue: string[];
  onChange: (dexId: string) => void;
};

const DexFilter = ({ selectedValue, onChange }: DexFilterProps) => {
  return (
    <FilterDropdown
      label="DEX"
      options={dexOptions}
      selectedValue={selectedValue}
      onChange={onChange}
      icon={filterIcons.dex}
    />
  );
};

export default DexFilter;
