
export type FilterState = {
  networks: string[];
  tokenCategory: string[];
  apyRange: string[];
  dex: string[];
  tvlRange: string[];
  excludeClosedPositions: boolean;
  searchQuery: string;
};

export type FilterOption = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export type FilterOptionsProps = {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
  defaultNetwork?: string;
};
