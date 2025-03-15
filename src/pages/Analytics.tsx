
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import NetworkSelector from '@/components/NetworkSelector';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
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

// Mock Data
const mockTradingVolumeData = [
  { name: 'Mon', volume: 4500000 },
  { name: 'Tue', volume: 5200000 },
  { name: 'Wed', volume: 4800000 },
  { name: 'Thu', volume: 6100000 },
  { name: 'Fri', volume: 7800000 },
  { name: 'Sat', volume: 5600000 },
  { name: 'Sun', volume: 4200000 },
];

const mockTransactionData = [
  { hour: '00:00', count: 320 },
  { hour: '02:00', count: 180 },
  { hour: '04:00', count: 120 },
  { hour: '06:00', count: 210 },
  { hour: '08:00', count: 450 },
  { hour: '10:00', count: 680 },
  { hour: '12:00', count: 720 },
  { hour: '14:00', count: 810 },
  { hour: '16:00', count: 950 },
  { hour: '18:00', count: 860 },
  { hour: '20:00', count: 640 },
  { hour: '22:00', count: 470 },
];

const mockFeeData = [
  { pool: 'ETH/USDC', feeEarned: 350000, txCount: 45000 },
  { pool: 'ETH/USDT', feeEarned: 310000, txCount: 42000 },
  { pool: 'WBTC/ETH', feeEarned: 280000, txCount: 32000 },
  { pool: 'ETH/DAI', feeEarned: 220000, txCount: 28000 },
  { pool: 'MATIC/ETH', feeEarned: 180000, txCount: 26000 },
];

const mockImpermanentLossData = [
  { name: 'Minimal (<1%)', value: 32 },
  { name: 'Low (1-5%)', value: 28 },
  { name: 'Medium (5-10%)', value: 22 },
  { name: 'High (10-20%)', value: 12 },
  { name: 'Severe (>20%)', value: 6 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="animate-fade-in">
            <h1 className="text-2xl font-bold">Advanced Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Detailed metrics and insights for DeFi liquidity
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
              <h3 className="text-lg font-semibold">Weekly Trading Volume</h3>
              <p className="text-sm text-muted-foreground mt-1">Daily trading volume for the past week</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockTradingVolumeData}
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
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
                    return `$${(value / 1000).toFixed(0)}K`;
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(2)}M`, 'Volume']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }} 
                />
                <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={cn("chart-container animate-slide-in-up")}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Transaction Frequency</h3>
              <p className="text-sm text-muted-foreground mt-1">Number of transactions by hour of day</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={mockTransactionData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => [`${value} txs`, 'Transactions']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={cn("chart-container animate-slide-in-up")}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Top Pools by Fee Revenue</h3>
              <p className="text-sm text-muted-foreground mt-1">Fee earnings for top liquidity pools</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={mockFeeData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
                    return `$${(value / 1000).toFixed(0)}K`;
                  }}
                />
                <YAxis dataKey="pool" type="category" tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, 'Fee Earned']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }} 
                />
                <Bar dataKey="feeEarned" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={cn("chart-container animate-slide-in-up")}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Impermanent Loss Distribution</h3>
              <p className="text-sm text-muted-foreground mt-1">Distribution of positions by impermanent loss severity</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockImpermanentLossData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockImpermanentLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
