
import React from 'react';

const PositionInsights = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 p-6 mb-8 animate-slide-in-up">
      <h2 className="text-lg font-semibold mb-4">Position Analytics Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-secondary/30 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-medium mb-2">Optimal Range Width</h3>
          <p className="text-sm text-muted-foreground">
            Most profitable positions use a ±2.5% range width for stable pairs and ±5-10% for volatile pairs.
          </p>
        </div>
        <div className="p-4 bg-secondary/30 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-medium mb-2">Position Duration</h3>
          <p className="text-sm text-muted-foreground">
            Positions held for 2+ weeks earn 3.2x more fees on average than positions held for &lt;3 days.
          </p>
        </div>
        <div className="p-4 bg-secondary/30 dark:bg-gray-700/50 rounded-lg">
          <h3 className="font-medium mb-2">Rebalancing Frequency</h3>
          <p className="text-sm text-muted-foreground">
            Top-performing LPs rebalance positions 1-2 times per month, not after every range exit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PositionInsights;
