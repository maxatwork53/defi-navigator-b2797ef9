
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NetworkSelector from '@/components/NetworkSelector';
import StatCard from '@/components/StatCard';
import ComparisonChart from '@/components/ComparisonChart';
import AreaChart from '@/components/AreaChart';
import HeatmapChart from '@/components/HeatmapChart';
import { AlertCircle, ArrowUpRight, Clock, DollarSign, Percent, Wallet } from 'lucide-react';

const networkIcons = {
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
  { id: 'ethereum', name: 'Ethereum', icon: networkIcons.ethereum },
  { id: 'arbitrum', name: 'Arbitrum', icon: networkIcons.arbitrum },
  { id: 'base', name: 'Base', icon: networkIcons.base },
];

// Mock data
const mockPositionStats = {
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

const mockTvlData = [
  { name: 'Jan', value: 5000000 },
  { name: 'Feb', value: 7500000 },
  { name: 'Mar', value: 6200000 },
  { name: 'Apr', value: 8100000 },
  { name: 'May', value: 9800000 },
  { name: 'Jun', value: 12200000 },
  { name: 'Jul', value: 15500000 },
];

const mockComparisonData = [
  { name: 'Time in Position (hours)', winning: 168, losing: 72 },
  { name: 'USD Value ($)', winning: 5280, losing: 3120 },
  { name: 'Range Coverage (%)', winning: 76, losing: 42 },
];

const mockHeatmapData = Array.from({ length: 25 }, (_, i) => {
  const x = 0.98 + (i % 5) * 0.01;
  const y = 0.98 + Math.floor(i / 5) * 0.01;
  
  // Generate higher values in the middle ranges (more realistic liquidity concentration)
  const distFromCenter = Math.sqrt(
    Math.pow(x - 1.005, 2) + Math.pow(y - 1.005, 2)
  );
  
  const value = Math.max(0, 10 - distFromCenter * 800) * 100000;
  
  return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)), value };
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number) => {
  return `${value}%`;
};

const formatDuration = (hours: number) => {
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  
  if (days === 0) {
    return `${hours}h`;
  }
  
  return `${days}d ${remainingHours}h`;
};

const Index = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold">DeFi Liquidity Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Insights and metrics for Uniswap V3 liquidity positions
            </p>
          </div>
          <NetworkSelector
            networks={networks}
            selectedNetwork={selectedNetwork}
            onNetworkChange={setSelectedNetwork}
            className="animate-fade-in"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Value Locked"
            value={formatCurrency(15500000)}
            icon={<DollarSign className="w-5 h-5" />}
            trend="up"
            trendValue="26.8% from last month"
            className="sm:col-span-2 lg:col-span-1"
          />
          <StatCard
            title="Active Positions"
            value="3,765"
            icon={<Wallet className="w-5 h-5" />}
            trend="up"
            trendValue="12.4% from last month"
          />
          <StatCard
            title="Out-of-Range Alerts"
            value="168"
            icon={<AlertCircle className="w-5 h-5" />}
            trend="down"
            trendValue="5.2% from last month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 lg:col-span-1 animate-slide-in-up">
            <h2 className="text-lg font-semibold mb-4">Position Metrics</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Median Time in Position</h3>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center text-success">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                      <span className="text-xs">Winning</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {formatDuration(mockPositionStats.winning.medianTimeHours)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-destructive">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                      <span className="text-xs">Losing</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {formatDuration(mockPositionStats.losing.medianTimeHours)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <DollarSign className="w-4 h-4 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Median USD Value</h3>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center text-success">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                      <span className="text-xs">Winning</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {formatCurrency(mockPositionStats.winning.medianUsdValue)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-destructive">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                      <span className="text-xs">Losing</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {formatCurrency(mockPositionStats.losing.medianUsdValue)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <Percent className="w-4 h-4 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Median Range Coverage</h3>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center text-success">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                      <span className="text-xs">Winning</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {formatPercentage(mockPositionStats.winning.medianRangePercentage)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-destructive">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-1 transform rotate-90" />
                      <span className="text-xs">Losing</span>
                    </div>
                    <p className="text-xl font-semibold mt-1">
                      {formatPercentage(mockPositionStats.losing.medianRangePercentage)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <ComparisonChart 
            data={mockComparisonData}
            title="Winning vs Losing Positions"
            description="Comparison of key metrics between winning and losing positions"
            className="lg:col-span-2"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AreaChart 
            data={mockTvlData}
            title="Total Value Locked"
            description="Trend of TVL across all pools"
          />
          <HeatmapChart 
            data={mockHeatmapData}
            title="Liquidity Concentration"
            description="Distribution of liquidity across price ranges"
            xLabel="Price Lower"
            yLabel="Price Upper"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
