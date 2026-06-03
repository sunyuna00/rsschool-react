import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import type { Pokemon } from '../model/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toggleItem } from '@/entities/pokemon/model/slice';
import { Check } from 'lucide-react';

type Props = {
  item: Pokemon;
};

export const Card = ({ item }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const selectedItems = useAppSelector((state) => state.item.items);

  const isSelected = selectedItems.some((pokemon) => pokemon.id === item.id);

  const page = searchParams.get('page') || '1';

  const handleNavigate = () => {
    navigate(`/pokemon/${item.id}?page=${page}`);
  };

  const handleCheckboxChange = () => {
    dispatch(toggleItem(item));
  };

  return (
    <article
      onClick={handleNavigate}
      className="bg-card border border-primary/10 rounded-3xl p-5 flex gap-6 items-center w-[min(100%,900px)] mx-auto transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-[0_0_25px_rgba(255,111,174,0.15)] cursor-pointer"
    >
      <div onClick={(event) => event.stopPropagation()} className="self-start">
        <label className="relative cursor-pointer block">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="peer sr-only"
          />

          <div
            className="
        w-7
        h-7
        rounded-xl
        border
        border-primary/20
        bg-background
        flex
        items-center
        justify-center
        transition-all
        duration-300
        shadow-sm

        peer-checked:bg-primary/10
        peer-checked:border-primary/20
        peer-checked:shadow-[0_0_20px_rgba(255,111,174,0.4)]

        peer-hover:scale-105
        peer-focus-visible:ring-4
        peer-focus-visible:ring-primary/20
      "
          >
            <Check
              className={`
    w-4 h-4 text-foreground transition-all duration-300
    ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
  `}
              strokeWidth={3.5}
            />
          </div>
        </label>
      </div>
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
    </article>
  );
};
