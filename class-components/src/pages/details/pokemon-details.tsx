import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Pokemon } from '@/types';

export const PokemonDetails = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const formatted: Pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((t: { type: { name: string } }) => t.type.name),
          weight: data.weight,
          height: data.height,
          abilities: data.abilities.map((a: { ability: { name: string } }) =>
            typeof a === 'object' && a !== null ? a.ability.name : ''
          ),
        };

        setPokemon(formatted);
      } catch {
        setError('Failed to load Pokémon');
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  return (
    <aside className="w-[350px] border-l border-primary/10 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Details</h2>

        <Link to="/" className="text-sm text-primary underline">
          Close
        </Link>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && pokemon && (
        <>
          <div className="flex justify-center">
            <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32" />
          </div>

          <h3 className="text-lg font-bold capitalize text-center">{pokemon.name}</h3>

          <p>ID: {pokemon.id}</p>

          <p>
            Height: {pokemon.height} | Weight: {pokemon.weight}
          </p>

          <p>Types: {pokemon.types.join(', ')}</p>

          <p>Abilities: {pokemon.abilities.join(', ')}</p>
        </>
      )}
    </aside>
  );
};
