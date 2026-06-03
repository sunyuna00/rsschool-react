import { useTheme } from '@/app';
import { Moon, Sun } from 'lucide-react';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className="
        flex h-11 w-11 items-center justify-center
        rounded-2xl border border-primary/20
        bg-card text-foreground

        shadow-sm transition-all duration-300

        hover:scale-105
        hover:border-primary/40
        hover:bg-primary/10
        hover:shadow-[0_6px_20px_rgba(255,111,174,0.15)]

        active:scale-[0.98]
      "
    >
      {isLight ? (
        <Sun className="h-5 w-5 text-primary" />
      ) : (
        <Moon className="h-5 w-5 text-primary" />
      )}
    </button>
  );
};
