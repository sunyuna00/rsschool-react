import React from 'react';
import SearchBar from './search-bar';
import ResultsList from './results-list';
import { fetchPokemon } from '@/api';
import type { Pokemon } from '@/types';

type State = {
  error: string | null;
  search: string;
  results: Pokemon[];
  loading: boolean;
};

class App extends React.Component<{}, State> {
  override state: State = {
    search: '',
    results: [],
    loading: false,
    error: null,
  };

  handleSearch = async (value: string) => {
    const trimmed = value.trim();

    if (trimmed === this.state.search) return;

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
    const saved = localStorage.getItem('search') || '';
    if (!saved) return;

    this.setState({ search: saved });
    this.handleSearch(saved);
  }

  override render() {
    const { error, results, loading } = this.state;

    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">

        <section className="p-6 border-b border-primary/10">
          <SearchBar onSearch={this.handleSearch} />
        </section>

        <section className="flex-1 p-6">
          {loading && (
            <p className="text-center text-muted-foreground">
              Loading...
            </p>
          )}

          {!loading && !error && (
            <ResultsList results={results} />
          )}

          {!loading && error && (
            <div className="text-center text-red-500">
              {error}
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default App;
