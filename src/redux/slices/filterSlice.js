import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sortType = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSortOrder: (state, action) => {
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
