import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <header className="border-b border-primary/10">
      <nav className="flex gap-4 p-4">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
};
