
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PoolPositionsHeader = () => {
  return (
    <TableHeader>
      <TableRow className="h-10">
        <TableHead className="w-[80px]">Actions</TableHead>
        <TableHead>Network</TableHead>
        <TableHead>Pool Tokens</TableHead>
        <TableHead>Fee Tier</TableHead>
        <TableHead>Age</TableHead>
        <TableHead>Value Invested</TableHead>
        <TableHead>Position Fees</TableHead>
        <TableHead>PNL</TableHead>
        <TableHead>Fee APR</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default PoolPositionsHeader;
