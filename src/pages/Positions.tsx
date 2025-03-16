
import React from 'react';
import Layout from '@/components/Layout';
import PositionsHeader from '@/components/positions/PositionsHeader';
import PositionsTable from '@/components/positions/PositionsTable';
import { mockPositions } from '@/data/mockPositions';
import { Position } from '@/components/positions/PositionTableRow';

const Portfolio = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <PositionsHeader />
        <PositionsTable positions={mockPositions as Position[]} />
      </div>
    </Layout>
  );
};

export default Portfolio;
