import { describe, it, expect } from 'vitest';
import { pokemonApi } from '@/shared/api/pokemon-api';
import { createTestStore } from './create-test-store';

describe('pokemonApi', () => {
  it('searchPokemon success', async () => {
    const store = createTestStore();

    const result = await store.dispatch(pokemonApi.endpoints.searchPokemon.initiate('pikachu'));

    expect(result.data?.[0]?.name).toBe('pikachu');
  });

  it('getPokemonById success', async () => {
    const store = createTestStore();

    const result = await store.dispatch(pokemonApi.endpoints.getPokemonById.initiate('25'));

    expect(result.data?.id).toBe(25);
  });

  it('searchPokemon empty query returns empty result from exact flow', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              results: [
                {
                  name: 'pikachu',
                  url: 'https://pokeapi.co/api/v2/pokemon/25',
                },
              ],
            }),
            { status: 200 }
          )
        )
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({
              id: 25,
              name: 'pikachu',
              sprites: { front_default: 'pikachu.png' },
              types: [{ type: { name: 'electric' } }],
              weight: 60,
              height: 4,
              abilities: [{ ability: { name: 'static' } }],
            }),
            { status: 200 }
          )
        )
    );

    const store = createTestStore();

    const result = await store.dispatch(pokemonApi.endpoints.searchPokemon.initiate('   '));

    expect(result.data?.[0]?.name).toBe('pikachu');
  });

  it('searchPokemon listResponse.data undefined -> error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(new Response('null', { status: 200 })));

    const store = createTestStore();

    const result = await store.dispatch(pokemonApi.endpoints.searchPokemon.initiate('pi'));

    expect(result.error).toBeDefined();
  });

  it('searchPokemon catch block (network failure)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('Network error')));

    const store = createTestStore();

    const result = await store.dispatch(pokemonApi.endpoints.searchPokemon.initiate('pi'));

    expect(result.error).toBeDefined();
  });
});
