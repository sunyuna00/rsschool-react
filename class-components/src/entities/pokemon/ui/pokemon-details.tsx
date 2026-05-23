import { Spinner } from '@/shared';

import { useEffect, useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import type { Pokemon } from '../model/types';

export const PokemonDetails = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

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
          abilities: data.abilities.map((a: { ability: { name: string } }) => a.ability.name),
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

  const handleClose = () => {
    navigate(`/?page=${searchParams.get('page') || '1'}`);
  };

  return (
    <>
      <div onClick={handleClose} className="fixed inset-0 bg-black/30 backdrop-blur-md" />

      <aside
        className="fixed right-0 top-0 z-50 h-screen w-[350px] bg-background border-l border-primary/10 p-6 overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Details</h2>

          <button onClick={handleClose} className="text-sm underline">
            Close
          </button>
        </div>

        {loading && <Spinner />}

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
    </>
  );
};
