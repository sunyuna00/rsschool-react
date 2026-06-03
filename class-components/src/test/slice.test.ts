import { describe, it, expect } from 'vitest';
import reducer, { toggleItem, clearItems } from '@/entities/item/model/slice';

const pokemon = {
  id: 25,
  name: 'pikachu',
  image: 'pikachu.png',
  height: 4,
  weight: 60,
  abilities: ['static'],
  types: ['electric'],
};

describe('selectedItemsSlice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should add item when not exists', () => {
    const state = reducer(undefined, toggleItem(pokemon));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]!.id).toBe(25);
  });

  it('should remove item when exists', () => {
    const state1 = reducer(undefined, toggleItem(pokemon));
    const state2 = reducer(state1, toggleItem(pokemon));

    expect(state2.items).toHaveLength(0);
  });

  it('should clear items', () => {
    const startState = {
      items: [pokemon],
    };

    const state = reducer(startState, clearItems());

    expect(state.items).toEqual([]);
  });
});
