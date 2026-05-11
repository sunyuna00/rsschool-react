import { render, screen } from '@testing-library/react';
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
    }
  ];

  test('renders all pokemon cards', () => {
    render(<ResultsList results={mockResults} />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  test('renders correct number of images', () => {
    render(<ResultsList results={mockResults} />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  test('renders empty list correctly', () => {
    render(<ResultsList results={[]} />);

    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });
});
