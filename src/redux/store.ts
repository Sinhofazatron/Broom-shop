import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import favoriteSlice from "./slices/favoriteSlice";
import broomSlice from "./slices/broomSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    favorite: favoriteSlice,
    broom: broomSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
