
import React from 'react';
import { CircleIcon, CircleDot, Hexagon } from 'lucide-react';

export const mockPositionStats = {
  winning: {
    medianTimeHours: 168,  // 7 days
    medianUsdValue: 5280,
    medianRangePercentage: 76,
  },
  losing: {
    medianTimeHours: 72,  // 3 days
    medianUsdValue: 3120,
    medianRangePercentage: 42,
  },
};

export const mockTvlData = [
  { name: 'Jan', value: 5000000 },
  { name: 'Feb', value: 7500000 },
  { name: 'Mar', value: 6200000 },
  { name: 'Apr', value: 8100000 },
  { name: 'May', value: 9800000 },
  { name: 'Jun', value: 12200000 },
  { name: 'Jul', value: 15500000 },
];

export const mockComparisonData = [
  { name: 'Time in Position (hours)', winning: 168, losing: 72 },
  { name: 'USD Value ($)', winning: 5280, losing: 3120 },
  { name: 'Range Coverage (%)', winning: 76, losing: 42 },
];

export const mockHeatmapData = Array.from({ length: 25 }, (_, i) => {
  const x = 0.98 + (i % 5) * 0.01;
  const y = 0.98 + Math.floor(i / 5) * 0.01;
  
  // Generate higher values in the middle ranges (more realistic liquidity concentration)
  const distFromCenter = Math.sqrt(
    Math.pow(x - 1.005, 2) + Math.pow(y - 1.005, 2)
  );
  
  const value = Math.max(0, 10 - distFromCenter * 800) * 100000;
  
  return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)), value };
});

// Use Lucide React icons instead of raw SVG elements
export const networkIcons = {
  ethereum: () => <Hexagon className="w-full h-full" />,
  arbitrum: () => <CircleDot className="w-full h-full" />,
  base: () => <CircleIcon className="w-full h-full" />,
};

export const networks = [
  { id: 'ethereum', name: 'Ethereum', icon: networkIcons.ethereum() },
  { id: 'arbitrum', name: 'Arbitrum', icon: networkIcons.arbitrum() },
  { id: 'base', name: 'Base', icon: networkIcons.base() },
];
