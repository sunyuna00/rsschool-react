import { useInvalidatePokemonMutation } from '@/shared/api/pokemon-api';
import { RefreshCw } from 'lucide-react';

export const RefreshButton = () => {
  const [invalidate] = useInvalidatePokemonMutation();

  return (
    <button
      onClick={() => invalidate()}
      className=" flex items-center gap-2 rounded-xl border border-primary/20 bg-card px-4 py-2.5 text-sm text-primary transition hover:bg-primary/10 hover:scale-105 active:scale-95 "
    >
      <RefreshCw size={16} />
      Refresh
    </button>
  );
};
