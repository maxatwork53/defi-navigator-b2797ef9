import React from 'react';
import { Activity, TrendingUp, Zap, Users, Lock, Layers, Eye } from 'lucide-react';
import { networkIcons } from '@/components/filters/constants';

// Keep only "All Networks" in the networks array
export const networks = [
  { id: 'all', name: 'All Networks', icon: networkIcons.all },
];

// Mock data for position stats
export const mockPositionStats = {
  totalPositions: 12,
  activePositions: 8,
  avgPositionAge: 67, // days
  totalValueLocked: 45920.75,
  totalFeesEarned: 1245.32,
  avgAPY: 18.7,
  highestAPY: 42.3,
};

// Mock data for comparison chart
export const mockComparisonData = [
  { name: 'Your APY', value: 18.7 },
  { name: 'Market Avg', value: 12.4 },
];

// Mock data for TVL chart
export const mockTvlData = [
  { date: '2023-01-01', value: 32000 },
  { date: '2023-02-01', value: 35600 },
  { date: '2023-03-01', value: 38200 },
  { date: '2023-04-01', value: 36800 },
  { date: '2023-05-01', value: 40100 },
  { date: '2023-06-01', value: 42500 },
  { date: '2023-07-01', value: 41200 },
  { date: '2023-08-01', value: 43800 },
  { date: '2023-09-01', value: 45920 },
];

// Mock data for heatmap
export const mockHeatmapData = [
  { x: 'ETH-USDC', y: '0.01-0.1%', value: 42 },
  { x: 'ETH-USDC', y: '0.1-0.5%', value: 89 },
  { x: 'ETH-USDC', y: '0.5-1%', value: 13 },
  { x: 'ETH-USDT', y: '0.01-0.1%', value: 35 },
  { x: 'ETH-USDT', y: '0.1-0.5%', value: 74 },
  { x: 'ETH-USDT', y: '0.5-1%', value: 18 },
  { x: 'WBTC-ETH', y: '0.01-0.1%', value: 25 },
  { x: 'WBTC-ETH', y: '0.1-0.5%', value: 63 },
  { x: 'WBTC-ETH', y: '0.5-1%', value: 22 },
];

// Mock stats cards data
export const mockStatsCards = [
  {
    title: 'Total Value Locked',
    value: '$45,920.75',
    change: '+12.5%',
    trend: 'up',
    icon: <Activity className="w-5 h-5" />,
  },
  {
    title: 'Average APY',
    value: '18.7%',
    change: '+3.2%',
    trend: 'up',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    title: 'Total Fees Earned',
    value: '$1,245.32',
    change: '+8.7%',
    trend: 'up',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: 'Active Positions',
    value: '8',
    change: '+2',
    trend: 'up',
    icon: <Users className="w-5 h-5" />,
  },
];

// Mock feature cards data
export const mockFeatureCards = [
  {
    title: 'Position Security',
    description: 'Analyze the security of your liquidity positions with our advanced risk assessment tools.',
    icon: <Lock className="w-6 h-6" />,
  },
  {
    title: 'Fee Optimization',
    description: 'Optimize your fee tiers based on historical volatility and trading volume data.',
    icon: <Layers className="w-6 h-6" />,
  },
  {
    title: 'Market Insights',
    description: 'Get real-time insights into market trends and liquidity distribution.',
    icon: <Eye className="w-6 h-6" />,
  },
];
