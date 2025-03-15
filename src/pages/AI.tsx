
import React from 'react';
import Layout from '@/components/Layout';

const AI = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered insights and recommendations for your liquidity positions
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold mb-4">Position Recommendations</h2>
            <p className="text-muted-foreground mb-4">
              Our AI analyzes market conditions and your portfolio to suggest optimal liquidity positions.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">ETH/USDC 0.05% Pool</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                    High Confidence
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on your portfolio and recent price stability, adding liquidity to ETH/USDC with a ±1.5% range around the current price could yield 18-22% APY.
                </p>
              </div>
              
              <div className="p-4 border border-border rounded-lg hover:bg-secondary/10 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">WBTC/ETH 0.3% Pool</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-foreground">
                    Medium Confidence
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Historical correlation between these assets suggests a ±4% range would capture 85% of price movements while maximizing fee generation.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 animate-slide-in-up">
            <h2 className="text-lg font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              Our AI assistant will soon provide personalized recommendations and insights
              based on your liquidity positions and market conditions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AI;
