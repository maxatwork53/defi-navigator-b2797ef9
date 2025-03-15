
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type ExcludeClosedToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const ExcludeClosedToggle = ({ checked, onChange }: ExcludeClosedToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="exclude-closed" 
        checked={checked}
        onCheckedChange={onChange}
      />
      <label
        htmlFor="exclude-closed"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Exclude Closed Positions
      </label>
    </div>
  );
};

export default ExcludeClosedToggle;
