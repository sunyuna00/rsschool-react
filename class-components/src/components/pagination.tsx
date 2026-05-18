type Props = {
  page: number;
  onChange: (page: number) => void;
  hasNext: boolean;
};

export const Pagination = ({ page, onChange, hasNext }: Props) => {
  return (
    <div className="flex gap-3 justify-center mt-6">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-4 py-2 border rounded"
      >
        Prev
      </button>

      <span>Page {page}</span>

      <button
        disabled={!hasNext}
        onClick={() => onChange(page + 1)}
        className="px-4 py-2 border rounded"
      >
        Next
      </button>
    </div>
  );
};
