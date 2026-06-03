import { useAppDispatch, useAppSelector } from '@/app';
import { clearItems } from '@/entities/pokemon/model/slice';
import { downloadCsv } from '@/features';
import { Download, Trash2 } from 'lucide-react';

export const Flyout = () => {
  const dispatch = useAppDispatch();

  const selectedItems = useAppSelector((state) => state.item.items);

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-full -translate-x-1/2 px-3 sm:px-4">
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-4xl

          flex-col
          gap-5

          rounded-3xl
          border
          border-primary/20
          bg-card/95
          backdrop-blur-xl

          px-4
          py-4

          shadow-[0_0_20px_rgba(255,111,174,0.4)]

          transition-all
          duration-300

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
          sm:py-5
        "
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center

              rounded-2xl
              border
              border-primary/20
              bg-primary/10
              shadow-inner
            "
          >
            <p className="text-md font-bold text-foreground">{selectedItems.length}</p>
          </div>

          <div className="min-w-0">
            <p
              className="
                truncate
                text-base
                font-bold
                text-foreground

                sm:text-lg
              "
            >
              {selectedItems.length} Pokémon selected
            </p>

            <span className="text-sm text-muted-foreground">Ready to export</span>
          </div>
        </div>

        <div
          className="
            flex
            w-full
            flex-col
            gap-3

            sm:w-auto
            sm:flex-row
            sm:items-center
          "
        >
          <button
            onClick={() => dispatch(clearItems())}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-2xl
              border
              border-primary/20
              bg-background/70

              px-5
              py-3

              text-sm
              font-medium
              text-foreground

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:border-primary/40
              hover:bg-primary/10

              sm:w-auto
            "
          >
            <Trash2 className="h-4 w-4 shrink-0" />
            Unselect all
          </button>

          <button
            onClick={() => downloadCsv(selectedItems)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-2xl
              bg-primary

              px-5
              py-3

              text-sm
              font-semibold
              text-white

              shadow-[0_6px_20px_rgba(255,111,174,0.35)]

              transition-all
              duration-300

              hover:scale-[1.02]
              hover:shadow-[0_10px_30px_rgba(255,111,174,0.5)]

              active:scale-[0.98]

              sm:w-auto
            "
          >
            <Download className="h-4 w-4 shrink-0" />
            Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};
