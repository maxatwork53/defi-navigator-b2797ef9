
import React, { useState } from 'react';
import { Pool } from '@/data/mockPools';
import { formatCurrency } from '@/utils/formatters';
import { Copy, ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

// Map of network IDs to their display names for readability
const networkNames: Record<string, string> = {
  ethereum: 'Ethereum',
  arbitrum: 'Arbitrum',
  base: 'Base'
};

type PoolsTableProps = {
  pools: Pool[];
};

const PoolsTable = ({ pools }: PoolsTableProps) => {
  const { toast } = useToast();
  
  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Pool address copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Actions</TableHead>
            <TableHead>Pool Name</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Network</TableHead>
            <TableHead>DEX</TableHead>
            <TableHead>TVL</TableHead>
            <TableHead>Fees Collected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools.length > 0 ? (
            pools.map((pool) => (
              <TableRow key={pool.id}>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => copyToClipboard(pool.address)}
                      title="Copy Pool Address"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      title="View Position Analytics"
                    >
                      <Link to={`/position-analytics?poolId=${pool.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{pool.name}</TableCell>
                <TableCell>{pool.fee}</TableCell>
                <TableCell>{networkNames[pool.network] || pool.network}</TableCell>
                <TableCell>{pool.dex}</TableCell>
                <TableCell>{formatCurrency(pool.tvl)}</TableCell>
                <TableCell>{formatCurrency(pool.feesCollected)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No pools found matching your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PoolsTable;
