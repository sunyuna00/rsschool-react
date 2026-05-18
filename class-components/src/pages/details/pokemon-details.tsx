import { useParams, Link } from 'react-router-dom';

export const PokemonDetails = () => {
  const { id } = useParams();

  return (
    <aside className="w-[350px] border-l border-primary/10 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Pokemon #{id}
        </h2>

        <Link to="/">
          Close
        </Link>
      </div>
    </aside>
  );
};
