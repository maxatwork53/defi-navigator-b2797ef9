
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Filter,
  Search,
  ChevronDown,
  Database,
  Percent,
  Layers,
  Network
} from 'lucide-react';

type FilterOptionsProps = {
  onFilterChange?: (filters: FilterState) => void;
  className?: string;
  defaultNetwork?: string;
};

export type FilterState = {
  networks: string[];
  tokenCategory: string | null;
  apyRange: string | null;
  dex: string | null;
  tvlRange: string | null;
  excludeClosedPositions: boolean;
  searchQuery: string;
};

const networkIcons = {
  all: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 6V18M6 12H18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ethereum: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 1.75L5.75 12.25L12 16L18.25 12.25L12 1.75Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.75 13.5L12 22.25L18.25 13.5L12 17.5L5.75 13.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  arbitrum: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15.5 9L12.5 15.5L8.5 9L12 12L15.5 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  base: (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

const networks = [
  { id: 'all', name: 'All Networks', icon: networkIcons.all },
  { id: 'ethereum', name: 'Ethereum', icon: networkIcons.ethereum },
  { id: 'arbitrum', name: 'Arbitrum', icon: networkIcons.arbitrum },
  { id: 'base', name: 'Base', icon: networkIcons.base },
];

const tokenCategories = [
  { id: 'all', label: 'All Categories' },
  { id: 'pure-stablecoin', label: 'Pure Stablecoin' },
  { id: 'half-stablecoin', label: 'Half Stablecoin' },
  { id: 'no-stablecoin', label: 'No Stablecoin' },
];

const apyRanges = [
  { id: 'all', label: 'All APY Ranges' },
  { id: 'very-high', label: 'Very High (>100%)' },
  { id: 'high', label: 'High (20.1-100%)' },
  { id: 'normal', label: 'Normal (0-20%)' },
  { id: 'negative', label: 'Negative (<0%)' },
];

const dexOptions = [
  { id: 'all', label: 'All DEXs' },
  { id: 'uniswap-v2', label: 'Uniswap V2' },
  { id: 'uniswap-v3', label: 'Uniswap V3' },
];

const tvlRanges = [
  { id: 'all', label: 'All TVL Ranges' },
  { id: 'high', label: 'High (>$2M)' },
  { id: 'medium', label: 'Medium ($500K-$2M)' },
  { id: 'low', label: 'Low (<$500K)' },
];

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
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search pools, tokens, addresses..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full"
          />
          <div className="absolute left-3 top-2.5 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
        </div>
        
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
            
            <div className="flex flex-wrap gap-2">
              {/* Network filter buttons (always visible) */}
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => handleNetworkChange(network.id)}
                  className={cn(
                    "flex items-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
                    network.id === 'all' && filters.networks.length === 0
                      ? "bg-primary text-primary-foreground"
                      : filters.networks.includes(network.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-foreground/80"
                  )}
                >
                  <span className="w-4 h-4">{network.icon}</span>
                  <span className="hidden md:inline">{network.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <CollapsibleContent className="mt-4 space-y-4 bg-white p-4 rounded-md border border-border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Token Category */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 rounded border text-sm">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {filters.tokenCategory 
                          ? tokenCategories.find(c => c.id === filters.tokenCategory)?.label 
                          : 'Token Category'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60">
                    <DropdownMenuLabel>Token Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {tokenCategories.map((category) => (
                        <DropdownMenuItem 
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={cn(
                            "cursor-pointer",
                            (category.id === 'all' && !filters.tokenCategory) || 
                            filters.tokenCategory === category.id 
                              ? "bg-primary/10" 
                              : ""
                          )}
                        >
                          {category.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* APY Range */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 rounded border text-sm">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {filters.apyRange 
                          ? apyRanges.find(c => c.id === filters.apyRange)?.label 
                          : 'APY Range'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60">
                    <DropdownMenuLabel>APY Range</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {apyRanges.map((range) => (
                        <DropdownMenuItem 
                          key={range.id}
                          onClick={() => handleApyRangeChange(range.id)}
                          className={cn(
                            "cursor-pointer",
                            (range.id === 'all' && !filters.apyRange) || 
                            filters.apyRange === range.id 
                              ? "bg-primary/10" 
                              : ""
                          )}
                        >
                          {range.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* DEX */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 rounded border text-sm">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {filters.dex 
                          ? dexOptions.find(c => c.id === filters.dex)?.label 
                          : 'DEX'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60">
                    <DropdownMenuLabel>DEX</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {dexOptions.map((dex) => (
                        <DropdownMenuItem 
                          key={dex.id}
                          onClick={() => handleDexChange(dex.id)}
                          className={cn(
                            "cursor-pointer",
                            (dex.id === 'all' && !filters.dex) || 
                            filters.dex === dex.id 
                              ? "bg-primary/10" 
                              : ""
                          )}
                        >
                          {dex.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* TVL Range */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 rounded border text-sm">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-muted-foreground" />
                      <span>
                        {filters.tvlRange 
                          ? tvlRanges.find(c => c.id === filters.tvlRange)?.label 
                          : 'TVL Range'}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60">
                    <DropdownMenuLabel>TVL Range</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {tvlRanges.map((range) => (
                        <DropdownMenuItem 
                          key={range.id}
                          onClick={() => handleTvlRangeChange(range.id)}
                          className={cn(
                            "cursor-pointer",
                            (range.id === 'all' && !filters.tvlRange) || 
                            filters.tvlRange === range.id 
                              ? "bg-primary/10" 
                              : ""
                          )}
                        >
                          {range.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="exclude-closed" 
                checked={filters.excludeClosedPositions}
                onCheckedChange={handleExcludeClosedChange}
              />
              <label
                htmlFor="exclude-closed"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Exclude Closed Positions
              </label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default FilterOptions;
