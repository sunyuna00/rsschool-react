import { useSearchParams } from 'react-router-dom';

type Props = {
  totalPages?: number;
};

// eslint-disable-next-line react/prop-types
export const Pagination: React.FC<Props> = ({ totalPages = 10 }) => {
  const [params, setParams] = useSearchParams();

  const page = Number(params.get('page') || 1);

  const setPage = (newPage: number) => {
    setParams(prev => {
      const updated = new URLSearchParams(prev);
      updated.set('page', String(newPage));
      return updated;
    });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-3 mt-6">
      <button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {page} / {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

