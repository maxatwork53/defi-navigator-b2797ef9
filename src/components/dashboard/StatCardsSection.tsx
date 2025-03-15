
import React from 'react';
import StatCard from '@/components/StatCard';
import { DollarSign, Wallet, AlertCircle } from 'lucide-react';

type StatCardsSectionProps = {
  formattedTvl: string;
  className?: string;
};

const StatCardsSection = ({ formattedTvl, className }: StatCardsSectionProps) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ${className || ''}`}>
      <StatCard
        title="Total Value Locked"
        value={formattedTvl}
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
  );
};

export default StatCardsSection;
