
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NetworkSelector from '@/components/NetworkSelector';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

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

// Mock data for position performance metrics
const mockPerformanceData = [
  { name: '1d', winning: 2.3, losing: -1.5 },
  { name: '1w', winning: 8.7, losing: -4.2 },
  { name: '1m', winning: 18.5, losing: -9.8 },
  { name: '3m', winning: 32.6, losing: -15.3 },
  { name: '1y', winning: 76.2, losing: -28.7 },
];

// Mock data for position size distribution
const mockSizeDistributionData = [
  { size: '$0-$1K', count: 320 },
  { size: '$1K-$5K', count: 580 },
  { size: '$5K-$10K', count: 450 },
  { size: '$10K-$50K', count: 210 },
  { size: '$50K-$100K', count: 120 },
  { size: '$100K+', count: 80 },
];

const PositionAnalytics = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold">Position Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Detailed analytics and metrics for liquidity positions
            </p>
          </div>
          <NetworkSelector
            networks={networks}
            selectedNetwork={selectedNetwork}
            onNetworkChange={setSelectedNetwork}
            className="animate-fade-in"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={cn("chart-container animate-slide-in-up")}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Position Performance</h3>
              <p className="text-sm text-muted-foreground mt-1">Average returns for winning vs losing positions over time</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockPerformanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, value >= 0 ? 'Return' : 'Loss']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }} 
                />
                <Legend />
                <Bar dataKey="winning" name="Winning Positions" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="losing" name="Losing Positions" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={cn("chart-container animate-slide-in-up")}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Position Size Distribution</h3>
              <p className="text-sm text-muted-foreground mt-1">Distribution of positions by size in USD</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockSizeDistributionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="size" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => [`${value} positions`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }} 
                />
                <Bar dataKey="count" name="Number of Positions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 mb-8 animate-slide-in-up">
          <h2 className="text-lg font-semibold mb-4">Position Analytics Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium mb-2">Optimal Range Width</h3>
              <p className="text-sm text-muted-foreground">
                Most profitable positions use a ±2.5% range width for stable pairs and ±5-10% for volatile pairs.
              </p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium mb-2">Position Duration</h3>
              <p className="text-sm text-muted-foreground">
                Positions held for 2+ weeks earn 3.2x more fees on average than positions held for &lt;3 days.
              </p>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium mb-2">Rebalancing Frequency</h3>
              <p className="text-sm text-muted-foreground">
                Top-performing LPs rebalance positions 1-2 times per month, not after every range exit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PositionAnalytics;
