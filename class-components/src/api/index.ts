import type { Pokemon } from "@/types";

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

type PokemonRaw = {
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
};

const mapPokemon = (data: PokemonRaw) => ({
  name: data.name,
  image: data.sprites.front_default,
  types: data.types.map((t) => t.type.name),
  weight: data.weight,
  height: data.height,
  abilities: data.abilities.map((a) => a.ability.name),
});

export const fetchPokemon = async (search: string): Promise<Pokemon[]> => {
  const trimmed = search.trim().toLowerCase();

  if (trimmed) {
    const res = await fetch(`${API_URL}/${trimmed}`);

    if (!res.ok) {
      throw new Error('Pokemon not found');
    }

    const data: PokemonRaw = await res.json();

    return [mapPokemon(data)];
  }

  const res = await fetch(`${API_URL}?limit=20&offset=0`);

  if (!res.ok) {
    throw new Error('Failed to load pokemons');
  }

  const data = await res.json();

  const detailed: PokemonRaw[] = await Promise.all(
    data.results.map(async (item: { url: string }) => {
      const res = await fetch(item.url);
      return res.json();
    })
  );

  return detailed.map(mapPokemon);
};
