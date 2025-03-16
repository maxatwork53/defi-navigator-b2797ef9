
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { TrackedPool } from './PositionsPoolTable';
import { useToast } from '@/hooks/use-toast';

type PoolRowProps = {
  pool: TrackedPool;
  onRemovePool: (poolId: string) => void;
};

const networkNames: Record<string, string> = {
  ethereum: 'Ethereum',
  arbitrum: 'Arbitrum',
  base: 'Base',
};

const PoolRow = ({ pool, onRemovePool }: PoolRowProps) => {
  const { toast } = useToast();

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
            onClick={() => onRemovePool(pool.id)}
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
  );
};

export default PoolRow;
