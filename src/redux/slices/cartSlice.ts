import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type CartItemArgs = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  count: number;
  subDescription: string;
  category: number;
  rating: number
}

interface CartSliceState {
  totalPrice: number;
  items: CartItemArgs[],
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemArgs>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    minusItem: (state, action: PayloadAction<CartItemArgs>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        state.totalPrice -= findItem.price;
        findItem.count--;
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count;
      }
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItem: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
