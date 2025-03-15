
import React from 'react';
import NetworkSelector from '@/components/NetworkSelector';
import { networks } from '@/utils/mockData';

type PositionsHeaderProps = {
  selectedNetwork: string;
  onNetworkChange: (networkId: string) => void;
};

const PositionsHeader = ({ selectedNetwork, onNetworkChange }: PositionsHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold">Your Positions</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and analyze your active liquidity positions
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

export default PositionsHeader;
