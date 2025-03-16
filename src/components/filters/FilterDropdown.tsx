
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';
import { FilterOption } from './types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type FilterDropdownProps = {
  label: string;
  options: FilterOption[];
  selectedValue: string[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  className?: string;
};

const FilterDropdown = ({
  label,
  options,
  selectedValue,
  onChange,
  icon,
  className,
}: FilterDropdownProps) => {
  const getDisplayLabel = () => {
    if (selectedValue.length === 0) {
      return label;
    } else if (selectedValue.length === 1) {
      const option = options.find(opt => opt.id === selectedValue[0]);
      return option ? option.label : label;
    } else {
      return `${label} (${selectedValue.length})`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("w-full flex items-center justify-between p-2 rounded border text-sm", className)}>
        <div className="flex items-center gap-2">
          {icon}
          <span>
            {getDisplayLabel()}
          </span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            key="all"
            onClick={() => onChange('all')}
            className={cn(
              "cursor-pointer",
              selectedValue.length === 0 ? "bg-primary/10" : ""
            )}
          >
            <div className="flex items-center justify-between w-full">
              <span>All {label}</span>
              {selectedValue.length === 0 && <Check className="w-4 h-4" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {options.filter(option => option.id !== 'all').map((option) => (
            <DropdownMenuItem 
              key={option.id}
              onClick={() => onChange(option.id)}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span>{option.label}</span>
                {selectedValue.includes(option.id) && <Check className="w-4 h-4" />}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
