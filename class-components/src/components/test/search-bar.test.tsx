import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';

import { SearchBar } from '../search-bar';

describe('SearchBar component', () => {
  test('renders input and button', () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(
      screen.getByPlaceholderText(/search pokémon/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /search/i })
    ).toBeInTheDocument();
  });

  test('updates input value when user types', async () => {
    const user = userEvent.setup();

    render(<SearchBar onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(/search pokémon/i);

    await user.type(input, 'Pikachu');

    expect(input).toHaveValue('Pikachu');
  });

  test('calls onSearch when button is clicked', async () => {
    const user = userEvent.setup();

    const onSearchMock = vi.fn();

    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search pokémon/i);

    await user.type(input, 'charizard');

    await user.click(
      screen.getByRole('button', { name: /search/i })
    );

    expect(onSearchMock).toHaveBeenCalledTimes(1);

    expect(onSearchMock).toHaveBeenCalledWith('charizard');
  });

  test('trims whitespace before search', async () => {
    const user = userEvent.setup();

    const onSearchMock = vi.fn();

    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search pokémon/i);

    await user.type(input, '  bulbasaur  ');

    await user.click(
      screen.getByRole('button', { name: /search/i })
    );

    expect(onSearchMock).toHaveBeenCalledWith('bulbasaur');
  });

  test('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();

    const onSearchMock = vi.fn();

    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search pokémon/i);

    await user.type(input, 'squirtle{enter}');

    expect(onSearchMock).toHaveBeenCalledWith('squirtle');
  });

  test('renders initialValue', () => {
    render(
      <SearchBar
        onSearch={() => {}}
        initialValue="mew"
      />
    );

    expect(
      screen.getByPlaceholderText(/search pokémon/i)
    ).toHaveValue('mew');
  });

  test('updates input when initialValue changes', () => {
    const { rerender } = render(
      <SearchBar
        onSearch={() => {}}
        initialValue="mew"
      />
    );

    const input = screen.getByPlaceholderText(
      /search pokémon/i
    );

    expect(input).toHaveValue('mew');

    rerender(
      <SearchBar
        onSearch={() => {}}
        initialValue="mewtwo"
      />
    );

    expect(input).toHaveValue('mewtwo');
  });

  test('renders empty input if initialValue is not provided', () => {
    render(<SearchBar onSearch={() => {}} />);

    expect(
      screen.getByPlaceholderText(/search pokémon/i)
    ).toHaveValue('');
  });
});
