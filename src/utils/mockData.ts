
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

export const networkIcons = {
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

export const networks = [
  { id: 'ethereum', name: 'Ethereum', icon: networkIcons.ethereum },
  { id: 'arbitrum', name: 'Arbitrum', icon: networkIcons.arbitrum },
  { id: 'base', name: 'Base', icon: networkIcons.base },
];
