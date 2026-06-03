import { describe, expect, it } from 'vitest';
import { mapPokemon } from '@/entities/pokemon/model/mapper';

describe('mapPokemon', () => {
  it('maps pokemon correctly', () => {
    const result = mapPokemon({
      id: 1,
      name: 'pikachu',
      sprites: { front_default: 'img.png' },
      types: [{ type: { name: 'electric' } }],
    weight: 10,
    height: 5,
    abilities: [{ ability: { name: 'static' } }],
  });

    expect(result.name).toBe('pikachu');
    expect(result.types).toContain('electric');
  });
});
