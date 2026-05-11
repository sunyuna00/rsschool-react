import { render, screen } from '@testing-library/react';
import { Card } from '../card';

describe('Card component', () => {
  const mockPokemon = {
    name: 'pikachu',
    image: 'pikachu.png',
    types: ['electric'],
    weight: 60,
    height: 4,
    abilities: ['static'],
  };

  test('renders pokemon name and image', () => {
    render(<Card item={mockPokemon} />);

    const nameElement = screen.getByText(/pikachu/i);
    const imageElement = screen.getByRole('img', { name: /pikachu/i });

    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'pikachu.png');
    expect(imageElement).toHaveAttribute('alt', 'pikachu');
  });

  test('renders pokemon types and abilities', () => {
    render(<Card item={mockPokemon} />);

    const badge = screen.getByText(/electric/i, {
    selector: 'span',
    });

    expect(badge).toBeInTheDocument();
    expect(screen.getByText(/static/i)).toBeInTheDocument();
  });

  test('renders pokemon height and weight', () => {
    render(<Card item={mockPokemon} />);

    expect(screen.getByText(/height:/i)).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    expect(screen.getByText(/weight:/i)).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
  });

  test('renders multiple types', () => {
    const pokemon = {
      ...mockPokemon,
      types: ['electric', 'steel'],
    };
    render(<Card item={pokemon} />);
    const types = screen.getAllByText(/electric/i);
    expect(types.length).toBeGreaterThan(0);

    const steelElements = screen.getAllByText(/steel/i);
    expect(steelElements.length).toBeGreaterThan(0);
  });
});
