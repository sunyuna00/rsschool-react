import { Spinner, useLocalStorage } from '@/shared';
import { useSearchPokemonQuery } from '@/shared/api/pokemon-api';
import { Pagination, ResultsList, SearchBar } from '@/widgets';
import React, { useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

type Props = {
  initialSearch: string;
};

export const HomePage: React.FC<Props> = ({ initialSearch }) => {
  const [query, setQuery] = useLocalStorage('search', initialSearch ?? '');
  const { data: results = [], isLoading: loading, error, isSuccess } = useSearchPokemonQuery(query);
  const [triggerError, setTriggerError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const ITEMS_PER_PAGE = 20;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const visibleResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  if (triggerError) {
    throw new Error('Test Error Boundary');
  }

  const updateParams = (updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, value);
      });

      return params;
    });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="p-6 border-b border-primary/10">
        <SearchBar
          initialValue={query}
          onSearch={(value) => {
            setQuery(value);

            updateParams({
              page: '1',
              details: '',
            });
          }}
        />
      </section>

      <div className="flex flex-1">
        <section className="flex-1 p-6">
          {loading && <Spinner data-testid="spinner" />}

          {!loading && !error && results.length > 0 && (
            <>
              <ResultsList results={visibleResults} />

              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}

          {!loading && !error && isSuccess && results.length === 0 && <p>No results found</p>}

          {!loading && error && <p>Failed to load Pokémon</p>}

          <div className="flex justify-center mt-6">
            <button
              onClick={() => setTriggerError(true)}
              className="cursor-pointer px-10 py-4 mb-8 mt-2 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
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
