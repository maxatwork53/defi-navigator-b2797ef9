
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Copy, ExternalLink, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { Input } from '@/components/ui/input';
import { generateMockPool } from '@/utils/mock/poolGenerator';

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

const networkNames: Record<string, string> = {
  ethereum: 'Ethereum',
  arbitrum: 'Arbitrum',
  base: 'Base',
};

type PositionsPoolTableProps = {
  className?: string;
  onPoolsChange?: (poolIds: string[]) => void;
};

const PositionsPoolTable = ({ className, onPoolsChange }: PositionsPoolTableProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [trackedPools, setTrackedPools] = useState<TrackedPool[]>([]);

  // Notify parent component when tracked pools change
  useEffect(() => {
    if (onPoolsChange) {
      onPoolsChange(trackedPools.map(pool => pool.id));
    }
  }, [trackedPools, onPoolsChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddPool = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a pool address or name to add",
        variant: "destructive",
      });
      return;
    }

    // Check if the pool already exists in the tracked pools
    const poolExists = trackedPools.some(
      pool => pool.address.toLowerCase() === searchQuery.toLowerCase() || 
              pool.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (poolExists) {
      toast({
        title: "Pool already added",
        description: "This pool is already in your tracked list",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would fetch the pool data from the API
    // For now, let's generate a mock pool based on the search query
    const newPool = generateMockPool(searchQuery);
    
    setTrackedPools([newPool, ...trackedPools]);
    setSearchQuery('');
    
    toast({
      title: "Pool added",
      description: `${newPool.name} has been added to your tracked pools`,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPool();
    }
  };

  const handleRemovePool = (poolId: string) => {
    setTrackedPools(trackedPools.filter(pool => pool.id !== poolId));
    toast({
      title: "Pool removed",
      description: "Pool has been removed from your tracked list",
    });
  };

  const copyToClipboard = (address: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Pool address copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className={className}>
      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search and add pools by name or address..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="pr-10"
          />
        </div>
        <Button onClick={handleAddPool} size="sm" className="shrink-0">
          <Plus className="h-4 w-4 mr-2" /> Add Pool
        </Button>
      </div>
      
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
                <TableRow key={pool.id} className="h-10">
                  <TableCell className="py-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={e => copyToClipboard(pool.address, e)}
                        title="Copy Pool Address"
                        className="h-7 w-7"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="View Pool Details"
                        className="h-7 w-7"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePool(pool.id)}
                        title="Remove Pool"
                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium py-2">{pool.name}</TableCell>
                  <TableCell className="py-2">{pool.fee}</TableCell>
                  <TableCell className="py-2">{networkNames[pool.network] || pool.network}</TableCell>
                  <TableCell className="py-2">{pool.dex}</TableCell>
                  <TableCell className="py-2">{formatCurrency(pool.tvl)}</TableCell>
                  <TableCell className="py-2">{formatCurrency(pool.volume)}</TableCell>
                  <TableCell className="py-2">{pool.added.toLocaleDateString()}</TableCell>
                </TableRow>
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
    </div>
  );
};

export default PositionsPoolTable;
