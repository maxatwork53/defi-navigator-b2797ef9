
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import { generateMockPool } from '@/utils/mock/poolGenerator';
import { TrackedPool } from './PositionsPoolTable';

type PoolSearchProps = {
  trackedPools: TrackedPool[];
  onAddPool: (pool: TrackedPool) => void;
};

const PoolSearch = ({ trackedPools, onAddPool }: PoolSearchProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddPool = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a pool address or name to add",
        variant: "destructive",
      });
      return;
    }

    // Check if the pool already exists in the tracked pools
    const poolExists = trackedPools.some(
      pool => pool.address.toLowerCase() === searchQuery.toLowerCase() || 
              pool.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (poolExists) {
      toast({
        title: "Pool already added",
        description: "This pool is already in your tracked list",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would fetch the pool data from the API
    // For now, let's generate a mock pool based on the search query
    const newPool = generateMockPool(searchQuery);
    
    onAddPool(newPool);
    setSearchQuery('');
    
    toast({
      title: "Pool added",
      description: `${newPool.name} has been added to your tracked pools`,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPool();
    }
  };

  return (
    <div className="flex items-center mb-4 gap-2">
      <div className="relative flex-1">
        <Input
          placeholder="Search and add pools by name or address..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="pr-10"
        />
      </div>
      <Button onClick={handleAddPool} size="sm" className="shrink-0">
        <Plus className="h-4 w-4 mr-2" /> Add Pool
      </Button>
    </div>
  );
};

export default PoolSearch;
