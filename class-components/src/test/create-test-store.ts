import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '@/shared/api/pokemon-api';

export const createTestStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (gDM) => gDM().concat(pokemonApi.middleware),
  });
