
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PoolPosition } from './PoolPositionsTable';

type PoolPositionRowProps = {
  position: PoolPosition;
};

const PoolPositionRow = ({ position }: PoolPositionRowProps) => {
  const { toast } = useToast();

  const copyToClipboard = (tokenId: string) => {
    navigator.clipboard.writeText(tokenId);
    toast({
      title: "Token ID copied",
      description: "Position token ID copied to clipboard",
      duration: 3000,
    });
  };

  // Format age from hours to days and hours
  const formatAge = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    return `${days}d ${remainingHours}h`;
  };

  // Format percentage with appropriate sign and color
  const formatPnlPercentage = (value: number) => {
    return `(${value >= 0 ? '+' : ''}${value.toFixed(2)}%)`;
  };

  return (
    <TableRow className="h-10">
      <TableCell className="py-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(position.tokenId)}
            title="Copy Token ID"
            className="h-7 w-7"
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="View Position Details"
            className="h-7 w-7"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </TableCell>
      <TableCell className="py-2 capitalize">{position.network}</TableCell>
      <TableCell className="font-medium py-2">{position.poolName}</TableCell>
      <TableCell className="py-2">{position.feeTier}</TableCell>
      <TableCell className="py-2">{formatAge(position.ageInHours)}</TableCell>
      <TableCell className="py-2">${position.valueInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
      <TableCell className="py-2">${position.positionFees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
      <TableCell className={`py-2 ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        ${position.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        <span className="text-xs ml-1">{formatPnlPercentage(position.pnlPercentage)}</span>
      </TableCell>
      <TableCell className="py-2">{position.feeApr.toFixed(2)}%</TableCell>
    </TableRow>
  );
};

export default PoolPositionRow;
