import { Provider } from 'react-redux';

import type { PropsWithChildren } from 'react';

import { store } from './store/store';

import { ThemeProvider } from './theme';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};
