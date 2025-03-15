
import React from 'react';
import { cn } from '@/lib/utils';
import { networks } from './constants';

type NetworkButtonsProps = {
  selectedNetworks: string[];
  onChange: (networkId: string) => void;
  className?: string;
};

const NetworkButtons = ({ selectedNetworks, onChange, className }: NetworkButtonsProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {networks.map((network) => (
        <button
          key={network.id}
          onClick={() => onChange(network.id)}
          className={cn(
            "flex items-center space-x-1 py-2 px-3 rounded-md text-sm font-medium transition-all",
            network.id === 'all' && selectedNetworks.length === 0
              ? "bg-primary text-primary-foreground"
              : selectedNetworks.includes(network.id)
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80 text-foreground/80"
          )}
        >
          <span className="w-4 h-4">{network.icon}</span>
          <span className="hidden md:inline">{network.label}</span>
        </button>
      ))}
    </div>
  );
};

export default NetworkButtons;
