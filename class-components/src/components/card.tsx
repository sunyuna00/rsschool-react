import type { Pokemon } from '@/types';

export const Card = ({ item }: { item: Pokemon }) => {
  return (
    <div className="bg-card border border-primary/10 rounded-3xl p-5 flex gap-6 items-center w-[min(100%,900px)] mx-auto transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_0_25px_rgba(255,111,174,0.15)]">
      <div className="w-28 h-28 rounded-2xl bg-background border border-primary/20 flex items-center justify-center shadow-inner">
        <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-xl capitalize text-foreground">{item.name}</h3>

        <p className="text-sm text-muted-foreground">
          {item.types.join(', ')} pokemon with abilities {item.abilities.join(', ') || 'Unknown'}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.types.map((type, index) => (
            <span
              key={`${type}-${index}`}
              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            Height: <span className="text-foreground">{item.height}</span>
          </p>
          <p>
            Weight: <span className="text-foreground">{item.weight}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
