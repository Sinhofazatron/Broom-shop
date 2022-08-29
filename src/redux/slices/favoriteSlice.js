import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemsFavorite: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addItemToFavorite: (state, action) => {
      const findItem = state.itemsFavorite.find(
        (obj) => obj.id === action.payload.id
      );

      if (!findItem) {
        state.itemsFavorite.push({ ...action.payload });
      }
    },

    removeItemToFavorite: (state, action) => {
      state.itemsFavorite = state.itemsFavorite.filter(
        (obj) => obj.id !== action.payload
      );
    },

    clearItems: (state, action) => {
      state.itemsFavorite = [];
    },
  },
});

export const { addItemToFavorite, clearItems, removeItemToFavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
