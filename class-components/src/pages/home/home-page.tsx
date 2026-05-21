import React, { useEffect, useState } from 'react';
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
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [triggerError, setTriggerError] = useState(false);

  const [page] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const visibleResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (triggerError) {
    throw new Error('Test Error Boundary');
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const saved = localStorage.getItem('search');

        const query = saved ?? initialSearch ?? '';

        const data = await fetchPokemon(query);

        setResults(data);
        setHasSearched(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong');
        setResults([]);
        setHasSearched(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [initialSearch]);

  return (
    <div className="min-h-screen flex flex-col">
      <section className="p-6 border-b border-primary/10">
        <SearchBar onSearch={onSearch} initialValue={initialSearch} />
      </section>

      <div className="flex flex-1">
        <section className="flex-1 p-6">
          {loading && <Spinner />}

          {!loading && !error && results.length > 0 && <ResultsList results={visibleResults} />}

          {!loading && !error && results.length === 0 && hasSearched && <p>No results found</p>}

          {!loading && error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setTriggerError(true)}
              className="px-10 py-4 mb-8 mt-2 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              Test Error
            </button>
          </div>
        </section>

        <Outlet />
      </div>
    </div>
  );
};
