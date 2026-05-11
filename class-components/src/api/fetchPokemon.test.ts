import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { fetchPokemon } from './fetchPokemon';

describe('fetchPokemon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches single pokemon by search', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        sprites: { front_default: 'img.png' },
        types: [{ type: { name: 'electric' } }],
        weight: 100,
        height: 10,
        abilities: [{ ability: { name: 'static' } }],
      }),
    } as Response);

    const result = await fetchPokemon('pikachu');

    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe('pikachu');
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/pikachu')
    );
  });

  it('returns list of pokemons when search is empty', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1' }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          name: 'bulbasaur',
          sprites: { front_default: 'img.png' },
          types: [{ type: { name: 'grass' } }],
          weight: 50,
          height: 7,
          abilities: [{ ability: { name: 'overgrow' } }],
        }),
      } as Response);

    const result = await fetchPokemon('');

    expect(result.length).toBeGreaterThan(0);
    expect(result[0]?.name).toBe('bulbasaur');
  });

  it('throws error when pokemon not found', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(fetchPokemon('unknown')).rejects.toThrow(
      'Pokemon not found'
    );
  });

  it('throws error on network failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(
      new Error('Network error')
    );

    await expect(fetchPokemon('pikachu')).rejects.toThrow();
  });

  it('trims and lowercases search query', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        sprites: { front_default: 'img.png' },
        types: [{ type: { name: 'electric' } }],
        weight: 100,
        height: 10,
        abilities: [{ ability: { name: 'static' } }],
      }),
    } as Response);

    await fetchPokemon('   PIKACHU   ');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/pikachu')
    );
  });

  it('handles empty sprites safely', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'pikachu',
        sprites: { front_default: null },
        types: [{ type: { name: 'electric' } }],
        weight: 100,
        height: 10,
        abilities: [{ ability: { name: 'static' } }],
      }),
    } as Response);

    const result = await fetchPokemon('pikachu');

    expect(result[0]?.image).toBe('');
  });
});
