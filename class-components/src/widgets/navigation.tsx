import { ThemeSwitcher } from '@/features';
import { NavLink } from 'react-router-dom';
import { House, Info } from 'lucide-react';

export const Navigation = () => {
  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-primary/10
        bg-background/80 backdrop-blur-xl
      "
    >
      <nav
        className="
          mx-auto flex max-w-6xl
          items-center justify-between
          px-4 py-4
        "
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `
                flex items-center gap-2
                rounded-2xl px-4 py-2
                text-sm font-medium transition-all duration-300
                hover:bg-primary/10 hover:text-primary
                ${
                  isActive
                    ? 'bg-primary text-white shadow-[0_6px_20px_rgba(255,111,174,0.35)]'
                    : 'text-foreground'
                }
              `
            }
          >
            <House className="h-4 w-4" />
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `
                flex items-center gap-2
                rounded-2xl px-4 py-2
                text-sm font-medium transition-all duration-300
                hover:bg-primary/10 hover:text-primary
                ${
                  isActive
                    ? 'bg-primary text-white shadow-[0_6px_20px_rgba(255,111,174,0.35)]'
                    : 'text-foreground'
                }
              `
            }
          >
            <Info className="h-4 w-4" />
            About
          </NavLink>
        </div>

        <ThemeSwitcher />
      </nav>
    </header>
  );
};
