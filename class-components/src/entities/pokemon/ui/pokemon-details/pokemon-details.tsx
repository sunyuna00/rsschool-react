import { Spinner } from '@/shared';
import { useGetPokemonByIdQuery } from '@/shared/api/pokemon-api';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styles from './pokemon-details.module.css';

export const PokemonDetails = () => {
  const { id } = useParams();

  const {
    data: pokemon,
    isLoading: loading,
    error,
  } = useGetPokemonByIdQuery(id ?? '', {
    skip: !id,
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

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

        {error && <p className="text-red-500">Failed to load Pokémon</p>}

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
