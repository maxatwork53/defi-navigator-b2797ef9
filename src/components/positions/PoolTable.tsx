
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PoolRow from './PoolRow';
import { TrackedPool } from './PositionsPoolTable';

type PoolTableProps = {
  trackedPools: TrackedPool[];
  onRemovePool: (poolId: string) => void;
};

const PoolTable = ({ trackedPools, onRemovePool }: PoolTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="h-10">
            <TableHead className="w-[100px]">Actions</TableHead>
            <TableHead>Pool Tokens</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Network</TableHead>
            <TableHead>DEX</TableHead>
            <TableHead>TVL</TableHead>
            <TableHead>Volume (24h)</TableHead>
            <TableHead>Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trackedPools.length > 0 ? (
            trackedPools.map(pool => (
              <PoolRow 
                key={pool.id} 
                pool={pool} 
                onRemovePool={onRemovePool} 
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No pools tracked. Add pools using the search bar above.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PoolTable;
