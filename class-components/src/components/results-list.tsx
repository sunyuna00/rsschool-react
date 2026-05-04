import type { Pokemon } from '@/types';
import { Card } from './card';

export const ResultsList = ({ results }: { results: Pokemon[] }) => {
  return (
    <section className="flex flex-col gap-5 py-8">
      {results.map((item) => (
        <Card key={item.name} item={item} />
      ))}
    </section>
  );
};
