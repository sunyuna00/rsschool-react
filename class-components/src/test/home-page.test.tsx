import { describe, expect, it, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { HomePage } from '@/pages/home/home-page';
import { renderWithProviders } from './render-with-providers';

const mockSearchPokemonQuery = vi.hoisted(() => vi.fn());

vi.mock('@/shared/api/pokemon-api', async () => {
  const actual = await vi.importActual<
    typeof import('@/shared/api/pokemon-api')
  >('@/shared/api/pokemon-api');

  return {
    ...actual,
    useSearchPokemonQuery: mockSearchPokemonQuery,
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    mockSearchPokemonQuery.mockReset();
  });

  it('shows spinner while loading', () => {
    mockSearchPokemonQuery.mockReturnValue({
      isLoading: true,
      isSuccess: false,
      data: [],
      error: null,
    });

    renderWithProviders(<HomePage initialSearch="" />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows error message', () => {
    mockSearchPokemonQuery.mockReturnValue({
      isLoading: false,
      isSuccess: false,
      data: [],
      error: { status: 500 },
    });

    renderWithProviders(<HomePage initialSearch="" />);

    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  it('shows no results message', () => {
    mockSearchPokemonQuery.mockReturnValue({
      isLoading: false,
      isSuccess: true,
      data: [],
      error: null,
    });

    renderWithProviders(<HomePage initialSearch="" />);

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});
