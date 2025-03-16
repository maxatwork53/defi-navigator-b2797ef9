import React from 'react';
type DashboardHeaderProps = {
  className?: string;
};
const DashboardHeader = ({
  className
}: DashboardHeaderProps) => {
  return <div className={`mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className || ''}`}>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold dark:text-white">Overview</h1>
        <p className="text-muted-foreground mt-1 dark:text-gray-400">
          Insights and metrics for Uniswap V3 liquidity positions
        </p>
      </div>
    </div>;
};
export default DashboardHeader;