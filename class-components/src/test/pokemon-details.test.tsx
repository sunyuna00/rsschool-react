import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useParams: () => ({ id: '25' }),
    useNavigate: () => navigateMock,
    useSearchParams: () => [new URLSearchParams('page=2')],
  };
});

vi.mock('@/shared/api/pokemon-api', () => ({
  useGetPokemonByIdQuery: vi.fn(),
}));

import { useGetPokemonByIdQuery } from '@/shared/api/pokemon-api';
import { PokemonDetails } from '@/entities';

describe('PokemonDetails', () => {
  it('renders loading state', () => {
    (useGetPokemonByIdQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: true,
      data: undefined,
      error: undefined,
    });

    render(<PokemonDetails />);

    expect(screen.getByRole('status') || screen.getByText(/loading/i)).toBeTruthy();
  });

  it('renders error state', () => {
    (useGetPokemonByIdQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: true,
    });

    render(<PokemonDetails />);

    expect(screen.getByText(/failed to load pokémon/i)).toBeInTheDocument();
  });

  it('renders pokemon data', () => {
    (useGetPokemonByIdQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      error: undefined,
      data: {
        id: 25,
        name: 'pikachu',
        image: 'pikachu.png',
        height: 4,
        weight: 60,
        abilities: ['static'],
      },
    });

    render(<PokemonDetails />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('#25')).toBeInTheDocument();
    expect(screen.getByText('static')).toBeInTheDocument();
  });

  it('navigates back on close click', () => {
    (useGetPokemonByIdQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isLoading: false,
      error: undefined,
      data: {
        id: 25,
        name: 'pikachu',
        image: 'pikachu.png',
        height: 4,
        weight: 60,
        abilities: ['static'],
      },
    });

    render(<PokemonDetails />);

    const button = screen.getByRole('button', { name: /close/i });

    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledWith('/?page=2');
  });
});
