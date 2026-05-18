import React, { useState } from 'react';
import { fetchPokemon } from '@/api/fetchPokemon';
import type { Pokemon } from '@/types';
import { SearchBar, ResultsList } from '@/components';
import { Spinner } from '@/components/spinner';
import { Outlet, useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);

  const ITEMS_PER_PAGE = 20;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const visibleResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearch = async (value: string) => {
    const trimmed = value.trim();

    if (trimmed === search && hasSearched) return;

    onSearch(trimmed);
    setSearchParams((params) => {
      const next = new URLSearchParams(params);

      next.set('page', '1');

      return next;
    });
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

          {!loading && !error && results.length > 0 && <ResultsList results={visibleResults} />}

          {!loading && !error && results.length === 0 && hasSearched && <p>No results found</p>}

          {!loading && error && <p className="text-red-500">{error}</p>}
        </section>

        <Outlet />
      </div>
    </div>
  );
};
