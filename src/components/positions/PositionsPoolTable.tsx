
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import PoolSearch from './PoolSearch';
import PoolTable from './PoolTable';

export type TrackedPool = {
  id: string;
  name: string;
  address: string;
  network: string;
  dex: string;
  tvl: number;
  volume: number;
  feesCollected: number;
  fee: string;
  added: Date;
};

type PositionsPoolTableProps = {
  className?: string;
  onPoolsChange?: (poolIds: string[]) => void;
};

const PositionsPoolTable = ({ className, onPoolsChange }: PositionsPoolTableProps) => {
  const { toast } = useToast();
  const [trackedPools, setTrackedPools] = useState<TrackedPool[]>([]);

  // Notify parent component when tracked pools change
  useEffect(() => {
    if (onPoolsChange) {
      onPoolsChange(trackedPools.map(pool => pool.id));
    }
  }, [trackedPools, onPoolsChange]);

  const handleAddPool = (newPool: TrackedPool) => {
    setTrackedPools([newPool, ...trackedPools]);
  };

  const handleRemovePool = (poolId: string) => {
    setTrackedPools(trackedPools.filter(pool => pool.id !== poolId));
    toast({
      title: "Pool removed",
      description: "Pool has been removed from your tracked list",
    });
  };

  return (
    <div className={className}>
      <PoolSearch 
        trackedPools={trackedPools} 
        onAddPool={handleAddPool} 
      />
      
      <PoolTable 
        trackedPools={trackedPools} 
        onRemovePool={handleRemovePool} 
      />
    </div>
  );
};

export default PositionsPoolTable;
