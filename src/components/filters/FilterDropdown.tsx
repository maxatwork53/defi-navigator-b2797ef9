
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
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
  selectedValue: string | null;
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
  const selectedOption = options.find(option => 
    option.id === selectedValue || (option.id === 'all' && !selectedValue)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("w-full flex items-center justify-between p-2 rounded border text-sm", className)}>
        <div className="flex items-center gap-2">
          {icon}
          <span>
            {selectedOption?.label || label}
          </span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuItem 
              key={option.id}
              onClick={() => onChange(option.id)}
              className={cn(
                "cursor-pointer",
                (option.id === 'all' && !selectedValue) || 
                selectedValue === option.id 
                  ? "bg-primary/10" 
                  : ""
              )}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
