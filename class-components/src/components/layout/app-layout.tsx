import { Outlet } from 'react-router-dom';

import { Navigation } from '../navigation/navigation';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        <Outlet />
      </main>
    </div>
  );
};
