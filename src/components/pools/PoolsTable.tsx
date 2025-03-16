
import React, { useState } from 'react';
import { Pool } from '@/data/mockPools';
import { formatCurrency } from '@/utils/formatters';
import { Copy, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import ExpandedPoolInfo from './ExpandedPoolInfo';

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
  const [expandedPoolId, setExpandedPoolId] = useState<string | null>(null);
  
  const copyToClipboard = (address: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row expansion when clicking copy button
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Pool address copied to clipboard",
      duration: 3000,
    });
  };

  const handleRowClick = (poolId: string) => {
    setExpandedPoolId(prevId => prevId === poolId ? null : poolId);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="h-8">
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
              <React.Fragment key={pool.id}>
                <TableRow 
                  className="h-10 cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(pool.id)}
                >
                  <TableCell className="py-2">
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => copyToClipboard(pool.address, e)}
                        title="Copy Pool Address"
                        className="h-7 w-7"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        title="View Position Analytics"
                        className="h-7 w-7"
                        onClick={(e) => e.stopPropagation()} // Prevent row expansion
                      >
                        <Link to={`/position-analytics?poolId=${pool.id}`}>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      {expandedPoolId === pool.id ? (
                        <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium py-2">{pool.name}</TableCell>
                  <TableCell className="py-2">{pool.fee}</TableCell>
                  <TableCell className="py-2">{networkNames[pool.network] || pool.network}</TableCell>
                  <TableCell className="py-2">{pool.dex}</TableCell>
                  <TableCell className="py-2">{formatCurrency(pool.tvl)}</TableCell>
                  <TableCell className="py-2">{formatCurrency(pool.feesCollected)}</TableCell>
                </TableRow>
                {expandedPoolId === pool.id && (
                  <TableRow>
                    <TableCell colSpan={7} className="p-0">
                      <ExpandedPoolInfo pool={pool} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
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
