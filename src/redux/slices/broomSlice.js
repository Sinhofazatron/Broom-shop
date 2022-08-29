import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchBroom = createAsyncThunk(
  "broom/fetchBroomStatus",
  async (params) => {
    const { pageCount, category, sortType, order, search } = params;

    const { data } = await axios.get(
      `https://${API_KEY}.mockapi.io/items?page=${pageCount}&limit=8&${category}&sortBy=${sortType}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  countBroom: 0,
  status: "loading", // loading | success | error
};

export const broomSlice = createSlice({
  name: "broom",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload.items;
      state.countBroom = action.payload.count;
    },
  },
  extraReducers: {
    [fetchBroom.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchBroom.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.countBroom = action.payload.count;
      state.status = "success";
    },
    [fetchBroom.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const { setItems } = broomSlice.actions;

export default broomSlice.reducer;
