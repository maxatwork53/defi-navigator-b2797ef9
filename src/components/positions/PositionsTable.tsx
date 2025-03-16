
import React from 'react';
import PositionTableRow, { Position } from './PositionTableRow';
import { cn } from '@/lib/utils';

type PositionsTableProps = {
  positions: Position[];
};

const PositionsTable = ({ positions }: PositionsTableProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 overflow-hidden mb-8 animate-slide-in-up">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50 dark:bg-gray-900/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Pool</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Fees Earned</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Price Range</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">Return</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-gray-700">
            {positions.map((position) => (
              <PositionTableRow key={position.id} position={position} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionsTable;
