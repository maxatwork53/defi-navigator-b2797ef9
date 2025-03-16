
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import PositionsPoolTable from '@/components/positions/PositionsPoolTable';
import PoolPositionsTable from '@/components/positions/PoolPositionsTable';

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

// Mock data for position value by category
const mockPositionValueData = [
  { category: '$0-$1K', value: 160000 },
  { category: '$1K-$5K', value: 1740000 },
  { category: '$5K-$10K', value: 3375000 },
  { category: '$10K-$50K', value: 6300000 },
  { category: '$50K-$100K', value: 9000000 },
  { category: '$100K+', value: 12000000 },
];

const PositionAnalytics = () => {
  const [trackedPoolIds, setTrackedPoolIds] = useState<string[]>([]);

  const handlePoolsChange = (poolIds: string[]) => {
    setTrackedPoolIds(poolIds);
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">Position Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Detailed analytics and metrics for liquidity positions
          </p>
        </div>

        <div className="mb-8 animate-slide-in-up">
          <h2 className="text-xl font-semibold mb-4">Tracked Pools</h2>
          <PositionsPoolTable className="mb-6" onPoolsChange={handlePoolsChange} />
          <p className="text-sm text-muted-foreground">
            Manually add pools you want to track and analyze. Search by pool name or address.
          </p>
        </div>

        {trackedPoolIds.length > 0 && (
          <div className="mb-8 animate-slide-in-up">
            <h2 className="text-xl font-semibold mb-4">Pool Liquidity Positions</h2>
            <PoolPositionsTable poolIds={trackedPoolIds} />
            <p className="text-sm text-muted-foreground mt-2">
              Displaying liquidity positions for the tracked pools. Data updates automatically when pools are added or removed.
            </p>
          </div>
        )}

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
        
        <div className="mb-8 animate-slide-in-up">
          <div className="chart-container">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Cumulative Position Value by Size Category</h3>
              <p className="text-sm text-muted-foreground mt-1">Total USD value of positions across different size categories</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockPositionValueData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => value >= 1000000 ? `$${(value / 1000000).toFixed(1)}M` : `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value: number) => [
                    value >= 1000000 ? `$${(value / 1000000).toFixed(2)}M` : `$${(value / 1000).toFixed(2)}K`, 
                    'Total Value'
                  ]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }} 
                />
                <Bar dataKey="value" name="Total Value (USD)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-6 mb-8 animate-slide-in-up">
          <h2 className="text-lg font-semibold mb-4">Position Analytics Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/30 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium mb-2">Optimal Range Width</h3>
              <p className="text-sm text-muted-foreground">
                Most profitable positions use a ±2.5% range width for stable pairs and ±5-10% for volatile pairs.
              </p>
            </div>
            <div className="p-4 bg-secondary/30 dark:bg-gray-700/50 rounded-lg">
              <h3 className="font-medium mb-2">Position Duration</h3>
              <p className="text-sm text-muted-foreground">
                Positions held for 2+ weeks earn 3.2x more fees on average than positions held for &lt;3 days.
              </p>
            </div>
            <div className="p-4 bg-secondary/30 dark:bg-gray-700/50 rounded-lg">
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
