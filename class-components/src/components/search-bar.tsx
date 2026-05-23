import React, { useState } from 'react';
import { Search } from 'lucide-react';

type Props = {
  onSearch: (value: string) => void;
  initialValue?: string;
};

export const SearchBar: React.FC<Props> = ({
  onSearch,
  initialValue = '',
}) => {
  const [input, setInput] = useState(initialValue);

  const handleSubmit = () => {
    onSearch(input.trim());
  };

  return (
    <div className="mt-12 mx-auto w-[min(100%-24px,900px)] bg-card border border-primary/10 rounded-3xl p-6 flex gap-3 items-center justify-center">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Search Pokémon..."
        className="w-full bg-background text-foreground border border-primary/20 rounded-2xl px-4 py-3"
      />

      <button
        onClick={handleSubmit}
        className="cursor-pointer bg-primary text-primary-foreground px-5 py-3 rounded-2xl flex items-center gap-2"
      >
        <Search size={18} />
        Search
      </button>
    </div>
  );
};
