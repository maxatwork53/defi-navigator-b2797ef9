
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
            <h2 className="text-lg font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              Our AI assistant will provide personalized recommendations and insights
              based on your liquidity positions and market conditions.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AI;
