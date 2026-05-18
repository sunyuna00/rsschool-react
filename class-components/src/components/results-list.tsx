import { Link } from 'react-router-dom';

import type { Pokemon } from '@/types';
import { Card } from './card';

export const ResultsList = ({ results }: { results: Pokemon[] }) => {
  return (
    <section className="flex flex-col gap-5 py-8">
      {results.map((item) => (
        <Link
          key={item.name}
          to={`/pokemon/${item.id}`}
        >
          <Card item={item} />
        </Link>
      ))}
    </section>
  );
};
