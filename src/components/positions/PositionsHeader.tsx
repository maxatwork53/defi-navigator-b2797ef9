
import React from 'react';

type PositionsHeaderProps = {};

const PositionsHeader = ({}: PositionsHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold dark:text-white">Portfolio</h1>
        <p className="text-muted-foreground mt-1 dark:text-gray-400">
          Monitor and analyze your active liquidity positions
        </p>
      </div>
    </div>
  );
};

export default PositionsHeader;
