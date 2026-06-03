import { configureStore } from '@reduxjs/toolkit';
import selectedItemsReducer from '@/entities/pokemon/model/slice';

export const store = configureStore({
  reducer: {
    item: selectedItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
