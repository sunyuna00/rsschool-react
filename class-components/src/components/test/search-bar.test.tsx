import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../search-bar';

describe('SearchBar component',  () => {
  test('renders input and button', () => {
    render(<SearchBar onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
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

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(onSearchMock).toHaveBeenCalled();
    expect(onSearchMock).toHaveBeenCalledWith('charizard');
  });

  test('trims whitespace before search', async () => {
    const user = userEvent.setup();
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    await user.type(input, '  bulbasaur  ');

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

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
    render(<SearchBar onSearch={() => {}} initialValue='mew' />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    expect(input).toHaveValue('mew');
  });

  test('updates input when initialValue changes', () => {
    const {rerender} = render(<SearchBar onSearch = {() => {}} initialValue='mew' />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    expect(input).toHaveValue('mew');

    rerender(<SearchBar onSearch={() => {}} initialValue='mewtwo' />);
    expect(input).toHaveValue('mewtwo');
  });

  test('renders empty input if initialValue is not provided', () => {
    render(<SearchBar onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(/search pokémon/i);
    expect(input).toHaveValue('');
  });
});
