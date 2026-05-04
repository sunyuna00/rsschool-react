import React from 'react';
import { fetchPokemon } from '@/api';
import type { Pokemon } from '@/types';
import { SearchBar, ResultsList } from '@/components';

type State = {
  error: string | null;
  search: string;
  results: Pokemon[];
  loading: boolean;
  triggerError: boolean;
};

export class App extends React.Component<{}, State> {
  override state: State = {
    search: '',
    results: [],
    loading: false,
    error: null,
    triggerError: false,
  };

  triggerErrorHandler = () => {
    this.setState({ triggerError: true });
  };

  handleSearch = async (value: string) => {
    const trimmed = value.trim();

    if (!trimmed || trimmed === this.state.search) return;

    this.setState({ search: trimmed, loading: true, error: null });

    try {
      const data = await fetchPokemon(trimmed);

      this.setState({
        results: data,
        loading: false,
        error: null,
      });

      localStorage.setItem('search', trimmed);
    } catch (e) {
      this.setState({
        error: e instanceof Error ? e.message : 'Something went wrong',
        loading: false,
        results: [],
      });
    }
  };

  override componentDidMount() {
    const saved = localStorage.getItem('search');
    if (saved) {
      this.setState({ search: saved });
      this.handleSearch(saved);
    } else {
      this.handleSearch('');
    }
  }

  override render() {
    const { error, results, loading } = this.state;

    if (this.state.triggerError) {
      throw new Error('Test Error Boundary');
    }

    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <section className="p-6 border-b border-primary/10">
          <SearchBar onSearch={this.handleSearch} initialValue={this.state.search} />
        </section>

        <section className="flex-1 p-6">
          {loading && <p className="text-center text-muted-foreground">Loading...</p>}

          {!loading && !error && results.length > 0 && <ResultsList results={results} />}

          {!loading && !error && results.length === 0 && (
            <p className="text-center text-muted-foreground">No results found</p>
          )}

          {!loading && error && <div className="text-center text-red-500">{error}</div>}
        </section>
        <div>
          <button
            onClick={this.triggerErrorHandler}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Test Error
          </button>

          <div>App content here</div>
        </div>
      </div>
    );
  }
}
