
import React from 'react';
import { FilterOption } from './types';
import { Layers, Percent, Network, Database } from 'lucide-react';

// Network icons
export const networkIcons = {
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

export const networks: FilterOption[] = [
  { id: 'all', label: 'All Networks', icon: networkIcons.all },
];

export const tokenCategories: FilterOption[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'pure-stablecoin', label: 'Pure Stablecoin' },
  { id: 'half-stablecoin', label: 'Half Stablecoin' },
  { id: 'no-stablecoin', label: 'No Stablecoin' },
];

export const apyRanges: FilterOption[] = [
  { id: 'all', label: 'All APY Ranges' },
  { id: 'very-high', label: 'Very High (>100%)' },
  { id: 'high', label: 'High (20.1-100%)' },
  { id: 'normal', label: 'Normal (0-20%)' },
  { id: 'negative', label: 'Negative (<0%)' },
];

export const dexOptions: FilterOption[] = [
  { id: 'all', label: 'All DEXs' },
  { id: 'uniswap-v2', label: 'Uniswap V2' },
  { id: 'uniswap-v3', label: 'Uniswap V3' },
];

export const tvlRanges: FilterOption[] = [
  { id: 'all', label: 'All TVL Ranges' },
  { id: 'high', label: 'High (>$2M)' },
  { id: 'medium', label: 'Medium ($500K-$2M)' },
  { id: 'low', label: 'Low (<$500K)' },
];

export const filterIcons = {
  tokenCategory: <Layers className="w-4 h-4 text-muted-foreground" />,
  apyRange: <Percent className="w-4 h-4 text-muted-foreground" />,
  dex: <Network className="w-4 h-4 text-muted-foreground" />,
  tvlRange: <Database className="w-4 h-4 text-muted-foreground" />,
};
