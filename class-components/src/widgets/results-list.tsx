import { Card, type Pokemon } from '@/entities/pokemon';
import { Link } from 'react-router-dom';

type Props = {
  results: Pokemon[];
};

export const ResultsList = ({ results }: Props) => {
  return (
    <section className="flex flex-col gap-5 py-8">
      {results.map((pokemon) => (
        <Link
          key={pokemon.id}
          to={`/details/${pokemon.id}`}
          className="transition-transform hover:scale-[1.01]"
        >
          <Card item={pokemon} />
        </Link>
      ))}
    </section>
  );
};
