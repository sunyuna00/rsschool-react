import type { Pokemon } from '@/types';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

type PokemonRaw = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
};

const mapPokemon = (data: PokemonRaw): Pokemon => ({
  id: data.id,
  name: data.name,
  image: data.sprites.front_default || '',
  types: data.types.map((t) => t.type.name),
  weight: data.weight,
  height: data.height,
  abilities: data.abilities.map((a) => a.ability.name),
});

const API_ERRORS = {
  NOT_FOUND: 'Pokemon not found',
  FAILED: 'Failed to load pokemons',
};

export const fetchPokemon = async (search: string): Promise<Pokemon[]> => {
  const query = search.trim().toLowerCase();

  try {
    if (query) {
      const exactRes = await fetch(`${API_URL}/${query}`);

      if (exactRes.ok) {
        const exactData: PokemonRaw = await exactRes.json();

        return [mapPokemon(exactData)];
      }
    }

    const res = await fetch(`${API_URL}?limit=1300`);

    if (!res.ok) {
      throw new Error(API_ERRORS.FAILED);
    }

    const data = await res.json();

    const results = data?.results ?? [];

    const filtered = results.filter((item: { name?: string }) => (item.name ?? '').includes(query));

    if (!filtered.length) {
      throw new Error(API_ERRORS.NOT_FOUND);
    }

    const detailed: PokemonRaw[] = await Promise.all(
      filtered.map(async (item: { url: string }) => {
        const res = await fetch(item.url);
        return res.json();
      })
    );

    return detailed.map(mapPokemon);
  } catch (error) {
    throw error instanceof Error ? error : new Error(API_ERRORS.FAILED);
  }
};
