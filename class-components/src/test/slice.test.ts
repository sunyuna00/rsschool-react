import reducer, { clearItems, toggleItem } from "@/entities/item/model/slice";
import type { Pokemon } from "@/entities/pokemon/model/types";


const mockPokemon = {
  id: 1,
  name: 'pikachu',
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  height: 10,
  weight: 20,
  types: ['electric'],
  abilities: ['static', 'lightning-rod'],
} as Pokemon;

test('should add item', () => {
  const state = reducer(undefined, toggleItem(mockPokemon));

  expect(state.items.length).toBe(1);
});

test('should remove item if exists', () => {
  const initial = { items: [mockPokemon] };

  const state = reducer(initial, toggleItem(mockPokemon));

  expect(state.items.length).toBe(0);
});

test('should clear items', () => {
  const initial = { items: [mockPokemon] };

  const state = reducer(initial, clearItems());

  expect(state.items).toEqual([]);
});
