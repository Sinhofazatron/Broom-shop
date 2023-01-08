import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterSliceState {
  categoryId: number;
  sortType: string;
  pageCount: number;
  searchValue: string;
  sortOrder: boolean;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sortType: "id",
  pageCount: 1,
  searchValue: "",
  sortOrder: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<boolean>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setPageCount,
  setSearchValue,
  setSortOrder,
} = filterSlice.actions;

export default filterSlice.reducer;
