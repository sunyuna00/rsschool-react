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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    const value = input.trim();
    onSearch(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };


  return (
    <div className="mt-12 mx-auto w-[min(100%-24px,900px)] bg-card border border-primary/10 rounded-3xl p-6 flex gap-3 items-center justify-center shadow-lg shadow-primary/5 transition-all duration-300 hover:border-primary/20">
      <input
        value={input}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder="Search Pokémon..."
        className="w-full bg-background text-foreground border border-primary/20 rounded-2xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
      />

      <button
        onClick={handleSubmit}
        className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,111,174,0.25)] active:scale-95"
      >
        <Search size={18} />
        Search
      </button>
    </div>
  );
};
