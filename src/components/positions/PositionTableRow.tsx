
import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLinkIcon } from 'lucide-react';
import RangeIndicator from './RangeIndicator';
import { formatCurrency } from '@/utils/formatters';

export type Position = {
  id: string;
  pool: string;
  status: 'in-range' | 'out-of-range';
  value: number;
  feesEarned: number;
  range: { lower: number; upper: number; current: number };
  timeInPosition: string;
  rangePercentage: number;
  totalReturn: 'positive' | 'negative';
  returnValue: number;
};

type PositionTableRowProps = {
  position: Position;
};

const PositionTableRow = ({ position }: PositionTableRowProps) => {
  return (
    <tr className="hover:bg-secondary/20 dark:hover:bg-gray-700/30 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium dark:text-white">{position.pool}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          position.status === 'in-range' 
            ? "bg-success/10 text-success dark:bg-success/20" 
            : "bg-destructive/10 text-destructive dark:bg-destructive/20"
        )}>
          {position.status === 'in-range' ? 'In Range' : 'Out of Range'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
        {formatCurrency(position.value)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
        {formatCurrency(position.feesEarned)}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col space-y-1">
          <RangeIndicator range={position.range} className="w-32" />
          <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-500">
            <span>{position.range.lower}</span>
            <span>{position.range.upper}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
        {position.timeInPosition}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={cn(
          "font-medium",
          position.totalReturn === 'positive' ? "text-success" : "text-destructive"
        )}>
          {position.totalReturn === 'positive' ? '+' : '-'}{position.returnValue}%
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <button className="text-primary hover:text-primary/80 transition-colors">
          <ExternalLinkIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

export default PositionTableRow;
