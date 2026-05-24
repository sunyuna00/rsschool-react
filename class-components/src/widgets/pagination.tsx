import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  pages.push(1);

  if (currentPage > 3) {
    pages.push('start-ellipsis');
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push('end-ellipsis');
  }

  pages.push(totalPages);

  return pages;
};

export const Pagination: React.FC<Props> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="
          flex items-center justify-center
          w-10 h-10
          rounded-xl
          border border-border
          bg-card
          transition-all duration-200
          hover:scale-105
          hover:bg-accent
          disabled:opacity-40
          disabled:pointer-events-none
        "
      >
        <ChevronLeft size={18} />
      </button>

      {visiblePages.map((item, index) => {
        if (typeof item !== 'number') {
          return (
            <div
              key={`${item}-${index}`}
              className="
                flex items-center justify-center
                w-10 h-10
                text-muted-foreground
              "
            >
              <MoreHorizontal size={18} />
            </div>
          );
        }

        const isActive = item === page;

        return (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`
              w-10 h-10
              rounded-xl
              text-sm font-medium
              transition-all duration-200
              border
              ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
                  : `
                    bg-card
                    border-border
                    hover:bg-accent
                    hover:scale-105
                  `
              }
            `}
          >
            {item}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="
          flex items-center justify-center
          w-10 h-10
          rounded-xl
          border border-border
          bg-card
          transition-all duration-200
          hover:scale-105
          hover:bg-accent
          disabled:opacity-40
          disabled:pointer-events-none
        "
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
