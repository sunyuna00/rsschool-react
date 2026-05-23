import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ResultsList } from '@/widgets';
import { MemoryRouter } from 'react-router-dom';

describe('ResultsList component', () => {
  const mockResults = [
    {
      id: 25,
      name: 'pikachu',
      image: 'pikachu.png',
      types: ['electric'],
      weight: 60,
      height: 4,
      abilities: ['static'],
    },
    {
      id: 1,
      name: 'bulbasaur',
      image: 'bulbasaur.png',
      types: ['grass', 'poison'],
      weight: 69,
      height: 7,
      abilities: ['overgrow'],
    },
  ];

  test('renders all pokemon cards', () => {
    render(
      <MemoryRouter>
        <ResultsList results={mockResults} />
      </MemoryRouter>
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  test('renders correct number of pokemon images', () => {
    render(
      <MemoryRouter>
        <ResultsList results={mockResults} />
      </MemoryRouter>
    );

    const pikachuImage = screen.getByRole('img', { name: /pikachu/i });
    const bulbasaurImage = screen.getByRole('img', { name: /bulbasaur/i });

    expect(pikachuImage).toBeInTheDocument();
    expect(bulbasaurImage).toBeInTheDocument();
  });

  test('renders empty list correctly', () => {
    render(
      <MemoryRouter>
        <ResultsList results={[]} />
      </MemoryRouter>
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
  });
});
