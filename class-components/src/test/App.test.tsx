import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/app/providers/store/store';
import { AppRouter, ThemeProvider } from '@/app';

const renderApp = (route: string) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[route]}>
          <AppRouter />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

describe('App routes', () => {
  it('home', () => {
    renderApp('/');
  });

  it('about', () => {
    renderApp('/about');
  });

  it('not found', () => {
    renderApp('/random');
  });

  it('pokemon details', () => {
    renderApp('/pokemon/25');
  });
});
