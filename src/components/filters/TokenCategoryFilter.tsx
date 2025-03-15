
import React from 'react';
import { filterIcons, tokenCategories } from './constants';
import FilterDropdown from './FilterDropdown';

type TokenCategoryFilterProps = {
  selectedValue: string | null;
  onChange: (categoryId: string) => void;
};

const TokenCategoryFilter = ({ selectedValue, onChange }: TokenCategoryFilterProps) => {
  return (
    <FilterDropdown
      label="Token Category"
      options={tokenCategories}
      selectedValue={selectedValue}
      onChange={onChange}
      icon={filterIcons.tokenCategory}
    />
  );
};

export default TokenCategoryFilter;
