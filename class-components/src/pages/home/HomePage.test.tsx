import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import { App } from '../../App';
import { fetchPokemon } from '@/api/fetchPokemon';
import { ErrorBoundary } from '@/components';

vi.mock('@/api/fetchPokemon');

const mockedFetchPokemon = vi.mocked(fetchPokemon);

describe('App', () => {
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    setItemSpy.mockClear();

    mockedFetchPokemon.mockResolvedValue([]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls API on mount with empty search when no localStorage value exists', async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockedFetchPokemon).toHaveBeenCalledWith('');
    });
  });

  it('loads search from localStorage on mount', async () => {
    localStorage.setItem('search', 'pikachu');

    render(<App />);

    await waitFor(() => {
      expect(mockedFetchPokemon).toHaveBeenCalledWith('pikachu');
    });
  });

  it('renders results from API', async () => {
    mockedFetchPokemon.mockResolvedValueOnce([
      {
        name: 'pikachu',
        image: 'img.png',
        types: ['electric'],
        weight: 100,
        height: 10,
        abilities: ['static'],
        id: 1,
      },
    ]);

    render(<App />);

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
  });

  it('shows loading spinner while fetching data', async () => {
    let resolvePromise!: (
      value: {
        name: string;
        image: string;
        types: string[];
        weight: number;
        height: number;
        abilities: string[];
        id: number;
      }[]
    ) => void;

    const pokemonData = [
      {
        name: 'pikachu',
        image: 'img.png',
        types: ['electric'],
        weight: 100,
        height: 10,
        abilities: ['static'],
        id: 1,
      },
    ];

    mockedFetchPokemon.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    const { container } = render(<App />);

    expect(container.querySelector('.animate-spin')).toBeInTheDocument();

    resolvePromise(pokemonData);

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
  });

  it('handles search interaction', async () => {
    const user = userEvent.setup();

    mockedFetchPokemon.mockResolvedValueOnce([]).mockResolvedValueOnce([
      {
        name: 'charizard',
        image: 'img.png',
        types: ['fire'],
        weight: 90,
        height: 17,
        abilities: ['blaze'],
        id: 1,
      },
    ]);

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'charizard');
    await user.click(button);

    expect(await screen.findByText('charizard')).toBeInTheDocument();
  });

  it('calls API with entered search value', async () => {
    const user = userEvent.setup();

    mockedFetchPokemon.mockResolvedValueOnce([]).mockResolvedValueOnce([
      {
        name: 'pikachu',
        image: 'img.png',
        types: ['electric'],
        weight: 100,
        height: 10,
        abilities: ['static'],
        id: 1,
      },
    ]);

    render(<App />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', {
      name: /search/i,
    });

    await user.type(input, 'pikachu');
    await user.click(button);

    await waitFor(() => {
      expect(mockedFetchPokemon).toHaveBeenLastCalledWith('pikachu');
    });
  });

  it('shows error message when API fails', async () => {
    mockedFetchPokemon.mockRejectedValueOnce(new Error('Something went wrong'));

    render(<App />);

    expect(await screen.findByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows empty state when no results found', async () => {
    mockedFetchPokemon.mockResolvedValueOnce([]);

    render(<App />);

    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });

  it('triggers error boundary from App button', async () => {
    const user = userEvent.setup();

    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', {
      name: /test error/i,
    });

    await user.click(button);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });
});
