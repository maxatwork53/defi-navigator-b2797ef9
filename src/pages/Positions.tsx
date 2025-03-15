
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import FilterOptions, { FilterState } from '@/components/FilterOptions';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon } from 'lucide-react';

// Mock position data
const mockPositions = [
  {
    id: '1',
    pool: 'ETH/USDC',
    status: 'in-range',
    value: 12540.87,
    feesEarned: 185.42,
    range: { lower: 0.98, upper: 1.02, current: 1.001 },
    timeInPosition: '7d 12h',
    rangePercentage: 82,
    totalReturn: 'positive',
    returnValue: 8.2,
  },
  {
    id: '2',
    pool: 'ETH/USDT',
    status: 'in-range',
    value: 8765.32,
    feesEarned: 132.68,
    range: { lower: 0.97, upper: 1.03, current: 1.001 },
    timeInPosition: '4d 6h',
    rangePercentage: 78,
    totalReturn: 'positive',
    returnValue: 6.5,
  },
  {
    id: '3',
    pool: 'WBTC/ETH',
    status: 'out-of-range',
    value: 15230.45,
    feesEarned: 98.75,
    range: { lower: 16.2, upper: 16.8, current: 16.9 },
    timeInPosition: '10d 3h',
    rangePercentage: 0,
    totalReturn: 'negative',
    returnValue: 2.1,
  },
  {
    id: '4',
    pool: 'ETH/DAI',
    status: 'in-range',
    value: 6780.90,
    feesEarned: 87.23,
    range: { lower: 0.99, upper: 1.01, current: 0.995 },
    timeInPosition: '3d 8h',
    rangePercentage: 62,
    totalReturn: 'positive',
    returnValue: 4.8,
  },
  {
    id: '5',
    pool: 'MATIC/ETH',
    status: 'out-of-range',
    value: 4530.25,
    feesEarned: 45.60,
    range: { lower: 0.00028, upper: 0.00033, current: 0.00027 },
    timeInPosition: '6d 15h',
    rangePercentage: 0,
    totalReturn: 'negative',
    returnValue: 1.2,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const RangeIndicator = ({ range, className }: { range: { lower: number, upper: number, current: number }, className?: string }) => {
  // Calculate where the current price is in the range
  const rangeSize = range.upper - range.lower;
  const currentPosition = (range.current - range.lower) / rangeSize;
  
  // Check if price is within range
  const isInRange = range.current >= range.lower && range.current <= range.upper;
  
  return (
    <div className={cn("h-2 bg-secondary rounded-full overflow-hidden", className)}>
      {isInRange ? (
        <div className="h-full bg-primary relative overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${Math.max(Math.min(currentPosition * 100, 100), 0)}%` }}
          >
            <div 
              className="absolute top-0 h-full w-1 bg-white" 
              style={{ left: `${Math.max(Math.min(currentPosition * 100, 100), 0)}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="h-full bg-muted relative">
          <div 
            className="absolute top-0 h-full w-1 bg-destructive" 
            style={{ 
              left: range.current < range.lower 
                ? '0%' 
                : '100%' 
            }}
          />
        </div>
      )}
    </div>
  );
};

const Positions = () => {
  const [filters, setFilters] = useState<FilterState>({
    networks: ['ethereum'],
    tokenCategory: null,
    apyRange: null,
    dex: null,
    tvlRange: null,
    excludeClosedPositions: true,
    searchQuery: '',
  });
  
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log('Filter changed:', newFilters);
    // Here you would typically fetch or filter data based on the new filters
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">Your Positions</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze your active liquidity positions
          </p>
        </div>

        <FilterOptions 
          onFilterChange={handleFilterChange}
          className="animate-fade-in mb-8"
          defaultNetwork="ethereum"
        />

        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden mb-8 animate-slide-in-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Pool</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Fees Earned</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Price Range</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Return</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockPositions.map((position) => (
                  <tr key={position.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{position.pool}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        position.status === 'in-range' 
                          ? "bg-success/10 text-success" 
                          : "bg-destructive/10 text-destructive"
                      )}>
                        {position.status === 'in-range' ? 'In Range' : 'Out of Range'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(position.value)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(position.feesEarned)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <RangeIndicator range={position.range} className="w-32" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{position.range.lower}</span>
                          <span>{position.range.upper}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {position.timeInPosition}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "font-medium",
                        position.totalReturn === 'positive' ? "text-success" : "text-destructive"
                      )}>
                        {position.totalReturn === 'positive' ? '+' : '-'}{position.returnValue}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-primary hover:text-primary/80 transition-colors">
                        <ExternalLinkIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Positions;
