
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PositionsHeader from '@/components/positions/PositionsHeader';
import PositionsTable from '@/components/positions/PositionsTable';
import { mockPositions } from '@/data/mockPositions';
import { Position } from '@/components/positions/PositionTableRow';

const Positions = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <PositionsHeader 
          selectedNetwork={selectedNetwork} 
          onNetworkChange={setSelectedNetwork} 
        />
        <PositionsTable positions={mockPositions as Position[]} />
      </div>
    </Layout>
  );
};

export default Positions;
