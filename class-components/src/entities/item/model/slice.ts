import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Item = {
  id: number;
  name: string;
};

type SelectedItemsState = {
  items: Item[];
};

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',

  initialState,

  reducers: {
    toggleItem(state, action: PayloadAction<Item>) {
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },

    clearItems(state) {
      state.items = [];
    },
  },
});

export const { toggleItem, clearItems } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
