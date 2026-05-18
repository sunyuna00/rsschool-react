import React, {  useState } from 'react';
import { fetchPokemon } from '@/api/fetchPokemon';
import type { Pokemon } from '@/types';
import { SearchBar, ResultsList } from '@/components';
import { Spinner } from '@/components/spinner';
import { Outlet } from 'react-router-dom';

type Props = {
  initialSearch: string;
  onSearch: (value: string) => void;
};

export const HomePage: React.FC<Props> = ({ initialSearch, onSearch }) => {
  const [search, setSearch] = useState(initialSearch);
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (value: string) => {
    const trimmed = value.trim();

    if (trimmed === search && hasSearched) return;

    onSearch(trimmed);
    setSearch(trimmed);

    setLoading(true);
    setError(null);

    try {
      const data = await fetchPokemon(trimmed);

      setResults(data);
      setHasSearched(true);

      localStorage.setItem('search', trimmed);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setResults([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="p-6 border-b border-primary/10">
        <SearchBar onSearch={handleSearch} initialValue={search} />
      </section>

      <div className="flex flex-1">
        <section className="flex-1 p-6">
          {loading && <Spinner />}

          {!loading && !error && results.length > 0 && <ResultsList results={results} />}

          {!loading && !error && results.length === 0 && hasSearched && <p>No results found</p>}

          {!loading && error && <p className="text-red-500">{error}</p>}
        </section>

        <Outlet />
      </div>
    </div>
  );
};
