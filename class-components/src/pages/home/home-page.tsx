import React from 'react';
import { fetchPokemon } from '@/api/fetchPokemon';
import type { Pokemon } from '@/types';
import { SearchBar, ResultsList } from '@/components';
import { Spinner } from '@/components/spinner';
import { Outlet } from 'react-router-dom';

type State = {
  search: string;
  results: Pokemon[];
  loading: boolean;
  error: string | null;
  hasSearched: boolean;
};

type Props = {
  initialSearch: string;
  onSearch: (value: string) => void;
};

export class HomePage extends React.Component<Props, State> {
  override state: State = {
    search: this.props.initialSearch,
    results: [],
    loading: false,
    error: null,
    hasSearched: false,
  };

  override componentDidMount() {
    if (this.state.search) {
      this.handleSearch(this.state.search);
    }
  }

  handleSearch = async (value: string) => {
    const trimmed = value.trim();

    if (trimmed === this.state.search && this.state.hasSearched) return;

    this.props.onSearch(trimmed);

    this.setState({
      search: trimmed,
      loading: true,
      error: null,
    });

    try {
      const data = await fetchPokemon(trimmed);

      this.setState({
        results: data,
        loading: false,
        hasSearched: true,
      });

      localStorage.setItem('search', trimmed);
    } catch (e) {
      this.setState({
        error: e instanceof Error ? e.message : 'Something went wrong',
        loading: false,
        results: [],
        hasSearched: true,
      });
    }
  };

  override render() {
    const { search, results, loading, error, hasSearched } = this.state;

    return (
      <div className="min-h-screen flex flex-col">
        <section className="p-6 border-b border-primary/10">
          <SearchBar
            onSearch={this.handleSearch}
            initialValue={search}
          />
        </section>

        <div className="flex flex-1">
          <section className="flex-1 p-6">
            {loading && <Spinner />}

            {!loading && !error && results.length > 0 && (
              <ResultsList results={results} />
            )}

            {!loading && !error && results.length === 0 && hasSearched && (
              <p>No results found</p>
            )}

            {!loading && error && (
              <p className="text-red-500">{error}</p>
            )}
          </section>

          <Outlet />
        </div>
      </div>
    );
  }
}
