
import React, { useMemo } from 'react';
import { Pool } from '@/data/mockPools';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { generateMockPoolStats } from './mock-utils';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import { ChartContainer, ChartTooltipContent, ChartLegend } from '@/components/ui/chart';

type PoolsChartsProps = {
  pools: Pool[];
};

const PoolsCharts = ({ pools }: PoolsChartsProps) => {
  const winningPositionsData = useMemo(() => {
    return pools
      .map(pool => {
        const stats = generateMockPoolStats(pool);
        return {
          name: pool.name,
          value: stats.positionStats.winning.percentage,
          poolId: pool.id
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 pools by winning positions percentage
  }, [pools]);

  const tvlToFeesRatioData = useMemo(() => {
    return pools
      .map(pool => {
        const stats = generateMockPoolStats(pool);
        const feesLast24h = stats.feesCollected[0].value;
        const ratio = feesLast24h > 0 ? (pool.tvl / feesLast24h) : 0;
        return {
          name: pool.name,
          value: ratio,
          poolId: pool.id,
          tvl: pool.tvl,
          fees: feesLast24h
        };
      })
      .sort((a, b) => a.value - b.value) // Lower ratio is better (more fees per TVL)
      .slice(0, 5); // Top 5 pools by TVL to fees ratio
  }, [pools]);

  // Generate mock data for fees collected over 30 days
  const feesCollectedData = useMemo(() => {
    const periods = ['1d', '7d', '14d', '30d'];
    const lines = pools.slice(0, 5).map(pool => {
      const stats = generateMockPoolStats(pool);
      return {
        id: pool.id,
        name: pool.name,
        data: stats.feesCollected
      };
    });

    // Transform data for LineChart
    return periods.map((period, index) => {
      const dataPoint: any = { name: period };
      lines.forEach(line => {
        dataPoint[line.name] = line.data[index].value;
      });
      return dataPoint;
    });
  }, [pools]);

  // Generate mock data for median price ranges over 30 days
  const priceRangeData = useMemo(() => {
    // Mock periods for 30 days (weekly data points)
    const periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    
    // Get top 3 pools for clarity
    const topPools = pools.slice(0, 3);
    
    // For each period, generate random median winning and losing price ranges
    return periods.map(period => {
      const dataPoint: any = { name: period };
      
      topPools.forEach(pool => {
        // Generate random values based on mock data
        const poolStats = generateMockPoolStats(pool);
        const winningBase = poolStats.positionStats.winning.medianRangePercentage;
        const losingBase = poolStats.positionStats.losing.medianRangePercentage;
        
        // Add some variation for each week
        const variation = (Math.random() * 0.4) - 0.2; // -20% to +20%
        
        dataPoint[`${pool.name} (Win)`] = winningBase * (1 + variation);
        dataPoint[`${pool.name} (Loss)`] = losingBase * (1 + variation);
      });
      
      return dataPoint;
    });
  }, [pools]);

  // Get color for chart lines
  const getColor = (index: number, variant: 'base' | 'win' | 'lose' = 'base') => {
    const colors = [
      { base: '#3b82f6', win: '#10b981', lose: '#ef4444' }, // blue, green, red
      { base: '#8b5cf6', win: '#06b6d4', lose: '#f97316' }, // purple, cyan, orange
      { base: '#ec4899', win: '#84cc16', lose: '#f43f5e' }, // pink, lime, rose
      { base: '#14b8a6', win: '#6366f1', lose: '#ea580c' }, // teal, indigo, orange
      { base: '#f59e0b', win: '#22c55e', lose: '#be185d' }  // amber, green, pink
    ];
    
    const colorIndex = index % colors.length;
    return colors[colorIndex][variant];
  };

  const chartConfig = {
    blue: { color: '#3b82f6' },
    green: { color: '#10b981' },
    red: { color: '#ef4444' },
    purple: { color: '#8b5cf6' },
    cyan: { color: '#06b6d4' },
    pink: { color: '#ec4899' },
    lime: { color: '#84cc16' },
    rose: { color: '#f43f5e' },
    teal: { color: '#14b8a6' },
    indigo: { color: '#6366f1' },
    orange: { color: '#f97316' },
    amber: { color: '#f59e0b' }
  };
  
  return (
    <div className="mt-8 space-y-8">
      <h2 className="text-xl font-semibold mb-4">Pool Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chart 1: Pools with highest winning positions percentage */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Top Pools by Winning Position %</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={winningPositionsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Winning %']}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Chart 2: Highest TVL to fees collected ratio */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Top Pools by TVL to Fees Ratio (24h)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tvlToFeesRatioData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background p-3 rounded-md border text-xs shadow">
                          <p className="font-medium">{data.name}</p>
                          <p>TVL: {formatCurrency(data.tvl)}</p>
                          <p>Fees (24h): {formatCurrency(data.fees)}</p>
                          <p>Ratio: {formatCurrency(data.value)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Chart 3: Line chart for fees collected over 30 days */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Fees Collected (30 Days)</h3>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={feesCollectedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Legend content={<ChartLegend />} />
                {pools.slice(0, 5).map((pool, index) => (
                  <Line
                    key={pool.id}
                    type="monotone"
                    dataKey={pool.name}
                    stroke={getColor(index)}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ChartContainer>
          </div>
        </div>
        
        {/* Chart 4: Area chart for median price ranges */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Median Price Ranges (30 Days)</h3>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={priceRangeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value.toFixed(1)}%`}
                />
                <Tooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value) => `${Number(value).toFixed(1)}%`}
                    />
                  }
                />
                <Legend content={<ChartLegend />} />
                {pools.slice(0, 3).map((pool, index) => (
                  <React.Fragment key={pool.id}>
                    <Area
                      type="monotone"
                      dataKey={`${pool.name} (Win)`}
                      stroke={getColor(index, 'win')}
                      fill={getColor(index, 'win')}
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey={`${pool.name} (Loss)`}
                      stroke={getColor(index, 'lose')}
                      fill={getColor(index, 'lose')}
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </React.Fragment>
                ))}
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolsCharts;
