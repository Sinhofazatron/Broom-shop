import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

type BroomItem = {
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

export type SearchBroomParams = {
  pageCount: number,
  category: string,
  sortType: string,
  order: string,
  search: string
}

interface BroomSliceState {
  items: BroomItem[];
  countBroom: number
  status: "loading" | "success" | "error"
}

export const fetchBroom = createAsyncThunk<BroomItem[], SearchBroomParams>(
  "broom/fetchBroomStatus",
  async (params) => {
    const { pageCount, category, sortType, order, search } = params;

    const { data } = await axios.get<BroomItem[]>(
      `https://${API_KEY}.mockapi.io/items?page=${pageCount}&limit=8&${category}&sortBy=${sortType}&order=${order}${search}`
    );
    return data;
  }
);

const initialState: BroomSliceState = {
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
  extraReducers: (builder) => {
    builder.addCase(fetchBroom.pending, (state) => {
      state.status = "loading";
      state.items = []
    });

    builder.addCase(fetchBroom.fulfilled, (state, action: any) => {
      state.items = action.payload.items;
      state.countBroom = action.payload.count;
      state.status = "success";
    })

    builder.addCase(fetchBroom.rejected, (state) => {
      state.status = "error";
      state.items = []
    });
  }
});

export const { setItems } = broomSlice.actions;

export default broomSlice.reducer;
