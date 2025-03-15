
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const SearchInput = ({ value, onChange, className }: SearchInputProps) => {
  return (
    <div className={`relative flex-1 ${className || ''}`}>
      <Input
        type="text"
        placeholder="Search pools, tokens, addresses..."
        value={value}
        onChange={onChange}
        className="pl-10 pr-4 py-2 w-full"
      />
      <div className="absolute left-3 top-2.5 text-muted-foreground">
        <Search className="w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchInput;
