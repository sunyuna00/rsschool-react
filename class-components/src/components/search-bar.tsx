import React from 'react';
import { Search } from 'lucide-react';

type Props = {
  onSearch: (value: string) => void;
  initialValue?: string;
};

type State = {
  input: string;
};

export class SearchBar extends React.Component<Props, State> {
  override state: State = {
    input: this.props.initialValue || '',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = () => {
    const value = this.state.input.trim();
    this.props.onSearch(value);
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };

  override componentDidUpdate(prevProps: Props) {
    if (prevProps.initialValue !== this.props.initialValue) {
      this.setState({ input: this.props.initialValue || '' });
    }
  }

  override render() {
    return (
      <div className="mt-12 mx-auto w-[min(100%-24px,900px)] bg-card border border-primary/10 rounded-3xl p-6 flex gap-3 items-center justify-center shadow-lg shadow-primary/5 transition-all duration-300 hover:border-primary/20">
        <input
          value={this.state.input}
          onChange={this.handleChange}
          onKeyDown={this.onKeyDown}
          placeholder="Search Pokémon..."
          className="w-full bg-background text-foreground border border-primary/20 rounded-2xl px-4 py-3 placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
        />

        <button
          onClick={this.handleSubmit}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,111,174,0.25)] active:scale-95"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    );
  }
}
