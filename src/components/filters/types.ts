
export type FilterState = {
  networks: string[];
  tokenCategory: string | null;
  apyRange: string | null;
  dex: string | null;
  tvlRange: string | null;
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
