import React from 'react';
import { Activity, TrendingUp, Zap, Users, Lock, Layers, Eye } from 'lucide-react';
import { networkIcons } from '@/components/filters/constants';

// Keep only "All Networks" in the networks array
export const networks = [
  { id: 'all', name: 'All Networks', icon: networkIcons.all },
];

// Updated mock data for position stats with winning/losing structure
export const mockPositionStats = {
  winning: {
    medianTimeHours: 168, // 7 days in hours
    medianUsdValue: 12500,
    medianRangePercentage: 80
  },
  losing: {
    medianTimeHours: 72, // 3 days in hours
    medianUsdValue: 8000,
    medianRangePercentage: 40
  }
};

// Updated mock data for comparison chart with winning/losing properties
export const mockComparisonData = [
  { name: 'Time in Position', winning: 168, losing: 72 },
  { name: 'USD Value', winning: 12500, losing: 8000 },
  { name: 'Range Coverage', winning: 80, losing: 40 },
];

// Updated mock data for TVL chart with name instead of date
export const mockTvlData = [
  { name: 'Jan', value: 32000 },
  { name: 'Feb', value: 35600 },
  { name: 'Mar', value: 38200 },
  { name: 'Apr', value: 36800 },
  { name: 'May', value: 40100 },
  { name: 'Jun', value: 42500 },
  { name: 'Jul', value: 41200 },
  { name: 'Aug', value: 43800 },
  { name: 'Sep', value: 45920 },
];

// Updated mock data for heatmap with numeric x and y values
export const mockHeatmapData = [
  { x: 1, y: 1, value: 42 },
  { x: 1, y: 2, value: 89 },
  { x: 1, y: 3, value: 13 },
  { x: 2, y: 1, value: 35 },
  { x: 2, y: 2, value: 74 },
  { x: 2, y: 3, value: 18 },
  { x: 3, y: 1, value: 25 },
  { x: 3, y: 2, value: 63 },
  { x: 3, y: 3, value: 22 },
];

// Keep existing mock stats cards data
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

// Keep existing mock feature cards data
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
