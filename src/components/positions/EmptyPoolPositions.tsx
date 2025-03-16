
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';

type EmptyPoolPositionsProps = {
  hasPoolIds: boolean;
};

const EmptyPoolPositions = ({ hasPoolIds }: EmptyPoolPositionsProps) => {
  return (
    <TableRow>
      <TableCell colSpan={9} className="h-24 text-center">
        {hasPoolIds 
          ? "No positions found for the selected pools." 
          : "Add pools above to view their liquidity positions."}
      </TableCell>
    </TableRow>
  );
};

export default EmptyPoolPositions;
