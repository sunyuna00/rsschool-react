import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '@/entities/item/model/slice';
import { pokemonApi } from '@/shared/api/pokemon-api';

export const store = configureStore({
  reducer: {
    item: selectedItemsReducer,

    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
