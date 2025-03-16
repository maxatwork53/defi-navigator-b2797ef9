
import React, { useState, useEffect } from 'react';
import { Table, TableBody } from '@/components/ui/table';
import { generateMockPositions } from '@/utils/mock/positionGenerator';
import PoolPositionsHeader from './PoolPositionsHeader';
import PoolPositionRow from './PoolPositionRow';
import EmptyPoolPositions from './EmptyPoolPositions';

export type PoolPosition = {
  id: string;
  tokenId: string;
  poolId: string;
  poolName: string;
  network: string;
  feeTier: string;
  ageInHours: number;
  valueInvested: number;
  positionFees: number;
  pnl: number;
  pnlPercentage: number;
  feeApr: number;
};

type PoolPositionsTableProps = {
  poolIds: string[];
  className?: string;
};

const PoolPositionsTable = ({ poolIds, className }: PoolPositionsTableProps) => {
  const [positions, setPositions] = useState<PoolPosition[]>([]);
  
  // Add a ref to track if this is the first render or a pool ID change
  const [prevPoolIds, setPrevPoolIds] = useState<string[]>([]);

  useEffect(() => {
    // Only regenerate positions when pool IDs actually change
    const poolIdsChanged = 
      poolIds.length !== prevPoolIds.length || 
      poolIds.some((id, index) => prevPoolIds[index] !== id);
    
    if (poolIdsChanged) {
      if (poolIds.length > 0) {
        // In a real app, we would fetch positions from an API
        // For now, generate mock positions based on the pool IDs with a fixed seed
        const mockPositions = generateMockPositions(poolIds);
        setPositions(mockPositions);
      } else {
        setPositions([]);
      }
      
      // Update previous pool IDs
      setPrevPoolIds(poolIds);
    }
  }, [poolIds, prevPoolIds]);

  return (
    <div className={className}>
      <div className="rounded-md border">
        <Table>
          <PoolPositionsHeader />
          <TableBody>
            {positions.length > 0 ? (
              positions.map(position => (
                <PoolPositionRow key={position.id} position={position} />
              ))
            ) : (
              <EmptyPoolPositions hasPoolIds={poolIds.length > 0} />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PoolPositionsTable;
