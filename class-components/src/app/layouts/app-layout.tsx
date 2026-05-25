import { Outlet } from 'react-router-dom';

import { Navigation } from '../../widgets/navigation';
import { Flyout } from '@/widgets';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main>
        <Outlet />
      </main>
      <Flyout />
    </div>
  );
};
