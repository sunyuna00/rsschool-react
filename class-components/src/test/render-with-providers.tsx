import type { PropsWithChildren, ReactElement } from 'react';

import { render } from '@testing-library/react';

import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import { store } from '@/app/providers/store/store';
import { ThemeProvider } from '@/app/providers/theme/theme-context';

export const renderWithProviders = (ui: ReactElement) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  return render(ui, {
    wrapper: Wrapper,
  });
};
