import { Spinner } from '@/shared';

import { useEffect, useState } from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './pokemon-details.module.css';
import type { Pokemon } from '../../model/types';

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

          image: data.sprites.other['official-artwork'].front_default,

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
      <div onClick={handleClose} className={styles.overlay} />

      <aside className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>Pokémon Details</h2>

          <button onClick={handleClose} className={styles.closeButton}>
            Close
          </button>
        </div>

        {loading && <Spinner />}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && pokemon && (
          <>
            <div className={styles.imageWrapper}>
              <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
            </div>

            <h1 className={styles.name}>{pokemon.name}</h1>

            <p className={styles.id}>#{pokemon.id}</p>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Info</h3>

              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <p className={styles.statLabel}>Height</p>

                  <p className={styles.statValue}>{pokemon.height}</p>
                </div>

                <div className={styles.statCard}>
                  <p className={styles.statLabel}>Weight</p>

                  <p className={styles.statValue}>{pokemon.weight}</p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Abilities</h3>

              <div className={styles.badges}>
                {pokemon.abilities.map((ability) => (
                  <span key={ability} className={styles.badge}>
                    {ability}
                  </span>
                ))}
              </div>
            </section>
          </>
        )}
      </aside>
    </>
  );
};
