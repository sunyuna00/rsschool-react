import type { Pokemon } from './types';

export type PokemonRaw = {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
};

export const mapPokemon = (data: PokemonRaw): Pokemon => ({
  id: data.id,
  name: data.name,
  image: data.sprites.front_default || '',
  types: data.types.map((t) => t.type.name),
  weight: data.weight,
  height: data.height,
  abilities: data.abilities.map((a) => a.ability.name),
});
