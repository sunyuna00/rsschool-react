import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ResultsList } from '../results-list';

describe('ResultsList component', () => {
  const mockResults = [
    {
      name: 'pikachu',
      image: 'pikachu.png',
      types: ['electric'],
      weight: 60,
      height: 4,
      abilities: ['static'],
    },
    {
      name: 'bulbasaur',
      image: 'bulbasaur.png',
      types: ['grass', 'poison'],
      weight: 69,
      height: 7,
      abilities: ['overgrow'],
    },
  ];

  test('renders all pokemon cards', () => {
    render(<ResultsList results={mockResults} />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  test('renders correct number of pokemon images', () => {
    render(<ResultsList results={mockResults} />);

    const pikachuImage = screen.getByRole('img', { name: /pikachu/i });
    const bulbasaurImage = screen.getByRole('img', { name: /bulbasaur/i });

    expect(pikachuImage).toBeInTheDocument();
    expect(bulbasaurImage).toBeInTheDocument();
  });

  test('renders empty list correctly', () => {
    render(<ResultsList results={[]} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
  });
});
