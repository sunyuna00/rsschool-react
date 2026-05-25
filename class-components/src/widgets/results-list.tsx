import { Card, type Pokemon } from '@/entities/pokemon';

type Props = {
  results: Pokemon[];
};

export const ResultsList = ({ results }: Props) => {

  return (
    <section className="flex flex-col gap-5 py-8">
      {results.map((pokemon) => (
        <Card key={pokemon.id} item={pokemon} />
      ))}
    </section>
  );
};
