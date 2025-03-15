
import React from 'react';
import NetworkSelector from '@/components/NetworkSelector';

type NetworkType = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type DashboardHeaderProps = {
  networks: NetworkType[];
  selectedNetwork: string;
  onNetworkChange: (networkId: string) => void;
  className?: string;
};

const DashboardHeader = ({ 
  networks, 
  selectedNetwork, 
  onNetworkChange,
  className 
}: DashboardHeaderProps) => {
  return (
    <div className={`mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className || ''}`}>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold">DeFi Liquidity Overview</h1>
        <p className="text-muted-foreground mt-1">
          Insights and metrics for Uniswap V3 liquidity positions
        </p>
      </div>
      <NetworkSelector
        networks={networks}
        selectedNetwork={selectedNetwork}
        onNetworkChange={onNetworkChange}
        className="animate-fade-in"
      />
    </div>
  );
};

export default DashboardHeader;
