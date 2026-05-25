import type { PropsWithChildren, ReactElement } from 'react';

import { render } from '@testing-library/react';

import { Provider } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';
import { store } from '@/app/providers/store/store';

export const renderWithProviders = (
  ui: ReactElement
) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  return render(ui, {
    wrapper: Wrapper,
  });
};
