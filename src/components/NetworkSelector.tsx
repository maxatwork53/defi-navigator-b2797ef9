
import React from 'react';
import { cn } from '@/lib/utils';

type Network = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type NetworkSelectorProps = {
  networks: Network[];
  selectedNetwork: string;
  onNetworkChange: (networkId: string) => void;
  className?: string;
};

const NetworkSelector = ({
  networks,
  selectedNetwork,
  onNetworkChange,
  className,
}: NetworkSelectorProps) => {
  return (
    <div className={cn("flex items-center space-x-2 rounded-full p-1 bg-secondary/50", className)}>
      {networks.map((network) => (
        <button
          key={network.id}
          onClick={() => onNetworkChange(network.id)}
          className={cn(
            "flex items-center space-x-2 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300",
            selectedNetwork === network.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "hover:bg-secondary/80 text-foreground/80"
          )}
        >
          <span className="w-4 h-4">{network.icon}</span>
          <span>{network.name}</span>
        </button>
      ))}
    </div>
  );
};

export default NetworkSelector;
