
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink } from 'lucide-react';
import { formatCurrency, formatPercentage, formatDuration } from '@/utils/formatters';
import { generateMockPositions } from '@/utils/mock/positionGenerator';

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
  const { toast } = useToast();
  const [positions, setPositions] = useState<PoolPosition[]>([]);

  useEffect(() => {
    if (poolIds.length > 0) {
      // In a real app, we would fetch positions from an API
      // For now, generate mock positions based on the pool IDs
      const mockPositions = generateMockPositions(poolIds);
      setPositions(mockPositions);
    } else {
      setPositions([]);
    }
  }, [poolIds]);

  const copyToClipboard = (tokenId: string) => {
    navigator.clipboard.writeText(tokenId);
    toast({
      title: "Token ID copied",
      description: "Position token ID copied to clipboard",
      duration: 3000,
    });
  };

  // Function to format age from hours to days and hours
  const formatAge = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    return `${days}d ${remainingHours}h`;
  };

  return (
    <div className={className}>
      <div className="rounded-md border">
        <Table>
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
          <TableBody>
            {positions.length > 0 ? (
              positions.map(position => (
                <TableRow key={position.id} className="h-10">
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
                    <span className="text-xs ml-1">({formatPercentage(position.pnlPercentage)})</span>
                  </TableCell>
                  <TableCell className="py-2">{formatPercentage(position.feeApr)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  {poolIds.length > 0 
                    ? "No positions found for the selected pools." 
                    : "Add pools above to view their liquidity positions."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PoolPositionsTable;
